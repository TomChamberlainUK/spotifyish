import React, { useEffect, useState } from 'react';
import Layout from './components/Layout/Layout';

export default function App() {

  const [accessToken, setAccessToken] = useState<string>('');

  // Handle obtaining access token from hash
  useEffect(() => {

    let accessToken = '';

    // Check to see if the URL contains a hash
    const hash = window.location.hash;

    // If there's a hash, attempt to get access token from it then delete the hash
    if (hash) {
      accessToken = new URLSearchParams(hash.substr(1)).get('access_token') ?? '';
      window.history.replaceState('', document.title, window.location.pathname + window.location.search);
    }

    // Update state with access token
    setAccessToken(accessToken);

  }, []);

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
    <Layout>
      <p>Hello World!</p>
      <a href={spotifyAuthUrl}>Log In!</a>
      {accessToken && <p>{accessToken}</p>}
    </Layout>
  );

}