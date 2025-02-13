import { type FC, useCallback } from 'react';
import { Spinner } from '@commons/spinner';
import { useSessionStorage } from '@commons/session-storage';
import { usePhotosWithPagination } from './hooks.ts';
import { GridItem } from './GridItem.tsx';
import './Grid.css';

const NO_PHOTOS_TEXT = 'Sorry, No Photos found, try again later';
const STORAGE_KEY = 'favorites';

export const PhotosGrid: FC = () => {
  const [isLoading, hasMore, photos, page, setPage, pageSize] = usePhotosWithPagination();
  const [value, setValue] = useSessionStorage<number[]>(STORAGE_KEY, []);

  const handleClick = useCallback((id: number) => {
    if (value.includes(id)) {
      setValue((prev) => prev.filter(storedId => storedId !== id));
    } else {
      setValue((prev) => [...prev, id]);
    }
  }, [setValue, value]);

  const handleView = useCallback(() => {
    setPage((page) => page + 1);
  }, [setPage]);

  if (!isLoading && page === 1 && photos.length === 0) return <span>{NO_PHOTOS_TEXT}</span>;
  return (
    <>
      <div className="grid">
        {photos.map((photo, index) =>
          <GridItem
            key={photo.id}
            {...photo}
            isFirst={index === 0}
            isLazy={index + 1 > pageSize}
            onClick={() => handleClick(photo.id)}
            isActive={value.includes(photo.id)}
            isObservable={index === photos.length - 1 && hasMore}
            onView={handleView}
          />,
        )}
      </div>
      {isLoading && <Spinner/>}
    </>
  );
};