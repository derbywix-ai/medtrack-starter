import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, ChevronLeft } from 'lucide-react';

const PRIMARY_BLUE = 'rgb(30, 64, 175)';
const ACCENT_BLUE = 'rgb(59, 130, 246)';

const InputField = ({ Icon, type, placeholder, value, onChange, label, disabled }) => (
  <div className="mb-6">
    <label className="text-sm font-semibold text-gray-700 block mb-2">{label}</label>
    <div className="relative">
      <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-2xl shadow-sm focus:ring-3 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out placeholder-gray-400 text-base"
        disabled={disabled}
      />
    </div>
  </div>
);

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    setIsLoggingIn(true);

    setTimeout(() => {
      if (email === 'user@example.com' && password === 'password') {
        setSuccessMessage('Login Successful! Redirecting to dashboard...');
        setEmail('');
        setPassword('');
      } else {
        setErrorMessage('Invalid credentials. Try user@example.com / password');
      }
      setIsLoggingIn(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="w-full max-w-md">
        <div
          className="w-full h-48 pt-10 px-6 sm:rounded-b-3xl text-white flex flex-col justify-between"
          style={{ backgroundColor: PRIMARY_BLUE, boxShadow: '0 4px 15px rgba(30, 64, 175, 0.4)' }}
        >
          <button className="self-start opacity-70" onClick={() => console.log('Back button pressed')}>
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-1">Welcome Back</h1>
            <p className="text-sm font-light opacity-80">Login to manage your health.</p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md bg-white rounded-t-3xl shadow-xl p-6 sm:p-8 relative -mt-8 z-10">
        {errorMessage && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">{errorMessage}</div>}
        {successMessage && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl mb-6 text-sm">{successMessage}</div>}

        <form onSubmit={handleLogin}>
          <InputField Icon={Mail} type="email" label="Email Address" placeholder="e.g., user@example.com" value={email} onChange={setEmail} disabled={isLoggingIn} />
          <InputField Icon={Lock} type="password" label="Password" placeholder="Enter your password" value={password} onChange={setPassword} disabled={isLoggingIn} />

          <div className="flex justify-end mb-8">
            <button type="button" className="text-sm font-semibold text-gray-500 hover:text-blue-600 transition duration-150" disabled={isLoggingIn} onClick={() => console.log('Forgot Password clicked')}>
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            style={{ backgroundColor: PRIMARY_BLUE }}
            className={`w-full text-white font-extrabold py-4 px-4 rounded-2xl shadow-lg transition duration-300 ease-in-out transform hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-blue-300 flex items-center justify-center text-lg ${
              isLoggingIn ? 'opacity-70 cursor-not-allowed' : 'shadow-blue-500/50'
            }`}
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <>
                Login
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-sm">
          <p className="text-gray-600">
            Don't have an account?
            <button type="button" style={{ color: ACCENT_BLUE }} className="font-bold ml-1 hover:text-blue-700 transition duration-150" onClick={() => console.log('Sign Up link pressed')}>
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
