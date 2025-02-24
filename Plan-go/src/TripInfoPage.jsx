import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Users, DollarSign, Plane, Clock, Wallet } from 'lucide-react';
import { QUESTIONS, CURRENCIES, INITIAL_ANSWERS, THEME_OPTIONS, AI_PROMPT } from './constants/options.jsx';
import { chatSession } from './services/AIModal.jsx'; // Replace with the actual path


export default function TripInfoPage() {
  const [answers, setAnswers] = useState(INITIAL_ANSWERS);
  const [theme, setTheme] = useState('light');

  const iconComponents = {
    MapPin,
    Plane,
    Users,
    Calendar,
    Clock,
    DollarSign,
    Wallet
  };

  const handleInputChange = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const isQuestionVisible = (index) => index === 0 || answers[QUESTIONS[index - 1].id] !== '';

  const handleGenerateTripPlan = async () => {
    const Final_prompt = AI_PROMPT
      .replaceAll("{start_location}", answers.startLocation)
      .replaceAll("{destination}", answers.destination)
      .replaceAll("{num_people}", answers.travelers)
      .replaceAll("{start_date}", answers.startDate)
      .replaceAll("{num_days}", answers.numDays)
      .replaceAll("{budget}", answers.budget)
      .replaceAll("{currency}", answers.currencyType);
  
    console.log(Final_prompt);
  
    const result = await chatSession.sendMessage(Final_prompt);
    const aiResponse = result?.response.text();
    console.log(aiResponse);
  
    // Store the result in MongoDB
    const tripData = {
      startLocation: answers.startLocation,
      destination: answers.destination,
      numPeople: answers.travelers,
      startDate: answers.startDate,
      numDays: answers.numDays,
      budget: answers.budget,
      currency: answers.currencyType,
      aiResponse,
    };
  
    try {
      const response = await fetch("http://localhost:5000/save-trip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tripData),
      });
  
      const data = await response.json();
      console.log("Trip saved:", data);
    } catch (error) {
      console.error("Error saving trip:", error);
    }
  };
  
  

  return (
    <main className={`flex flex-col min-h-screen w-full ${theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'}`}>
      <button
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className="fixed top-4 right-4 p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all"
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-xl">
          <AnimatePresence mode="sync">
            {QUESTIONS.map((question, index) =>
              isQuestionVisible(index) && (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`mb-6 p-6 rounded-2xl shadow-xl ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{question.emoji}</span>
                    <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {question.question}
                    </h2>
                  </div>

                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      {React.createElement(iconComponents[question.icon])}
                    </div>
                    {question.id === 'currencyType' ? (
                      <select
                        value={answers.currencyType}
                        onChange={(e) => handleInputChange(question.id, e.target.value)}
                        className={`w-full p-4 pl-12 rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} focus:ring-2 focus:ring-blue-500 outline-none`}
                      >
                        {CURRENCIES.map((currency) => (
                          <option key={currency} value={currency}>{currency}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={question.id === 'startDate' ? 'date' : question.id === 'travelers' || question.id === 'numDays' ? 'number' : 'text'}
                        placeholder={question.placeholder}
                        value={answers[question.id]}
                        onChange={(e) => handleInputChange(question.id, e.target.value)}
                        className={`w-full p-4 pl-12 rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} focus:ring-2 focus:ring-blue-500 outline-none`}
                        min={question.id === 'travelers' || question.id === 'numDays' ? "1" : undefined}
                      />
                    )}
                  </div>
                </motion.div>
              )
            )}
          </AnimatePresence>

          {Object.values(answers).every(answer => answer !== '') && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleGenerateTripPlan}
              className="w-full p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Generate My Trip Plan ✨
            </motion.button>
          )}
        </div>
      </div>
    </main>
  );
}
