import React, { useState } from 'react';
import Layout from './components/Layout/Layout';
import Auth from './components/Auth/Auth';

type User = {
  name: string;
  imageUrl: string;
  accessToken: string;
}

export default function App() {

  const [user, setUser] = useState<User | null>(null);

  return (
    <Layout>
      <p>Hello World!</p>
      <Auth setUser={setUser} />
      {
        user &&
          <>
            <p>{user.name}</p>
            <img src={user.imageUrl} alt=""/>
          </>
      }
    </Layout>
  );

}