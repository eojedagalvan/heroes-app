import React, { useContext } from 'react'
import { LoginScreen } from '../components/login/LoginScreen';
import { DashboardRoutes } from './DashboardRoutes';
import { PrivateRoute } from './PrivateRoute';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import { AuthContext } from '../auth/AuthContext';

export const AppRouter = () => {

    const { user: { logged } } = useContext( AuthContext );
    return (
        <Router>
        <div>

          <Switch>
            <Route exact path="/login" component={ LoginScreen } />;
            <PrivateRoute 
              path="/" 
              component={ DashboardRoutes }
              isAuthenticated= { logged }  
            />;
          </Switch>
        </div>
      </Router>

    )
}
