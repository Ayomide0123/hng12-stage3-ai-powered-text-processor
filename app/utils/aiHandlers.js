// Language Detection
export const handleLanguageDetection = async (inputText) => {
  try {
    const languageDetectorCapabilities = await self.ai.languageDetector.capabilities();

    if (languageDetectorCapabilities.capabilities === 'no') {
      throw new Error('Language detection is not available.');
    }

    const detector = await self.ai.languageDetector.create();

    const results = await detector.detect(inputText);
    if (!results.length) {
      throw new Error('No language detected.');
    }

    return results[0].detectedLanguage; // Return only the language code
  } catch (err) {
    throw new Error(err.message);
  }
};



// Summarization
export const handleSummarization = async (inputText) => {
  try {
    const summarizerCapabilities = await self.ai.summarizer.capabilities();
    if (summarizerCapabilities.available === 'no') {
      throw new Error('Summarization is not available.');
    }

    const summarizer = await self.ai.summarizer.create({
      type: 'summary',
      format: 'plaintext',
      length: 'medium',
    });

    const summary = await summarizer.summarize(inputText);
    return `Summary: ${summary}`;
  } catch (err) {
    throw new Error(err.message);
  }
};

// Translation
export const handleTranslation = async (inputText, sourceLanguage, targetLanguage) => {
  try {
    const translatorCapabilities = await self.ai.translator.capabilities();
    if (!translatorCapabilities.languagePairAvailable(sourceLanguage, targetLanguage)) {
      throw new Error(`Translation from ${sourceLanguage} to ${targetLanguage} is not available.`);
    }

    const translator = await self.ai.translator.create({ sourceLanguage, targetLanguage });
    return await translator.translate(inputText);
  } catch (err) {
    throw new Error(err.message);
  }
};
