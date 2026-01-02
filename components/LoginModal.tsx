
import React, { useState } from 'react';
import { ADMIN_EMAIL, ADMIN_PASSWORD } from '../constants';

interface LoginModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleNext = () => {
    if (email === ADMIN_EMAIL) {
      setStep(2);
      setError('');
    } else {
      setError('Could not find your Google Account');
    }
  };

  const handleSignIn = () => {
    if (password === ADMIN_PASSWORD) {
      onSuccess();
    } else {
      setError('Wrong password. Try again or click Forgot password to reset it.');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-zinc-950 text-white w-full max-w-md rounded-lg overflow-hidden border border-zinc-800 shadow-2xl">
        <div className="p-10 flex flex-col items-center text-center">
          <div className="mb-4">
             <div className="flex items-center gap-1">
                <svg className="w-10 h-10 text-[#FF0000]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-1">{step === 1 ? 'Sign in' : 'Welcome'}</h2>
          <p className="text-zinc-400 mb-8">{step === 1 ? 'Use your YouTube Account' : email}</p>

          <div className="w-full text-left">
            {step === 1 ? (
              <>
                <div className="relative mb-6">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full bg-transparent border ${error ? 'border-red-500' : 'border-zinc-700'} rounded py-3 px-4 focus:outline-none focus:border-blue-500 transition-colors`}
                    placeholder="Email or phone"
                  />
                  {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
                </div>
                <p className="text-blue-400 text-sm font-bold mb-10 hover:underline cursor-pointer">Forgot email?</p>
                <div className="flex items-center justify-between">
                  <button onClick={onClose} className="text-blue-400 text-sm font-bold hover:bg-blue-400/10 px-4 py-2 rounded">Cancel</button>
                  <button 
                    onClick={handleNext}
                    className="bg-blue-600 text-white px-8 py-2 rounded font-bold hover:bg-blue-700 transition-colors"
                  >
                    Next
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="relative mb-6">
                  <input 
                    type="password" 
                    autoFocus
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full bg-transparent border ${error ? 'border-red-500' : 'border-zinc-700'} rounded py-3 px-4 focus:outline-none focus:border-blue-500 transition-colors`}
                    placeholder="Enter your password"
                  />
                  {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
                </div>
                <div className="flex items-center mb-10">
                   <input type="checkbox" id="show" className="mr-2" />
                   <label htmlFor="show" className="text-sm">Show password</label>
                </div>
                <div className="flex items-center justify-between">
                  <button onClick={() => setStep(1)} className="text-blue-400 text-sm font-bold hover:bg-blue-400/10 px-4 py-2 rounded">Back</button>
                  <button 
                    onClick={handleSignIn}
                    className="bg-blue-600 text-white px-8 py-2 rounded font-bold hover:bg-blue-700 transition-colors"
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
