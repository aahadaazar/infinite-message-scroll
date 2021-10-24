import _ from 'lodash';
import { useState, useEffect } from 'react';

const useInfiniteScroll = (callback = () => {
  console.log('fetching');
}, ref) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    console.log(ref);
    if (ref) {
      ref.addEventListener('scroll', scrollEventListener);
    }
    return () => ref && ref.removeEventListener('scroll', scrollEventListener);
    // eslint-disable-next-line
  }, [ref]);

  useEffect(() => {
    if (!isFetching) return;
    callback(() => {
      console.log('called back');
    });
    // eslint-disable-next-line
  }, [isFetching]);


  const scrollEventListener = _.throttle(() => {
    if (ref.offsetHeight + ref.scrollTop === ref.scrollHeight && !isFetching) {
      setIsFetching(true);
      console.log('Fetch more list items!');
    }
  })

  return [isFetching, setIsFetching];
};

export default useInfiniteScroll;