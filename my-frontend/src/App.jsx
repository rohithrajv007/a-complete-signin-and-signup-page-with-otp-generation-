import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import VerifyOtpPage from './pages/VerifyOtpPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  // State to manage the current page and user information
  const [page, setPage] = useState('login'); // e.g., 'login', 'signup', 'dashboard'
  const [emailForOtp, setEmailForOtp] = useState('');
  const [user, setUser] = useState(null);

  // Function to handle navigation
  const navigateTo = (pageName) => setPage(pageName);

  // This function will be called upon successful login
  const handleLoginSuccess = (userData) => {
    setUser(userData);
    navigateTo('dashboard');
  };

  const handleForgotPasswordFlow = (email) => {
    setEmailForOtp(email);
    navigateTo('verify-otp');
  };

  // Render the current page
  const renderPage = () => {
    switch (page) {
      case 'signup':
        return <SignupPage navigateTo={navigateTo} />;
      case 'forgot-password':
        return <ForgotPasswordPage navigateTo={navigateTo} onOtpSent={handleForgotPasswordFlow} />;
      case 'verify-otp':
        return <VerifyOtpPage navigateTo={navigateTo} email={emailForOtp} />;
      case 'dashboard':
        return <DashboardPage user={user} navigateTo={navigateTo} />;
      case 'login':
      default:
        return <LoginPage navigateTo={navigateTo} onLoginSuccess={handleLoginSuccess} />;
    }
  };

  // Conditional layout: centered for auth pages, full for dashboard
  const isAuthPage = ['login', 'signup', 'forgot-password', 'verify-otp'].includes(page);

  return (
    <>
      {isAuthPage ? (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center font-sans">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
            {renderPage()}
          </div>
        </div>
      ) : (
        <div className="min-h-screen w-full bg-white font-sans">
          {renderPage()}
        </div>
      )}
    </>
  );
}

export default App;
