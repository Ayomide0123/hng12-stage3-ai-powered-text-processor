"use client";
import { useState } from 'react';

export default function ChatBox() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleLanguageDetection = async () => {
    setIsProcessing(true);
    setError('');

    try {
      const languageDetectorCapabilities = await self.ai.languageDetector.capabilities();
      const canDetect = languageDetectorCapabilities.capabilities;

      if (canDetect === 'no') {
        throw new Error('Language detection is not available.');
      }

      let detector;
      if (canDetect === 'readily') {
        detector = await self.ai.languageDetector.create();
      } else {
        detector = await self.ai.languageDetector.create({
          monitor(m) {
            m.addEventListener('downloadprogress', (e) => {
              console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
            });
          },
        });
        await detector.ready;
      }

      const results = await detector.detect(inputText);
      if (results.length === 0) {
        throw new Error('No language detected.');
      }

      const topLanguage = results[0].detectedLanguage;
      setOutputText(`Detected Language: ${topLanguage}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">AI Text Processor</h1>
        <textarea
          className="w-full p-2 border rounded-md mb-4"
          placeholder="Enter text..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
          onClick={handleLanguageDetection}
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Detect Language'}
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {/* {outputText && <p className="mt-4">{outputText}</p>} */}
        {outputText && <div className="mt-4 p-4 bg-gray-200 rounded-lg">
  <p>{outputText}</p>
</div>
}
      </div>
    </div>
  );
}
