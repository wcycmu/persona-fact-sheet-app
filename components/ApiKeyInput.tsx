
import React, { useState } from 'react';

interface ApiKeyInputProps {
  onApiKeySave: (apiKey: string) => void;
}

export const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onApiKeySave }) => {
  const [key, setKey] = useState('');

  const handleSave = () => {
    onApiKeySave(key);
  };

  return (
    <div className="animate-fadeIn space-y-4">
      <h2 className="text-2xl font-semibold text-sky-300">Enter Your API Key</h2>
      <p className="text-slate-400">
        To use this application, please provide your Google Gemini API key.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Enter your Gemini API Key"
          className="flex-grow p-3 border border-slate-600 rounded-lg shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-slate-700 text-slate-100 placeholder-slate-400 transition duration-150 ease-in-out"
        />
        <button
          onClick={handleSave}
          disabled={!key.trim()}
          className="bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out transform hover:scale-105 active:scale-95"
        >
          Save Key
        </button>
      </div>
      <div className="bg-amber-700/30 border border-amber-500 text-amber-300 px-4 py-3 rounded-lg mt-4" role="alert">
        <strong className="font-bold text-amber-200">Important:</strong>
        <span className="block sm:inline ml-1">
          Your API key is stored only in your browser's session and is required to interact with the Gemini API. It is not saved on any server. Close the tab to clear it.
        </span>
      </div>
    </div>
  );
};
