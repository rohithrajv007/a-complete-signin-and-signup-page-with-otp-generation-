import React from 'react';

function DashboardPage({ user, navigateTo }) {
  const handleLogout = () => {
    // In a real app, you would also clear any stored tokens from localStorage
    // For now, we'll just navigate back to the login page
    navigateTo('login');
  };

  const techStack = [
    { name: 'Backend', description: 'Built with Node.js and Express.js, providing a robust REST API for all operations.', color: 'from-blue-100 to-indigo-100' },
    { name: 'Database', description: 'PostgreSQL managed by the Prisma ORM for type-safe database queries and easy schema migrations.', color: 'from-green-100 to-teal-100' },
    { name: 'Authentication', description: 'Secure password handling using bcrypt for hashing and JSON Web Tokens (JWT) for managing user sessions.', color: 'from-yellow-100 to-orange-100' },
    { name: 'OTP Emails', description: 'Nodemailer sends One-Time Passwords for password resets via Gmail\'s SMTP server, using secure App Passwords.', color: 'from-pink-100 to-rose-100' },
    { name: 'Frontend', description: 'A dynamic single-page application built with React and Vite, styled with Tailwind CSS for a modern, responsive UI.', color: 'from-purple-100 to-violet-100' },
    { name: 'Development', description: 'The backend server uses Nodemon for automatic restarts during development, speeding up the workflow.', color: 'from-gray-100 to-gray-200' },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col p-4 md:p-8 overflow-x-hidden">
      {/* Header Section */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl border border-white/20 p-6 md:p-8 mb-8 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Welcome back,
              </h1>
              <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {user?.name || 'User'}!
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-red-300"
          >
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </div>
          </button>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl border border-white/20 p-6 md:p-8 w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Project Technology Stack</h2>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          This application is a full-stack implementation of a modern user authentication system. Below is a summary of the core technologies and concepts used to build it.
        </p>

        {/* Tech Stack Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {techStack.map((tech) => (
            <div key={tech.name} className={`bg-gradient-to-br ${tech.color} p-6 rounded-xl shadow-md border border-gray-200`}>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{tech.name}</h3>
              <p className="text-gray-700 text-sm">{tech.description}</p>
            </div>
          ))}
        </div>

        {/* Additional Details Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">The Authentication Flow</h2>
          <div className="bg-gray-50/50 border border-gray-200 rounded-xl p-6 shadow-inner">
            <p className="text-gray-700">
              The entire user journey is designed for security and a smooth user experience.
            </p>
            <ol className="list-decimal list-inside text-gray-600 mt-4 space-y-2">
              <li><strong>Signup:</strong> A new user provides their details. The backend hashes the password with <strong>bcrypt</strong> and saves the new user record to the database using <strong>Prisma</strong>.</li>
              <li><strong>Login:</strong> The user provides credentials. The server finds the user, compares the hashed password, and if it matches, signs a <strong>JWT</strong> containing the user ID. This token is sent back to the client.</li>
              <li><strong>Forgot Password:</strong> The user enters their email. The server generates a random 6-digit OTP, saves it with a 10-minute expiry, and emails it to the user.</li>
              <li><strong>Verify OTP:</strong> The user submits the OTP and a new password. The server validates the OTP from the database and, if correct, hashes and updates the user's password.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;