import React from 'react';
import styles from './Music.module.scss';

export default function Music() {
  return (
    <>
      <h2>Music</h2>
      <div className={styles.container}>
        <div className={styles.artistsContainer}>

        </div>
        <div className={styles.tracksContainer}>
          
        </div>
      </div>
    </>
  );
}