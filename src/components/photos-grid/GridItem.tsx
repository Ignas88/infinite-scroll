import {type FC, memo, useRef} from 'react';
import {type Photo} from '@api/photos';
import HeartIcon from '@assets/heart.svg';
import {useIntersectionObserver} from '@commons/intersection-observer';
import './Grid.css';

const EAGER_LOAD = 'eager';
const LAZY_LOAD = 'lazy';

interface Props extends Photo {
  isLazy?: boolean;
  isEager?: boolean;
  isActive?: boolean;
  isObservable: boolean;
  onClick: VoidFunction;
  onView?: VoidFunction;
}

export const GridItem: FC<Props> = memo(({
  src,
  alt,
  photographer,
  isEager,
  isLazy,
  isActive = false,
  isObservable,
  onClick,
  onView,
  id,
}) => {
  const imageLoad = isEager ? EAGER_LOAD : (isLazy ? LAZY_LOAD : undefined);
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
          loading={imageLoad}
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
            <div className="separator" />
            <p>{photographer}</p>
          </div>
        </div>
      </div>
    </div>
  );
});