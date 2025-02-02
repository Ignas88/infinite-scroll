import { useEffect, useState, useRef } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { fetchPhotos, type Photo } from '@api/photos';

const PAGE_SIZE = 16;
type ReturnValue = [
  boolean,
  boolean,
  Photo[],
  number,
  Dispatch<SetStateAction<number>>,
  number,
]
export const usePhotosWithPagination = (): ReturnValue => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    setIsLoading(true);
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;
    const getPhotos = async () => {
      try {
        const photosNew = await fetchPhotos({page, per_page: PAGE_SIZE, signal});
        setPhotos(prev => [...prev, ...photosNew]);
        setIsLoading(false);
        if (photosNew.length < PAGE_SIZE) setHasMore(false);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          console.error(err);
          setIsLoading(false);
        }
      }
    };
    getPhotos();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [page]);

  return [isLoading, hasMore, photos, page, setPage, PAGE_SIZE];
};