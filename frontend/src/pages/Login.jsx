import React from 'react';
import LoginForm from '../components/LoginForm.jsx';
import { Helmet } from 'react-helmet';

export default function Login() {
  return (
    <div>
      <Helmet>
        <title>Login - MyApp</title>
        <meta name="description" content="Login to access your dashboard and manage your notes and tasks." />
        <meta name="keywords" content="login, user authentication, dashboard, notes" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <LoginForm />
    </div>
  );
}
