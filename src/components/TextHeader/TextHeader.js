import React from 'react';
import styles from './TextHeader.module.css';

function TextHeader() {
  return (
    <>

      <h1 className={styles.heading}>
        {'Infinite Scroll Message List'}
      </h1>
      <h5 className={styles.heading}>
        {'`Swipe Left` to delete message is disabled for a while!'}
      </h5>
    </>
  )
}
export default TextHeader

