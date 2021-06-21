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
          <PublicRoute exact path={routes.homeView}>
            <HomeView />
          </PublicRoute>

          <PublicRoute
            path={routes.registerView}
            restricted
            redirectTo={routes.contactsView}
          >
            <RegisterView />
          </PublicRoute>

          <PublicRoute
            path={routes.loginView}
            restricted
            redirectTo={routes.contactsView}
          >
            <LoginView />
          </PublicRoute>

          <PrivateRoute
            path={routes.contactsView}
            redirectTo={routes.loginView}
          >
            <ContactsView />
          </PrivateRoute>
        </Switch>
      </Suspense>
    </>
  );
}
