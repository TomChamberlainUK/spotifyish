import React from 'react';
import styles from './TrackGrid.module.scss';

type TrackGridProps = {
  children: React.ReactNode
}

type TrackGridItemProps = {
  name: string,
  artist: string,
  album: string,
  imageUrl: string
}

export default function TrackGrid({ children }: TrackGridProps) {
  return (
    <ul className={styles.gridContainer}>
      {children}
    </ul>
  );
}

export function TrackGridItem({ name, artist, album, imageUrl }: TrackGridItemProps) {
  return (
    <li className={styles.itemContainer}>
      <img className={styles.image} src={imageUrl} alt={`Album artwork for ${album} by ${artist}`}/>
      <h4 className={styles.artist}>{artist}</h4>
      <p className={styles.name}>{name}</p>
    </li>
  );
}