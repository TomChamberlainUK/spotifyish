import React, { useEffect } from 'react';
import styles from './Auth.module.scss';

type Props = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export default function Auth({ user, setUser }: Props) {

  // Handle getting user data from spotify API
  useEffect(() => {

    // First we need an access token, try to get one from local storage
    let accessToken = window.localStorage.getItem('access_token') ?? '';

    // If there's no available access token, check to see if the URL contains a hash
    // Spotify's implicit grant auth sends an access token via a hash in the URL
    if (!accessToken) {
      const hash = window.location.hash;

      // If there's a hash, attempt to get access token from it then delete the hash
      if (hash) {
        accessToken = new URLSearchParams(hash.substr(1)).get('access_token') ?? '';
        window.history.replaceState('', document.title, window.location.pathname + window.location.search);

        // If we successfully obtained an access token, update local storage
        if (accessToken) {
          window.localStorage.setItem('access_token', accessToken);
        }
      }
    }

    // If there's no access token available then no requests can be made to the API
    if (!accessToken) return;

    // Fetch user data from spotify API
    // (We'll use an async IIFE to allow async/await syntax in useEffect)
    (async function fetchRecentlyPlayedData() {

      // Configure the headers for the GET request
      const fetchOptions: RequestInit = {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + accessToken
        }
      }

      try {
        // Send a GET request to the API and stringify the response
        const response = await fetch('https://api.spotify.com/v1/me', fetchOptions);
        const data = await response.json();

        // Handle any errors from server
        if (data.error) {
          const { error } = data;
          throw new Error(`(${error.status}) ${error.message}`);
        }

        // Parse user data from response and update App state
        setUser({
          accessToken,
          name: data.display_name,
          imageUrl: data.images[0].url
        });

      } catch(error) {
        console.error(error);
      }

    })();

  }, [setUser]);
  

  // Log user out
  function logOut() {
    // Remove user info from App state and remove access token from local storage
    setUser(null);
    window.localStorage.removeItem('access_token');
  }


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
      {
        !user
          ? <>
              <i className={styles.icon}>🎧</i>
              <h2>Welcome to Spotify<span className={styles.italic}>ish</span>!</h2>
              <a href={spotifyAuthUrl}>Log In!</a>
            </>
          : <>
              <img className={styles.profilePicture} src={user.imageUrl} alt={`Spotify profile for ${user.name}`}/>
              <h2>Welcome Back {user.name}!</h2>
              <button onClick={logOut}>Log Out</button>
            </>
      }
    </div>
  );
}