import { type FC, useCallback } from 'react';
import { Spinner } from '@commons/spinner';
import { useSessionStorage } from '@commons/session-storage';
import { useInitialPhotos } from './hooks.ts';
import { GridItem } from './GridItem.tsx';
import './Grid.css';

const NO_PHOTOS_TEXT = 'Sorry, No Photos found, try again later'

export const PhotosGrid: FC = () => {
  const [isLoading, initialPhotos] = useInitialPhotos();
  const [value, setValue] = useSessionStorage<number[]>('favorites', [])

  const handleClick = useCallback((id: number) => {
    if (value.includes(id)) {
      setValue((prev) => prev.filter(storedId => storedId !== id))
    } else {
      setValue((prev) => [...prev, id])
    }
  }, [setValue, value])


    if (isLoading) return <Spinner />;
  if (initialPhotos.length === 0) return <span>{NO_PHOTOS_TEXT}</span>;

  return (
    <div className="grid">
      {initialPhotos.map((photo, index) =>
        <GridItem
          key={photo.id}
          {...photo}
          isEager={index === 0}
          onClick={() => handleClick(photo.id)}
          isActive={value.includes(photo.id)}
        />
      )}
    </div>
  );
};