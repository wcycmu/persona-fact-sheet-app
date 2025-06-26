
import React, { useState, useCallback, useEffect } from 'react';
import { SearchInput } from './components/SearchInput';
import { FactSheetDisplay } from './components/FactSheetDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorDisplay } from './components/ErrorDisplay';
import { ApiKeyInput } from './components/ApiKeyInput';
import { generateFactSheetFromGemini } from './services/geminiService';
import type { FactSheetData } from './types';
import { APP_TITLE } from './constants';

const App: React.FC = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [personName, setPersonName] = useState<string>('');
  const [factSheet, setFactSheet] = useState<FactSheetData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for API key in session storage on initial load
    const storedApiKey = sessionStorage.getItem('geminiApiKey');
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, []);

  const handleApiKeySave = (key: string) => {
    if (key.trim()) {
      setApiKey(key);
      sessionStorage.setItem('geminiApiKey', key);
    }
  };

  const handleSearch = useCallback(async (name: string) => {
    if (!apiKey) {
      setError("API Key is not set. Please provide a valid Gemini API Key.");
      return;
    }
    if (!name.trim()) {
      setError("Please enter a person's name.");
      setFactSheet(null);
      return;
    }
    setPersonName(name);
    setIsLoading(true);
    setError(null);
    setFactSheet(null);

    try {
      const data = await generateFactSheetFromGemini(name, apiKey);
      setFactSheet(data);
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        setError(`Failed to generate fact sheet: ${err.message}. Please check your API key and network connection.`);
      } else {
        setError("An unknown error occurred. Please check your API key and network connection.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [apiKey]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-slate-100 py-8 px-4 flex flex-col items-center">
      <header className="mb-10 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-rose-400 to-lime-400">
          {APP_TITLE}
        </h1>
        <p className="mt-3 text-lg text-slate-400 max-w-2xl mx-auto">
          Enter a person's name to generate an AI-powered fact sheet, summarizing information as if sourced from Wikipedia, LinkedIn, and Google Scholar.
        </p>
      </header>

      <main className="w-full max-w-3xl bg-slate-800 shadow-2xl rounded-xl p-6 md:p-10">
        {!apiKey ? (
          <ApiKeyInput onApiKeySave={handleApiKeySave} />
        ) : (
          <>
            <SearchInput onSearch={handleSearch} isLoading={isLoading} />

            {isLoading && <LoadingSpinner />}
            {error && <ErrorDisplay message={error} />}
            
            {factSheet && !isLoading && (
              <div id="fact-sheet-content-wrapper" className="mt-8">
                <FactSheetDisplay factSheetData={factSheet} personName={personName} />
              </div>
            )}
            
            {!factSheet && !isLoading && !error && personName && (
               <div className="mt-8 text-center text-slate-500">
                <p>No data to display. Try a different name or check for errors.</p>
              </div>
            )}

            {!factSheet && !isLoading && !error && !personName && (
              <div className="mt-12 text-center text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-lg">Enter a name above to get started.</p>
              </div>
            )}
          </>
        )}
      </main>
      <footer className="mt-12 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Persona Fact Sheet Generator. Powered by Gemini API.</p>
         <p className="text-xs mt-1">Note: This tool uses AI to generate information based on typical public profiles. Information may be illustrative.</p>
      </footer>
    </div>
  );
};

export default App;
