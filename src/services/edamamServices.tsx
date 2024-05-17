import axios from 'axios';

const EDAMAM_APP_ID = process.env.EDAMAM_APP_ID;
const EDAMAM_APP_KEY = process.env.EDAMAM_APP_KEY;

export const getRecipes = async (ingredients: string[]) => {
  const response = await axios.get('https://api.edamam.com/search', {
    params: {
      q: ingredients.join(','),
      app_id: EDAMAM_APP_ID,
      app_key: EDAMAM_APP_KEY,
    },
  });
  return response.data.hits;
};
