import { useState, useEffect } from 'react';

const useInfiniteScroll = (callback) => {
  const [isFetching, setIsFetching] = useState(false);
  const [elementRef, setElementRef] = useState();

  const observerCallback = (entries, observer) => {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) {
        return;
      }
      if (entry.isIntersecting && !isFetching) {
        callback();
        observer.unobserve(entry.target);
      } else if (isFetching) {
        console.log('not fetching');
      }
    });
  }

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
  }
  const observer = new IntersectionObserver(observerCallback, options);

  useEffect(() => {
    if (elementRef) {
      observer.disconnect();
      observer.observe(elementRef);
    }
    return () => {
      observer.disconnect();
    }
    // eslint-disable-next-line
  }, [elementRef])

  return [isFetching, setIsFetching, setElementRef];
};

export default useInfiniteScroll;