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
      <div className={styles.text}>
        <h2 className={styles.userName}>{user.name}</h2>
        <p>Welcome Back!</p>
        <button onClick={signOut}>Sign Out</button>
      </div>
    </div>
  );
}