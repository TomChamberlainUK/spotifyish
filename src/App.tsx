import React, { useState } from 'react';
import Layout from './components/Layout/Layout';
import SignIn from './components/SignIn/SignIn';
import Profile from './components/Profile/Profile';
import { useAuth } from './hooks/useAuth';

type User = {
  name: string;
  imageUrl: string;
  accessToken: string;
}

export default function App() {

  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useAuth(setUser, setIsLoggingIn);

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