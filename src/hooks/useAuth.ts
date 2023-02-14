import React from 'react';
import token from '../utils/token';
import fetcher from '../utils/fetcher';
import { useNavigate } from 'react-router-dom';

type Info = { email: string; password: string };

export default function useAuth(): {
  signin: (data: Info) => Promise<any>;
  signup: (data: Info) => Promise<any>;
  logout: () => void;
} {
  const navigate = useNavigate();

  const signin = (data: Info) => {
    return fetcher({
      method: 'POST',
      path: '/auth/signin',
      body: data,
    });
  };

  const signup = (data: Info) => {
    return fetcher({
      method: 'POST',
      path: '/auth/signup',
      body: data,
    });
  };

  const logout = () => {
    token.clear();
    navigate('/signin');
  };

  return { signin, signup, logout };
}
