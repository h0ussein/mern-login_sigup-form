import React, { useState } from 'react'
import Login from "../components/Login";
import Signup from "../components/Signup";

const LoginSignup = () => {
  const [mode, setMode] = useState('login');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-2 sm:p-4 md:p-6">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-md">
        {/* Mode Toggle Buttons */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
          <button
            className={`px-3 py-2 sm:px-6 sm:py-3 rounded-xl font-medium transition-all duration-300 text-sm sm:text-base ${
              mode === 'login' 
                ? 'bg-gradient-to-r from-pink-500 to-violet-600 text-white shadow-lg shadow-pink-500/25' 
                : 'bg-white/10 backdrop-blur-sm text-gray-300 hover:bg-white/20 border border-white/20'
            }`}
            onClick={() => setMode('login')}
          >
            Login
          </button>
          <button
            className={`px-3 py-2 sm:px-6 sm:py-3 rounded-xl font-medium transition-all duration-300 text-sm sm:text-base ${
              mode === 'signup' 
                ? 'bg-gradient-to-r from-pink-500 to-violet-600 text-white shadow-lg shadow-pink-500/25' 
                : 'bg-white/10 backdrop-blur-sm text-gray-300 hover:bg-white/20 border border-white/20'
            }`}
            onClick={() => setMode('signup')}
          >
            Signup
          </button>
        </div>
        
        {mode === 'login' ? (
          <Login onSwitchMode={() => setMode('signup')} />
        ) : (
          <Signup onSwitchMode={() => setMode('login')} />
        )}
      </div>
    </div>
  );
}

export default  LoginSignup

