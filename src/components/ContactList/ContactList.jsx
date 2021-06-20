import style from './ContactList.module.css';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { contactsOperations, contactsSelectors } from '../../redux/contacts';

export default function ContactsList() {
  const dispatch = useDispatch();
  const contacts = useSelector(contactsSelectors.getVisibleContact);

  const onDeleteContact = useCallback(
    id => dispatch(contactsOperations.deleteContact(id)),
    [dispatch],
  );

  return (
    <div className={style.contacts}>
      <ul className={style.contactsList}>
        {contacts.map(({ id, name, number }) => (
          <li key={uuidv4()} className={style.contactsItem}>
            <p className={style.contactsForm}>
              <span className={style.contactsName}>{name}</span>: {number}
              <button
                className={style.button}
                type="button"
                onClick={() => onDeleteContact(id)}
              >
                Delete
              </button>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
