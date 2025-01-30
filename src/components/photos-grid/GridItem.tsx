import { type FC, memo, useState } from 'react';
import { type Photo } from '@api/photos';
import HeartIcon from '@assets/heart.svg';
import './Grid.css';

const EAGER_LOAD = 'eager'
const LAZY_LOAD = 'lazy'

interface Props extends Photo {
  isLazy?: boolean;
  isEager?: boolean;
}
export const GridItem: FC<Props> = memo(({src, alt, photographer, isEager, isLazy}) => {
  const [isActive, setIsActive] = useState(false);
  const imageLoad = isEager ? EAGER_LOAD: (isLazy ? LAZY_LOAD : undefined)

  return (
    <div
      className={`grid-item`}
      onClick={() => setIsActive(!isActive)}
    >
      <picture>
        <source srcSet={src.small} media="(width <= 40rem)"/>
        <img
          srcSet={src.medium}
          alt={alt}
          loading={imageLoad}
        />
      </picture>
      <div className={`overlay ${isActive ? 'active' : ''}`}>
        <div className="header">
          <button><span><HeartIcon /></span></button>
        </div>
        <div className="footer">
          <p>{photographer}</p>
        </div>
      </div>
    </div>
  );
});