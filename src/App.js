import React, { Suspense, lazy, useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AppBar from './components/AppBar/AppBar';
import routes from './routes';
import { authOperations } from './redux/auth';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import PublicRoute from './components/PublicRoute/PublicRoute';
import Loader from './components/Loader/Loader';

const HomeView = lazy(() => import('./views/HomeView/HomeView.js'));
const RegisterView = lazy(() => import('./views/RegisterView/RegisterView.js'));
const LoginView = lazy(() => import('./views/LoginView/LoginView.js'));
const ContactsView = lazy(() => import('./views/ContactsView/ContactsView.js'));

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authOperations.getCurrentUser());
  }, [dispatch]);

  return (
    <>
      <AppBar />
      <Suspense fallback={<Loader />}>
        <Switch>
          <PublicRoute exact path={routes.homeView} component={HomeView} />
          <PublicRoute
            path={routes.registerView}
            component={RegisterView}
            restricted
            redirectTo={routes.contactsView}
          />
          <PublicRoute
            path={routes.loginView}
            component={LoginView}
            restricted
            redirectTo={routes.contactsView}
          />
          <PrivateRoute
            path={routes.contactsView}
            component={ContactsView}
            redirectTo={routes.loginView}
          />
        </Switch>
      </Suspense>
    </>
  );
}
