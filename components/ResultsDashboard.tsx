import React from 'react';
import { PricingAnalysis, UserInput } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import { ArrowRight, CheckCircle, TrendingUp, DollarSign, MapPin, AlertCircle, Loader2 } from 'lucide-react';

interface Props {
  data: PricingAnalysis;
  userInput: UserInput;
  onReset: () => void;
  emailStatus?: 'idle' | 'sending' | 'success' | 'error';
  emailError?: string;
}

export const ResultsDashboard: React.FC<Props> = ({ 
  data, 
  userInput, 
  onReset, 
  emailStatus = 'idle',
  emailError = '' 
}) => {
  const chartData = [
    { name: 'Your Low', price: data.suggestedPriceRange.min, color: '#fbcfe8' },
    { name: 'Your High', price: data.suggestedPriceRange.max, color: '#ec4899' },
    { name: 'Local Avg', price: data.competitorAvg, color: '#9ca3af' },
  ];

  const totalRevenueMin = (data.suggestedPriceRange.min * userInput.quantity).toFixed(2);
  const totalRevenueMax = (data.suggestedPriceRange.max * userInput.quantity).toFixed(2);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom duration-500">
      
      {/* Email Status Banner */}
      {emailStatus === 'success' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start sm:items-center space-x-3">
          <CheckCircle className="text-green-500 h-6 w-6 flex-shrink-0" />
          <div>
            <h3 className="text-green-800 font-semibold">Report Sent!</h3>
            <p className="text-green-700 text-sm">
              A detailed breakdown has been emailed to <span className="font-bold">{userInput.email}</span>.
            </p>
          </div>
        </div>
      )}

      {emailStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start sm:items-center space-x-3">
          <AlertCircle className="text-red-500 h-6 w-6 flex-shrink-0" />
          <div>
            <h3 className="text-red-800 font-semibold">Email Delivery Failed</h3>
            <p className="text-red-700 text-sm">
              We couldn't send the email report. {emailError}
            </p>
          </div>
        </div>
      )}

      {emailStatus === 'sending' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center space-x-3">
          <Loader2 className="text-blue-500 h-5 w-5 animate-spin" />
          <p className="text-blue-700 text-sm font-medium">Sending your detailed report...</p>
        </div>
      )}

      {/* Main Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Price Per Cookie Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-cookie-500 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-cookie-100 w-24 h-24 rounded-full opacity-50"></div>
          <h2 className="text-gray-500 font-medium uppercase tracking-wide text-sm mb-2">Recommended Per Cookie</h2>
          <div className="flex items-baseline space-x-2">
            <span className="text-5xl font-extrabold text-gray-900">${data.suggestedPriceRange.min.toFixed(2)}</span>
            <span className="text-2xl text-gray-400 font-medium">-</span>
            <span className="text-5xl font-extrabold text-gray-900">${data.suggestedPriceRange.max.toFixed(2)}</span>
          </div>
          <p className="mt-4 text-gray-600 text-sm">
            Based on <span className="font-semibold text-cookie-600">{userInput.skillLevel}</span> skill level and local market data for <span className="font-semibold text-cookie-600">{userInput.location}</span>.
          </p>
        </div>

        {/* Total Project Revenue Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-purple-500 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-purple-100 w-24 h-24 rounded-full opacity-50"></div>
          <h2 className="text-gray-500 font-medium uppercase tracking-wide text-sm mb-2">Total Project Estimate</h2>
          <div className="flex items-baseline space-x-2">
            <span className="text-4xl font-bold text-gray-900">${totalRevenueMin}</span>
            <span className="text-xl text-gray-400">-</span>
            <span className="text-4xl font-bold text-gray-900">${totalRevenueMax}</span>
          </div>
          <div className="mt-4 flex items-center text-purple-700 bg-purple-50 px-3 py-1 rounded-full w-fit text-sm font-medium">
            <DollarSign className="w-4 h-4 mr-1" />
            {userInput.quantity} Cookies
          </div>
        </div>
      </div>

      {/* Analysis Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Text Analysis */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <MapPin className="mr-2 text-cookie-500" />
              Demographic & Market Check
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {data.demographicInsights}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <TrendingUp className="mr-2 text-blue-500" />
              Complexity Analysis
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {data.marketAnalysis}
            </p>
          </div>
        </div>

        {/* Right Column: Chart */}
        <div className="bg-white rounded-xl shadow-md p-6 lg:col-span-1 flex flex-col">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Market Comparison</h3>
          <div className="flex-grow min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <YAxis unit="$" axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{fill: '#fdf2f8'}}
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}
                />
                <Bar dataKey="price" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-center text-gray-400 mt-2">Prices in USD</p>
        </div>
      </div>

      {/* Upsell / CTA Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-3">Take the Guesswork Out of Cookies</h3>
          <p className="text-gray-300 mb-6 max-w-2xl">
            {data.upsellSuggestion}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="https://CookieCraftAI.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-cookie-500 hover:bg-cookie-600 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-cookie-500/30"
            >
              Visit CookieCraftAI.com
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <button 
              onClick={onReset}
              className="inline-flex items-center justify-center bg-transparent border border-white/30 hover:bg-white/10 text-white font-semibold py-3 px-8 rounded-full transition-all"
            >
              Calculate Another Order
            </button>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-cookie-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
      </div>

    </div>
  );
};