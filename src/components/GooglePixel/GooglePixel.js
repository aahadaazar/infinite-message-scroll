import React, { useEffect, useState } from 'react';
import styles from './GooglePixel.module.css';

function GooglePixel({children}) {
  const [time, setTime] = useState();

  useEffect(() => {
    const date = new Date();
    setTime(`${date.getHours()}:${date.getMinutes() < 9 ? `0${date.getMinutes()}` : date.getMinutes()}`)
  }, []);

  return (
    <div className={styles.googlePixelContainer}>
      <div className={styles.screen}>
        <div className={styles.screenHeader}>
          <span className={styles.headerItem}>{'No Network'}</span>
          <span className={styles.headerItem}>{time}</span>
        </div>
        {children}
      </div>
    </div>
  )
}

export default GooglePixel

