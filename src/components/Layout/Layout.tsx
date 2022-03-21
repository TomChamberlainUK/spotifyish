import React, { ReactNode } from 'react';
import styles from './Layout.module.scss';

type Props = {
  children?: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
      <header className={styles.header} >
        <h1 className={styles.title}>Spotify<span className={styles.italic} >ish</span></h1>
      </header>
      <main className={styles.content}>
        {children}
      </main>
    </>
  );
}