import {useEffect, useState} from 'react';
import type {Dispatch, SetStateAction} from 'react';
import {fetchPhotos, type Photo} from '@api/photos';

const PAGE_SIZE = 15;
type ReturnValue = [
  boolean,
  Dispatch<SetStateAction<boolean>>,
  Photo[], number,
  Dispatch<SetStateAction<number>>,
  number,
]
export const usePhotosWithPagination = (): ReturnValue => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPhotos = async () => {
      try {
        const photosNew = await fetchPhotos({page, per_page: PAGE_SIZE});
        setPhotos(prev => [...prev, ...photosNew]);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    getPhotos();
  }, [page]);

  return [isLoading, setIsLoading, photos, page, setPage, PAGE_SIZE];
};