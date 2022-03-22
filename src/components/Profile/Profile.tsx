import React from 'react';
import styles from './Profile.module.scss';

type Props = {
  user: User,
  signOut: () => void;
}

export default function Auth({ user, signOut }: Props) {
  return (
    <div className={styles.container}>
      <img className={styles.profilePicture} src={user.imageUrl} alt={`Spotify profile for ${user.name}`}/>
      <h2>Welcome Back {user.name}!</h2>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}