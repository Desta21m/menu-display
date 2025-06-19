import { Restaurant, Language } from './types';

export async function fetchRestaurant(subdomain: string): Promise<Restaurant> {
  // Relative path works because both frontend and API are served through the same Nginx
  const url = `http://localhost:8081/api/businessEtitty/${subdomain}`;
  try{
     const response = await fetch(url, {
      cache: 'no-store' // Disable caching during debugging
    });
     if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
        const text = await response.text();
    if (!text) {
      throw new Error('Empty response from server');
    }

    return JSON.parse(text);

  } catch (error){
    console.error(`Failed to fetch restaurant (URL: ${url}):`, error);
    throw error;
  }
}

export async function getSupportedLanguages(subdomain: string): Promise<Language[]> {
  const restaurant = await fetchRestaurant(subdomain);
  return restaurant.menu.supportedLanguages;
}