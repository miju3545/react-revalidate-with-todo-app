import React, { ComponentType, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import token from './token';

type WrappedProps = {};

function withNotLoggedIn<T extends WrappedProps>(
  WrappedComponent: ComponentType<T>
) {
  const Component = (props: T) => {
    const navigate = useNavigate();
    const isLogged = token.isExist();

    useEffect(() => {
      if (isLogged) {
        navigate('/todos');
      }
    }, [isLogged, navigate]);

    return <WrappedComponent {...props} />;
  };

  return Component;
}

export default withNotLoggedIn;
