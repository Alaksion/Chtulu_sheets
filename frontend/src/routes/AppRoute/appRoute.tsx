import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import Header from '../../ui/components/Header';
import { useAuth } from '../../context/authContext';

interface IAppRouteProps extends RouteProps {
  isPrivate?: boolean;
  Component: React.ComponentType;
}

const AppRoute: React.FC<IAppRouteProps> = ({
  isPrivate = false,
  Component,
  ...rest
}: IAppRouteProps) => {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      render={() => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect to={isPrivate ? '/' : '/dashboard'} />
        );
      }}
    />
  );
};

export default AppRoute;
