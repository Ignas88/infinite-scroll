import { useEffect, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { fetchPhotos, type Photo } from '@api/photos';

export const usePhotosWithPagination = (): [boolean, Dispatch<SetStateAction<boolean>>, Photo[], number, Dispatch<SetStateAction<number>>] => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPhotos = async () => {
      try {
        const photosNew = await fetchPhotos({page});
        setPhotos(prev => [...prev, ...photosNew]);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    getPhotos();
  }, [page]);

  return [isLoading, setIsLoading, photos, page, setPage]
}