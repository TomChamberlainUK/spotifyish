import React, { useState } from 'react';
import Layout from './components/Layout/Layout';
import SignIn from './components/SignIn/SignIn';
import Dashboard from './components/Dashboard/Dashboard';
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
    window.localStorage.removeItem('access_token_expiration');
  }

  return (
    <Layout>
      {
        isLoggingIn
          ? <p>Loading</p>
          : !user
            ? <SignIn />
            : <Dashboard user={user} signOut={signOut} />
      }
    </Layout>
  );

}