import { type FC, memo, useRef } from 'react';
import { type Photo } from '@api/photos';
import HeartIcon from '@assets/heart.svg';
import { useIntersectionObserver } from '@commons/intersection-observer';
import './Grid.css';

interface Props extends Photo {
  isLazy?: boolean;
  isFirst?: boolean;
  isActive?: boolean;
  isObservable: boolean;
  onClick: VoidFunction;
  onView?: VoidFunction;
}

export const GridItem: FC<Props> = memo(({
  src,
  alt,
  photographer,
  isFirst,
  isLazy,
  isActive = false,
  isObservable,
  onClick,
  onView,
  id,
}) => {
  const ref = useRef(null);
  useIntersectionObserver({ref, onView});
  return (
    <div
      ref={isObservable ? ref : undefined}
      className="grid-item"
      onClick={onClick}
      data-testid={id}
    >
      <picture>
        <source srcSet={src.small} media="(width <= 40rem)"/>
        <img
          srcSet={src.medium}
          alt={alt}
          {...(isLazy ? { loading: 'lazy' } : {})}
          {...(isFirst ? { fetchpriority: 'high' } : {})}
        />
      </picture>
      <div className={`overlay ${isActive ? 'active' : ''}`}>
        <div className="header">
          <div className="favorite">
            <HeartIcon/>
          </div>
        </div>
        <div className="footer">
          <div>
            <div className="separator"/>
            <p>{photographer}</p>
          </div>
        </div>
      </div>
    </div>
  );
});