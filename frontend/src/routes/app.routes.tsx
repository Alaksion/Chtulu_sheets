import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignIn from '../ui/screens/SignIn';

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={SignIn} exact path="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRoutes;
