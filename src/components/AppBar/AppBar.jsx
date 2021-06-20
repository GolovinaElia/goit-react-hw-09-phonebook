import { useSelector } from 'react-redux';
import Nav from '../Navigation/Nav';
import AuthNav from '../Navigation/AuthNav';
import UserMenu from '../UserMenu/UserMenu';
import { authSelectors } from '../../redux/auth';
import style from './AppBar.module.css';

export default function AppBar() {
  const isLoggedIn = useSelector(authSelectors.getIsAuthenticated);
  return (
    <header className={style.AppBar}>
      <Nav />
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </header>
  );
}
