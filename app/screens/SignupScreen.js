import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, ChevronLeft } from 'lucide-react';

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

const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!name || !email || !password) {
      setErrorMessage('Please fill all fields.');
      return;
    }

    setIsSigningUp(true);

    setTimeout(() => {
      setSuccessMessage('Account created successfully! Redirecting to login...');
      setName('');
      setEmail('');
      setPassword('');
      setIsSigningUp(false);
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
            <h1 className="text-3xl font-bold mb-1">Create Account</h1>
            <p className="text-sm font-light opacity-80">Sign up to start tracking your medications.</p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md bg-white rounded-t-3xl shadow-xl p-6 sm:p-8 relative -mt-8 z-10">
        {errorMessage && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">{errorMessage}</div>}
        {successMessage && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl mb-6 text-sm">{successMessage}</div>}

        <form onSubmit={handleSignUp}>
          <InputField Icon={User} type="text" label="Full Name" placeholder="John Doe" value={name} onChange={setName} disabled={isSigningUp} />
          <InputField Icon={Mail} type="email" label="Email Address" placeholder="user@example.com" value={email} onChange={setEmail} disabled={isSigningUp} />
          <InputField Icon={Lock} type="password" label="Password" placeholder="Enter your password" value={password} onChange={setPassword} disabled={isSigningUp} />

          <button
            type="submit"
            style={{ backgroundColor: PRIMARY_BLUE }}
            className={`w-full text-white font-extrabold py-4 px-4 rounded-2xl shadow-lg transition duration-300 ease-in-out transform hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-blue-300 flex items-center justify-center text-lg ${
              isSigningUp ? 'opacity-70 cursor-not-allowed' : 'shadow-blue-500/50'
            }`}
            disabled={isSigningUp}
          >
            {isSigningUp ? 'Creating...' : <>
              Sign Up
              <ArrowRight className="w-5 h-5 ml-2" />
            </>}
          </button>
        </form>

        <div className="mt-8 text-center text-sm">
          <p className="text-gray-600">
            Already have an account?
            <button type="button" style={{ color: ACCENT_BLUE }} className="font-bold ml-1 hover:text-blue-700 transition duration-150" onClick={() => console.log('Go to Login')}>
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpScreen;
