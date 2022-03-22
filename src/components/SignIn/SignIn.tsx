import React, { useEffect } from 'react';
import styles from './SignIn.module.scss';

export default function SignIn() {

  // Configure URL for Spotify auth using implicit grant flow:
  // - Configure query parameters
  const client_id = 'c1625e863d41454ab7922df1988f882f';
  const scope = 'user-read-recently-played';
  const redirect_uri = 'http://localhost:3000';
  const state = '';
  const show_dialogue = 'true';
  // - Build Spotify auth url
  let spotifyAuthUrl = 'https://accounts.spotify.com/authorize';
  spotifyAuthUrl += '?response_type=token';
  spotifyAuthUrl += '&client_id=' + encodeURIComponent(client_id);
  spotifyAuthUrl += '&scope=' + encodeURIComponent(scope);
  spotifyAuthUrl += '&redirect_uri=' + encodeURIComponent(redirect_uri);
  spotifyAuthUrl += '&state=' + encodeURIComponent(state);
  spotifyAuthUrl += '&show_dialog=' + encodeURIComponent(show_dialogue);

  return (
    <div className={styles.container}>
      <i className={styles.icon}>🎧</i>
      <h2>Welcome to Spotify<span className={styles.italic}>ish</span>!</h2>
      <a href={spotifyAuthUrl}>Sign In</a>
    </div>
  );
}