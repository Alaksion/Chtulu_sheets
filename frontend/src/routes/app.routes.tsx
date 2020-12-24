import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Dashboard from 'ui/screens/Dashboard';
import SignIn from '../ui/screens/SignIn';
import SignUp from '../ui/screens/SignUp';
import AppRoute from './AppRoute/appRoute';

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <AppRoute Component={SignIn} exact path="/" />
        <AppRoute Component={SignUp} exact path="/signup" />
        <AppRoute Component={Dashboard} exact isPrivate path="/dashboard" />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRoutes;
