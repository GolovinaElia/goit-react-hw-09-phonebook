import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import style from './UserMenu.module.css';
import { authSelectors, authOperations } from '../../redux/auth';

export default function UserMenu() {
  const dispatch = useDispatch();
  const email = useSelector(authSelectors.getUseremail);

  const onLogout = useCallback(
    () => dispatch(authOperations.logOut()),
    [dispatch],
  );

  return (
    <div className={style.container}>
      <span>{email}</span>
      <button className={style.button} type="button" onClick={onLogout}>
        Log out
      </button>
    </div>
  );
}
