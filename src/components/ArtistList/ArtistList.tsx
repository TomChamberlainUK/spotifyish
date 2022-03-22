import React from 'react';
import styles from './ArtistList.module.scss';

type ArtistListProps = {
  children: React.ReactNode;
}

type ArtistListItemProps = {
  name: string;
  onClick: React.MouseEventHandler<HTMLElement>;
  isFiltered?: boolean;
}

export default function ArtistList({ children }: ArtistListProps) {
  return (
    <ul className={styles.listContainer}>
      {children}
    </ul>
  )
}

export function ArtistListItem({ name, isFiltered, onClick }: ArtistListItemProps) {
  return (
    <li
      className={styles.itemContainer}
      onClick={onClick}
    >
      <p className={`${styles.artistName} && ${isFiltered && styles.isFiltered}`}>{name}</p>
    </li>
  );
}