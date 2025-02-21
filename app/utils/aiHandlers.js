// Language Detection
export const handleLanguageDetection = async (inputText) => {
  try {
    // Check if the browser supports the AI API and language detection
    if (!('ai' in self) || !('languageDetector' in self.ai)) {
      throw new Error("Language detection is not available on this browser.");
    }

    // Get the capabilities of the language detector
    const languageDetectorCapabilities = await self.ai.languageDetector.capabilities();
    const canDetect = languageDetectorCapabilities.capabilities;

    // Handle cases where language detection is not available
    if (canDetect === "no") {
      throw new Error("Language detection can't be used at the moment.");
    }

    // Handle cases where language detection is available and can or can not be used at the moment
    let detector;
    if (canDetect === "readily") {
      // Create the detector if it's readily available
      detector = await self.ai.languageDetector.create();
    } else if (canDetect === "after-download") {
      // Create the detector and monitor the download progress if the model hasn't been downloaded already
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
export const handleTranslation = async (inputText, sourceLanguage, targetLanguage) => {
  try {
    // Check if the browser supports the AI API and the translation feature
    if (!('ai' in self) || !('translator' in self.ai)) {
      throw new Error("Translation is not available on this browser.");
    }

    // Get the capabilities of the translator
    const translatorCapabilities = await self.ai.translator.capabilities();

    // Check if the language pair is available for translation
    const isLanguagePairAvailable = translatorCapabilities.languagePairAvailable(
      sourceLanguage,
      targetLanguage
    );

    // Handle cases where the translation feature is not available
    if (isLanguagePairAvailable === "no") {
      throw new Error("Translation can't be used at the moment.");
    }

    // Handle cases where the language pair is not available fot translation
    if (isLanguagePairAvailable !== "readily") {
      throw new Error(
        `Translation from ${sourceLanguage} to ${targetLanguage} is not available.`
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
    // Check if the browser supports the AI API and the summarization feature
    if (!('ai' in self) || !('summarizer' in self.ai)) {
      throw new Error("Summarization is not available on this browser.");
    }

    // Get the capabilities of the summarizer
    const summarizerCapabilities = await self.ai.summarizer.capabilities();
    const available = summarizerCapabilities.available;

    // Handle cases where summarization feature is not available
    if (available === "no") {
      throw new Error("Summarization can't be used at the moment.");
    }

    // Handle cases where the summarization model needs to be downloaded
    // if (available === "after-download") {
    //   throw new Error("Summarization model hasn't been downloaded yet.");
    // }

    let summarizer;
    if (available === "readily") {
      // Create the summarizer if it's readily available
      summarizer = await self.ai.summarizer.create();
    } else if (available === "after-download") {
      // Create the summarizer and monitor the download progress
      // summarizer = await self.ai.summarizer.create({
      //   monitor(m) {
      //     m.addEventListener("downloadprogress", (e) => {
      //       console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
      //     });
      //   },
      // });
      // await summarizer.ready; // Wait for the summarizer to be ready

      // Throw an error message instead because I don't want the user to have to download something of 2.5gb
      throw new Error("Summarization model hasn't been downloaded yet.");
    }

    // Summarize the input text and return the summary
    const summary = await summarizer.summarize(inputText);
    return summary;
  } catch (err) {
    // Handle possible errors
    throw new Error(err.message);
  }
};
