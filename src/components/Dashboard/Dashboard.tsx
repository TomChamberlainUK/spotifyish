import React, { useState } from 'react';
import styles from './Dashboard.module.scss';
import Profile from '../Profile/Profile';
import Music from '../Music/Music';

type Props = {
  user: User,
  signOut: () => void;
}

export default function Dashboard({ user, signOut }: Props) {
  return (
    <div className={styles.container}>
      <h1>Dashboard</h1>
      <Profile user={user} signOut={signOut} />
      <Music user={user} />
    </div>
  );
}