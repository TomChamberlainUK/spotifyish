import React from 'react';
import styles from './ArtistList.module.scss';

type ArtistListProps = {
  children: React.ReactNode;
}

type ArtistListItemProps = {
  name: string;
}

export default function ArtistList({ children }: ArtistListProps) {
  return (
    <ul className={styles.listContainer}>
      {children}
    </ul>
  )
}

export function ArtistListItem({ name }: ArtistListItemProps) {
  return (
    <li className={styles.itemContainer}>
      <p className={styles.artistName}>{name}</p>
    </li>
  );
}