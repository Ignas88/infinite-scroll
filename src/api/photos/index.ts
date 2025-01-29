type Params = { query?: string; page?: number; }
export type Photo = { id: number; alt: string; photographer: string; src: { small: string; medium: string; large: string; } }

export const fetchPhotos = async ({query = 'nature', page = 1}: Params): Promise<Photo[]> => {
  const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&page=${page}&orientation=square`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: import.meta.env.VITE_API_KEY,
    },
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const responseJson = await response.json();
  return responseJson.photos;
};