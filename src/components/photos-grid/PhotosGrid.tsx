import { type FC } from 'react';
import { Spinner } from '@components/commons/spinner';
import { useInitialPhotos } from './hooks.ts';
import { GridItem } from './GridItem.tsx';
import './Grid.css';

const NO_PHOTOS_TEXT = 'Sorry, No Photos found, try again later'

export const PhotosGrid: FC = () => {
  const [isLoading, initialPhotos] = useInitialPhotos();

  if (isLoading) return <Spinner />;
  if (initialPhotos.length === 0) return <span>{NO_PHOTOS_TEXT}</span>;

  return (
    <div className="grid">
      {initialPhotos.map((photo, index) =>
        <GridItem key={photo.id} {...photo} isEager={index === 0} />
      )}
    </div>
  );
};