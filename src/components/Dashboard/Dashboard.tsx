import React, { useState } from 'react';
import styles from './Dashboard.module.scss';
import Profile from '../Profile/Profile';

type Props = {
  user: User,
  signOut: () => void;
}

export default function Dashboard({ user, signOut }: Props) {
  return (
    <div className={styles.container}>
      <Profile user={user} signOut={signOut} />
    </div>
  );
}