import {useEffect, useState} from 'react';
import {fetchPhotos, type Photo} from '@api/photos';

export const useInitialPhotos = (): [boolean, Photo[]] => {
  const [initialPhotos, setInitialPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getInitialPhotos = async () => {
      try {
        const photos = await fetchPhotos({});
        setInitialPhotos(photos);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    getInitialPhotos();
  }, []);

  return [isLoading, initialPhotos]
}