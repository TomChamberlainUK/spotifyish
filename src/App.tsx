import React, { useState } from 'react';
import Layout from './components/Layout/Layout';
import Auth from './components/Auth/Auth';

export default function App() {

  const [accessToken, setAccessToken] = useState<string>('');

  return (
    <Layout>
      <p>Hello World!</p>
      <Auth setAccessToken={setAccessToken} />
      {accessToken && <p>{accessToken}</p>}
    </Layout>
  );

}