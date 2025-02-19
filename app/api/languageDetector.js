// pages/api/detect-language.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { text } = req.body; // Extract text from the request body

    // Step 1: Check if the language detector is available
    const capabilities = await self.ai.languageDetector.capabilities();
    console.log("Language detector capabilities:", capabilities);

    if (capabilities.available === 'no') {
      return res.status(400).json({ message: 'Language detector API is not available.' });
    }

    // Step 2: Create the language detector
    console.log("Creating language detector...");
    const languageDetector = await self.ai.languageDetector.create();

    // Step 3: Detect the language of the text
    console.log("Detecting language for text:", text);
    const detectedLanguages = await languageDetector.detect(text);

    // Step 4: Extract the top detected language
    let result;
    if (Array.isArray(detectedLanguages)) {
      // Find the language with the highest confidence score
      const topLanguage = detectedLanguages.reduce((top, current) => {
        return current.confidence > top.confidence ? current : top;
      });
      result = {
        detectedLanguage: topLanguage.detectedLanguage,
        confidence: topLanguage.confidence,
      };
    } else {
      // If the result is not an array, assume it's a single language
      result = {
        detectedLanguage: detectedLanguages.detectedLanguage,
        confidence: detectedLanguages.confidence,
      };
    }

    // Step 5: Return the result
    res.status(200).json({ success: true, result });
  } catch (error) {
    console.error("Error during language detection:", error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
