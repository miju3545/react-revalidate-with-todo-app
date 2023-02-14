import React, { ComponentType, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import token from './token';

type WrappedProps = {};

function withLoggedIn<T extends WrappedProps>(
  WrappedComponent: ComponentType<T>
) {
  const Component = (props: T) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const isLoggedIn = token.isExist();

    useEffect(() => {
      if (pathname === '/') navigate('/todo');
      if (!isLoggedIn) {
        navigate('/signin');
      }
    }, [isLoggedIn, navigate]);

    return <WrappedComponent {...props} />;
  };

  return Component;
}

export default withLoggedIn;
