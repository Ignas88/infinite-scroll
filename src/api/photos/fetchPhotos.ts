import type {Photo, Params} from './types.ts';

const options = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: import.meta.env.VITE_API_KEY,
  }
};
export const fetchPhotos = async ({query = 'nature', page = 1, per_page = 15}: Params): Promise<Photo[]> => {
  const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&page=${page}&per_page=${per_page}&orientation=landscape`, options);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const responseJson = await response.json();
  return responseJson.photos;
};