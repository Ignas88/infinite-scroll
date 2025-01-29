import {type FC} from 'react';
import {useInitialPhotos} from './hooks.ts';
import './Grid.css';
import {Spinner} from '@components/commons/spinner';

const NO_PHOTOS_TEXT = 'Sorry, No Photos found, try again later'

export const PhotosGrid: FC = () => {
  const [isLoading, initialPhotos] = useInitialPhotos();

  if (isLoading) return <Spinner />;
  if (initialPhotos.length === 0) return <span>{NO_PHOTOS_TEXT}</span>;

  return (
    <div className="grid">
      {initialPhotos.map(({id, src, alt}, index) =>
        <div key={id} className="grid-item">
          <picture>
            <source srcSet={src.small} media="(width <= 40rem)"/>
            <img
              srcSet={src.medium}
              alt={alt}
              // LCP optimisation
              loading={index === 0 ? 'eager': 'lazy'}
            />
          </picture>
        </div>
      )}
    </div>
  );
};