import { useEffect, type MutableRefObject } from 'react';

type Options = {
  ref: MutableRefObject<Element | null>;
  threshold?: number;
  triggerOnce?: boolean;
  onView?: VoidFunction;
}
export const useIntersectionObserver = ({ref, threshold = 0.5, triggerOnce = true, onView}: Options) => {
  useEffect(() => {
    if (!ref.current) return;
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]): void => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            onView?.();
            if (triggerOnce && ref.current) {
              observer.unobserve(ref.current);
            }
          }
        });
      }, {threshold});

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };

  }, [
    triggerOnce,
    onView,
    ref,
    threshold,
  ]);
};