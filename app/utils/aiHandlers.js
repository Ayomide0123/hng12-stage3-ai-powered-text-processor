// List of available languages
const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "pt", name: "Portuguese" },
  { code: "es", name: "Spanish" },
  { code: "ru", name: "Russian" },
  { code: "tr", name: "Turkish" },
  { code: "fr", name: "French" },
];

// Function to get language name based on the language code
function getLanguageName(code) {
  const language = LANGUAGES.find((lang) => lang.code === code);
  return language ? language.name : code;
}

// Language Detection
export const handleLanguageDetection = async (inputText) => {
  try {
    const languageDetectorCapabilities =
      await self.ai.languageDetector.capabilities();
    const canDetect = languageDetectorCapabilities.capabilities;

    if (canDetect === "no") {
      throw new Error("Language detection can't be used at the moment.");
    }

    let detector;
    if (canDetect === "readily") {
      // Create the detector if it's readily available
      detector = await self.ai.languageDetector.create();
    } else {
      detector = await self.ai.languageDetector.create({
        monitor(m) {
          m.addEventListener("downloadprogress", (e) => {
            console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
          });
        },
      });
      await detector.ready;
    }

    // Detect the language of the input text
    const results = await detector.detect(inputText);
    if (results.length === 0) {
      throw new Error("No language detected.");
    }

    // Return the top detected language since result returns an array of languages
    const topLanguage = results[0].detectedLanguage;
    return topLanguage;
  } catch (err) {
    // Handle possible errors
    throw new Error(err.message);
  }
};

// Translation
export const handleTranslation = async (
  inputText,
  sourceLanguage,
  targetLanguage
) => {
  try {
    if (sourceLanguage === targetLanguage) {
      throw new Error(`Text is already in ${getLanguageName(sourceLanguage)}`);
    }

    const translatorCapabilities = await self.ai.translator.capabilities();
    const isLanguagePairAvailable =
      translatorCapabilities.languagePairAvailable(
        sourceLanguage,
        targetLanguage
      );

    if (
      isLanguagePairAvailable === "no" ||
      isLanguagePairAvailable === "after-download"
    ) {
      throw new Error(
        `Translation from ${getLanguageName(
          sourceLanguage
        )} to ${getLanguageName(
          targetLanguage
        )} is not available on this device.`
      );
    }

    // Create the translator
    const translator = await self.ai.translator.create({
      sourceLanguage,
      targetLanguage,
      monitor(m) {
        m.addEventListener("downloadprogress", (e) => {
          console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
        });
      },
    });

    // Translate the input text and return the translation
    const translation = await translator.translate(inputText);
    return translation;
  } catch (err) {
    // Handle possible errors
    throw new Error(err.message);
  }
};

// Summarization
export const handleSummarization = async (inputText) => {
  try {
    const summarizerCapabilities = await self.ai.summarizer.capabilities();
    const available = summarizerCapabilities.available;

    // Handle cases where summarization feature is not available
    if (available === "no" || available === "after-download") {
      throw new Error("Summarization is not available on this device.");
    }

    const summarizer = await self.ai.summarizer.create();
    const summary = await summarizer.summarize(inputText); // No context needed
    return summary;
  } catch (err) {
    // Handle possible errors
    throw new Error(err.message);
  }
};
