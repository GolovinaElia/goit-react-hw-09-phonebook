import { NavLink } from 'react-router-dom';
import routes from '../../routes';
import style from './Navigation.module.css';
import { authSelectors } from '../../redux/auth';
import { useSelector } from 'react-redux';

export default function Nav() {
  const isLoggedIn = useSelector(authSelectors.getIsAuthenticated);
  return (
    <nav className={style.itemLink}>
      <NavLink
        exact
        to={routes.homeView}
        className={style.NavLink}
        activeClassName={style.NavLinkActive}
      >
        Home
      </NavLink>
      {isLoggedIn && (
        <nav className={style.itemLink}>
          <NavLink
            to={routes.contactsView}
            className={style.NavLink}
            activeClassName={style.NavLinkActive}
          >
            Contacts
          </NavLink>
        </nav>
      )}
    </nav>
  );
}
