import style from './Filter.module.css';
import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeFilter, contactsSelectors } from '../../redux/contacts';

export default function Filter() {
  const dispatch = useDispatch();
  const value = useSelector(contactsSelectors.getFilter);

  const onChange = useCallback(
    event => dispatch(changeFilter(event.target.value)),
    [dispatch],
  );

  return (
    <div className={style.filter}>
      <label className={style.filterLabel}>
        Find contact by name
        <input
          className={style.filterInput}
          type="text"
          autoComplete="off"
          name="name"
          value={value}
          onChange={onChange}
        />
      </label>
    </div>
  );
}
