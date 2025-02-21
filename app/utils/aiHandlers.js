// Language Detection
export const handleLanguageDetection = async (inputText) => {
  try {
    const languageDetectorCapabilities =
      await self.ai.languageDetector.capabilities();
    const canDetect = languageDetectorCapabilities.capabilities;

    // if ('ai' in self && 'languageDetector' in self.ai){
    //   throw new Error("Language detection is not available on this browser.");
    // }

    if (canDetect === "no") {
      throw new Error("Language detection can't be used at the moment.");
    }

    if (canDetect === "after-download") {
      throw new Error("Language detection model hasn't been downloaded yet.");
    }

    let detector;
    if (canDetect === "readily") {
      detector = await self.ai.languageDetector.create();
    } else if (canDetect === "after-download"){
      detector = await self.ai.languageDetector.create({
        monitor(m) {
          m.addEventListener("downloadprogress", (e) => {
            console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
          });
        },
      });
      await detector.ready;
    }

    const results = await detector.detect(inputText);
    if (results.length === 0) {
      throw new Error("No language detected.");
    }

    const topLanguage = results[0].detectedLanguage;
    return topLanguage;
  } catch (err) {
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
    const translatorCapabilities = await self.ai.translator.capabilities();
    const isLanguagePairAvailable =
      translatorCapabilities.languagePairAvailable(
        sourceLanguage,
        targetLanguage
      );

    if (isLanguagePairAvailable !== "readily") {
      throw new Error(
        `Translation from ${sourceLanguage} to ${targetLanguage} is not available.`
      );
    }

    const translator = await self.ai.translator.create({
      sourceLanguage,
      targetLanguage,
      monitor(m) {
        m.addEventListener('downloadprogress', (e) => {
          console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
        });
      },
    });

    const translation = await translator.translate(inputText);
    return translation;
  } catch (err) {
    throw new Error(err.message);
  }
};


// Summarization
export const handleSummarization = async (inputText) => {
  try {
    const summarizerCapabilities = await self.ai.summarizer.capabilities();
    const available = summarizerCapabilities.available;

    if (available === "no") {
      throw new Error("Summarization is not available.");
    }

    const summarizer = await self.ai.summarizer.create();
    const summary = await summarizer.summarize(inputText); // No context needed
    return summary;
  } catch (err) {
    throw new Error(err.message);
  }
};
