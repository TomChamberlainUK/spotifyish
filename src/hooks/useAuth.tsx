import React, { useEffect } from 'react';

export function useAuth(
  setUser: React.Dispatch<React.SetStateAction<User | null>>,
  setIsLoggingIn: React.Dispatch<React.SetStateAction<boolean>>
) {
  // Handle getting user data from spotify API
  useEffect(() => {

    // First we need an access token, try to get one from local storage
    let accessToken = window.localStorage.getItem('access_token') ?? '';
    let accessTokenExpiration = window.localStorage.getItem('access_token_expiration') ?? '';

    // If an available access token has expired, delete it as it won't work with the Spotify API
    if (
      accessTokenExpiration
      && new Date().getTime() > parseInt(accessTokenExpiration)
    ) {
      accessToken = '';
      accessTokenExpiration = '';
      window.localStorage.removeItem('access_token');
      window.localStorage.removeItem('access_token_expiration');
    }

    // If there's no available access token, check to see if the URL contains a hash
    // Spotify's implicit grant auth sends an access token via a hash in the URL
    if (!accessToken) {
      const hash = window.location.hash;

      // If there's a hash, attempt to get access token from it then delete the hash
      if (hash) {
        accessToken = new URLSearchParams(hash.substr(1)).get('access_token') ?? '';
        accessTokenExpiration = new URLSearchParams(hash.substr(1)).get('expires_in') ?? '';
        window.history.replaceState('', document.title, window.location.pathname + window.location.search);

        // If we successfully obtained an access token, update local storage
        if (accessToken && accessTokenExpiration) {
          window.localStorage.setItem('access_token', accessToken);
          // We need to set a timestamp for when the token expires
          // Spotify provides a string describing number of seconds til expiration
          // We need to convert this to a unix timestamp for milliseconds from now
          const unixExpiration = new Date().getTime() + (parseInt(accessTokenExpiration) * 1000);
          window.localStorage.setItem('access_token_expiration', unixExpiration.toString());
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

  }, [setUser, setIsLoggingIn]);
}