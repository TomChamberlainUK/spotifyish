import React, { useState, useEffect } from 'react';
import Layout from './components/Layout/Layout';
import SignIn from './components/SignIn/SignIn';
import Profile from './components/Profile/Profile';

type User = {
  name: string;
  imageUrl: string;
  accessToken: string;
}

export default function App() {

  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [user, setUser] = useState<User | null>(null);

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

    // If there's an access token available then make a request to the API
    if (accessToken) {

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

    }

    setIsLoggingIn(false);

  }, [setUser]);

  function signOut() {
    setUser(null);
    window.localStorage.removeItem('access_token');
  }

  return (
    <Layout>
      {
        isLoggingIn
          ? <p>Loading</p>
          : !user
            ? <SignIn />
            : <Profile user={user} signOut={signOut} />
      }
    </Layout>
  );

}