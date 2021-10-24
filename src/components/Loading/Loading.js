import React from 'react';
import styles from './Loading.module.css';

function Loading(props) {
  return (
    <svg className={styles.loading} viewBox="25 25 50 50">
    <circle cx="50" cy="50" r="20"></circle>
  </svg>
  )
}
export default Loading

