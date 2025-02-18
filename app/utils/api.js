const API_URL = 'https://api.chromeai.com/v1'; // Replace with the actual API URL

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
      'Authorization': `Bearer YOUR_API_KEY`,
    },
    body: JSON.stringify({ text, targetLanguage }),
  });
  return response.json();
};

export const detectLanguage = async (text) => {
  const response = await fetch(`${API_URL}/detect`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer YOUR_API_KEY`,
    },
    body: JSON.stringify({ text }),
  });
  return response.json();
};
