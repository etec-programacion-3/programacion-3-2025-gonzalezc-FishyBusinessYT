// API Service
const API_BASE_URL = 'http://localhost:3001';

export const api = {
  getAllCreatures: async () => {
    const response = await fetch(`${API_BASE_URL}/creatures`);
    if (!response.ok) {
      throw new Error('Failed to fetch creatures');
    }
    return response.json();
  }
};
