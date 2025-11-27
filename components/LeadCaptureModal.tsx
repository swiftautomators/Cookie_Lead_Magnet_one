import React, { useState } from 'react';
import { UserInput } from '../types';
import { Mail, User, Lock, X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, email: string) => void;
  inputData: UserInput;
}

export const LeadCaptureModal: React.FC<Props> = ({ isOpen, onClose, onSubmit, inputData }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setError('Please fill in all fields to unlock your report.');
      return;
    }
    onSubmit(name, email);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative animate-in fade-in zoom-in duration-300">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="bg-cookie-600 p-6 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">Your Analysis is Ready!</h2>
          <p className="text-cookie-100 text-sm">
            Unlock your custom pricing strategy for <span className="font-semibold text-white">{inputData.location}</span>.
          </p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-cookie-500 focus:border-cookie-500 transition-shadow bg-white text-gray-900"
                  placeholder="Jane Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-cookie-500 focus:border-cookie-500 transition-shadow bg-white text-gray-900"
                  placeholder="jane@example.com"
                />
              </div>
              <p className="mt-2 text-xs text-gray-500 flex items-center">
                <Lock className="h-3 w-3 mr-1" /> We respect your privacy. No spam.
              </p>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-cookie-600 hover:bg-cookie-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              Unlock My Pricing Strategy
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};