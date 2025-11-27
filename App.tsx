import React, { useState } from 'react';
import { UserInput, SkillLevel, Complexity, PricingAnalysis } from './types';
import { generatePricingAnalysis } from './services/geminiService';
import { sendPricingReport } from './services/emailService';
import { LeadCaptureModal } from './components/LeadCaptureModal';
import { ResultsDashboard } from './components/ResultsDashboard';
import { Calculator, ChefHat, Palette, MapPin, Layers } from 'lucide-react';

const App: React.FC = () => {
  const [step, setStep] = useState<'input' | 'processing' | 'results'>('input');
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [analysis, setAnalysis] = useState<PricingAnalysis | null>(null);
  
  // Email status tracking
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');

  const [inputData, setInputData] = useState<UserInput>({
    quantity: 12,
    skillLevel: SkillLevel.Beginner,
    complexity: Complexity.Easy,
    location: '',
  });

  const handleInputChange = (field: keyof UserInput, value: any) => {
    setInputData(prev => ({ ...prev, [field]: value }));
  };

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputData.location) {
      alert("Please enter a city and state.");
      return;
    }
    setShowLeadModal(true);
  };

  const handleLeadSubmit = async (name: string, email: string) => {
    setShowLeadModal(false);
    setInputData(prev => ({ ...prev, name, email }));
    setStep('processing');
    setEmailStatus('sending');
    setEmailErrorMessage('');

    try {
      // 1. Generate Analysis
      const result = await generatePricingAnalysis(inputData);
      setAnalysis(result);
      
      // 2. Move to Results immediately
      setStep('results');
      
      // 3. Send Email in "background" but update status for UI
      const fullInputData = { ...inputData, name, email };
      
      sendPricingReport(email, name, result, fullInputData)
        .then(() => {
          setEmailStatus('success');
        })
        .catch((err) => {
          console.error("Email failed:", err);
          setEmailStatus('error');
          setEmailErrorMessage(err.message || "Failed to send email");
        });

    } catch (error) {
      console.error("Analysis failed", error);
      setStep('input');
      alert("Something went wrong with the AI analysis. Please try again.");
      setEmailStatus('idle');
    }
  };

  const resetApp = () => {
    setStep('input');
    setAnalysis(null);
    setInputData(prev => ({ ...prev, location: '' })); 
    setEmailStatus('idle');
    setEmailErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cookie-50 to-white text-gray-800 font-sans pb-12">
      {/* Header */}
      <header className="bg-white border-b border-cookie-100 sticky top-0 z-30 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-cookie-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              C
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">Cookie Craft AI</span>
          </div>
          <nav className="hidden md:block">
            <a href="https://CookieCraftAI.com" className="text-gray-500 hover:text-cookie-600 font-medium transition-colors text-sm">
              Visit Main Site
            </a>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {step === 'input' && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
                Price Your Cookies with Confidence
              </h1>
              <p className="text-lg text-gray-600">
                Stop guessing. Use AI to analyze your local market demographics and get the perfect pricing strategy for your custom orders.
              </p>
            </div>

            <form onSubmit={handleInitialSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-8 border border-gray-100">
              
              {/* Quantity Input */}
              <div>
                <label className="flex items-center text-lg font-semibold text-gray-800 mb-3">
                  <Layers className="w-5 h-5 mr-2 text-cookie-500" />
                  Order Quantity
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    min="1"
                    className="w-full bg-white text-gray-900 text-2xl font-bold text-center border-2 border-gray-200 rounded-xl p-4 focus:ring-4 focus:ring-cookie-100 focus:border-cookie-500 transition-all outline-none"
                    value={inputData.quantity}
                    onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 0)}
                  />
                  <span className="text-gray-500 font-medium">cookies</span>
                </div>
              </div>

              {/* Skill Level Slider */}
              <div>
                <label className="flex items-center text-lg font-semibold text-gray-800 mb-4">
                  <ChefHat className="w-5 h-5 mr-2 text-cookie-500" />
                  Your Skill Level
                </label>
                <div className="px-2">
                  <input
                    type="range"
                    min="0"
                    max="2"
                    step="1"
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-cookie-600"
                    value={
                      inputData.skillLevel === SkillLevel.Beginner ? 0 :
                      inputData.skillLevel === SkillLevel.Seasoned ? 1 : 2
                    }
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      const level = val === 0 ? SkillLevel.Beginner : val === 1 ? SkillLevel.Seasoned : SkillLevel.Guru;
                      handleInputChange('skillLevel', level);
                    }}
                  />
                  <div className="flex justify-between mt-3 text-sm font-medium text-gray-500">
                    <span className={inputData.skillLevel === SkillLevel.Beginner ? "text-cookie-600 font-bold" : ""}>Beginner</span>
                    <span className={inputData.skillLevel === SkillLevel.Seasoned ? "text-cookie-600 font-bold" : ""}>Seasoned</span>
                    <span className={inputData.skillLevel === SkillLevel.Guru ? "text-cookie-600 font-bold" : ""}>Guru</span>
                  </div>
                </div>
              </div>

              {/* Complexity Selection */}
              <div>
                <label className="flex items-center text-lg font-semibold text-gray-800 mb-4">
                  <Palette className="w-5 h-5 mr-2 text-cookie-500" />
                  Design Complexity
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[Complexity.Easy, Complexity.Average, Complexity.Detailed].map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => handleInputChange('complexity', c)}
                      className={`p-4 rounded-xl border-2 text-left transition-all relative overflow-hidden ${
                        inputData.complexity === c
                          ? 'border-cookie-500 bg-cookie-50 text-cookie-900 shadow-md'
                          : 'border-gray-200 hover:border-cookie-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <div className="font-bold text-sm mb-1">{c.split('(')[0].trim()}</div>
                      <div className="text-xs opacity-80">{c.split('(')[1].replace(')', '')}</div>
                      {inputData.complexity === c && (
                         <div className="absolute top-2 right-2 w-2 h-2 bg-cookie-500 rounded-full"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location Input */}
              <div>
                <label className="flex items-center text-lg font-semibold text-gray-800 mb-3">
                  <MapPin className="w-5 h-5 mr-2 text-cookie-500" />
                  Target Market Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Austin, TX"
                  className="w-full bg-white text-gray-900 text-lg border-2 border-gray-200 rounded-xl p-4 focus:ring-4 focus:ring-cookie-100 focus:border-cookie-500 transition-all outline-none"
                  value={inputData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                />
                <p className="text-sm text-gray-400 mt-2">We use this to analyze local cost of living and competition.</p>
              </div>

              <button
                type="submit"
                className="w-full bg-cookie-600 hover:bg-cookie-700 text-white text-xl font-bold py-5 rounded-xl shadow-lg hover:shadow-cookie-500/40 transition-all transform hover:-translate-y-1 flex items-center justify-center"
              >
                <Calculator className="w-6 h-6 mr-2" />
                Analyze Pricing
              </button>

            </form>
          </div>
        )}

        {step === 'processing' && (
          <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-8 animate-in fade-in">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-cookie-200 border-t-cookie-600 rounded-full animate-spin"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <ChefHat className="w-8 h-8 text-cookie-600" />
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Baking Your Strategy...</h2>
              <p className="text-gray-500 max-w-md">
                Gemini AI is currently analyzing demographics in <span className="font-semibold text-cookie-600">{inputData.location}</span> and comparing industry standards for {inputData.skillLevel.toLowerCase()}s.
              </p>
            </div>
          </div>
        )}

        {step === 'results' && analysis && (
          <ResultsDashboard 
            data={analysis} 
            userInput={inputData}
            onReset={resetApp}
            emailStatus={emailStatus}
            emailError={emailErrorMessage}
          />
        )}

        <LeadCaptureModal
          isOpen={showLeadModal}
          onClose={() => setShowLeadModal(false)}
          onSubmit={handleLeadSubmit}
          inputData={inputData}
        />

      </main>

      <footer className="text-center py-8 text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} Cookie Craft AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;