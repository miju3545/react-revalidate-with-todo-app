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
    const isNotLogged = !token.isExist();

    useEffect(() => {
      if (pathname === '/') navigate('/todo');
      if (isNotLogged) {
        navigate('/signin');
      }
    }, [isNotLogged, navigate]);

    return <WrappedComponent {...props} />;
  };

  return Component;
}

export default withLoggedIn;
