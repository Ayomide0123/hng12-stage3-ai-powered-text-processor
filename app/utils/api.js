const API_URL = 'http://localhost:3000'; // Replace with the actual API URL

export const summarizeText = async (text) => {
  const response = await fetch(`${API_URL}/summarize`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer YOUR_API_KEY`, // Replace with your API key
    },
    body: JSON.stringify({ text }),
  });
  return response.json();
};

export const translateText = async (text, targetLanguage) => {
  const response = await fetch(`${API_URL}/translate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer YOUR_API_KEY`, // Replace with your API key
    },
    body: JSON.stringify({ text, targetLanguage }),
  });
  return response.json();
};

export const detectLanguage = async (text) => {
  const response = await fetch(`${API_URL}/api/languageDetector`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer AlvnQOgXEaDkm1KTvW3ZasTnP5EAdLCnhbhfTzwAE2D5V1t2jyJ3+jjnQWgXOtgO40FeJ2rt7V69DIsxHW/7uA4AAABXeyJvcmlnaW4iOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJmZWF0dXJlIjoiTGFuZ3VhZ2VEZXRlY3Rpb25BUEkiLCJleHBpcnkiOjE3NDk1OTk5OTl9`, // Replace with your API key
    },
    body: JSON.stringify({ text }),
  });
  return response.json();
};
