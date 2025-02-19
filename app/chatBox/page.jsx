"use client";

import { useState } from 'react';
import { handleLanguageDetection, handleSummarization, handleTranslation } from '../utils/aiHandlers';

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'es', name: 'Spanish' },
  { code: 'ru', name: 'Russian' },
  { code: 'tr', name: 'Turkish' },
  { code: 'fr', name: 'French' },
];

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]); // Store chat messages
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('en'); // Default to English
  const [summary, setSummary] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const handleSendMessage = async () => {
    if (!inputText.trim()) return; // Ignore empty input

    setIsProcessing(true);
    setError('');

    try {
      // Add the user's message to the chat
      setMessages((prev) => [...prev, { text: inputText, sender: 'user' }]);

      // Detect the language of the input text
      const detectedLanguageCode = await handleLanguageDetection(inputText);
      const detectedLanguage = LANGUAGES.find((lang) => lang.code === detectedLanguageCode)?.name || detectedLanguageCode;

      // Add the detected language to the chat
      setMessages((prev) => [...prev, { text: `Detected Language: ${detectedLanguage}`, sender: 'system' }]);

      // Clear the input field
      setInputText('');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSummarize = async () => {
    try {
      setIsProcessing(true);
      const summaryText = await handleSummarization(inputText);
      setSummary(summaryText);
      setMessages((prev) => [...prev, { text: summaryText, sender: 'system' }]);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTranslate = async () => {
    try {
      setIsProcessing(true);
      const translated = await handleTranslation(summary || inputText, 'en', targetLanguage);
      setTranslatedText(translated);
      setMessages((prev) => [...prev, { text: translated, sender: 'system' }]);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md flex flex-col h-[80vh]">
        <h1 className="text-2xl font-bold mb-4">AI Text Processor</h1>

        {/* Chat Output Area */}
        <div className="flex-1 overflow-y-auto mb-4 space-y-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg ${
                message.sender === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 text-black self-start'
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="flex flex-col gap-2">
          <textarea
            className="w-full p-2 border rounded-md resize-none"
            placeholder="Type a message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault(); // Prevent newline in textarea
                handleSendMessage();
              }
            }}
            disabled={isProcessing}
          />
          <button
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
            onClick={handleSendMessage}
            disabled={isProcessing}
          >
            {isProcessing ? 'Sending...' : 'Send'}
          </button>
        </div>

        {/* Summarization Button */}
        {inputText.length > 150 && (
          <button
            className="bg-green-500 text-white p-2 mt-2 rounded-md hover:bg-green-600 disabled:bg-gray-400"
            onClick={handleSummarize}
            disabled={isProcessing}
          >
            Summarize
          </button>
        )}

        {/* Translation Dropdown & Button */}
        <div className="mt-4 flex gap-2">
          <select
            className="border p-2 rounded-md"
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
          <button
            className="bg-purple-500 text-white p-2 rounded-md hover:bg-purple-600 disabled:bg-gray-400"
            onClick={handleTranslate}
            disabled={isProcessing}
          >
            Translate
          </button>
        </div>

        {/* Translated Output */}
        {translatedText && (
          <p className="mt-4 p-2 bg-gray-200 rounded-md">
            <strong>Translated:</strong> {translatedText}
          </p>
        )}

        {/* Error Display */}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
}
