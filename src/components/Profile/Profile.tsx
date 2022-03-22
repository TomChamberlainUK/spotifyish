import React from 'react';
import styles from './Profile.module.scss';

type Props = {
  user: User,
  signOut: () => void;
}

export default function Profile({ user, signOut }: Props) {
  return (
    <>
      <h2>Profile</h2>
      <div className={styles.container}>
        <img className={styles.profilePicture} src={user.imageUrl} alt={`Spotify profile for ${user.name}`}/>
        <div className={styles.text}>
          <h3 className={styles.userName}>{user.name}</h3>
          <p>Welcome Back!</p>
          <button onClick={signOut}>Sign Out</button>
        </div>
      </div>
    </>
  );
}