import { useState, useEffect } from 'react';
import style from './ContactForm.module.css';
import Loader from '../Loader/Loader';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { contactsOperations, contactsSelectors } from '../../redux/contacts';

export default function ContactForm() {
  const dispatch = useDispatch();
  const contactsAll = useSelector(contactsSelectors.contactsAll);
  const isLoadingContacts = useSelector(contactsSelectors.isLoadingContacts);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    dispatch(contactsOperations.fetchContacts());
  }, [dispatch]);

  const handleChange = event => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        console.log(null);
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  const handleSubmit = event => {
    event.preventDefault();
    const contact = { id: uuidv4(), name: name, number: number };
    const inputName = contactsAll.find(
      contact => contact.name.toLowerCase() === name.toLowerCase(),
    );
    if (inputName) {
      alert(`${name} is already in contacts`);
    } else {
      dispatch(contactsOperations.addContacts(contact));
    }
    reset();
  };

  return (
    <div className={style.container}>
      <form className={style.containerForm} onSubmit={handleSubmit}>
        <label className={style.containerLabel}>
          Name
          <input
            className={style.input}
            type="text"
            autoComplete="off"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
            value={name}
            onChange={handleChange}
          />
        </label>
        <label className={style.containerLabel}>
          Number
          <input
            className={style.input}
            type="tel"
            autoComplete="off"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
            value={number}
            onChange={handleChange}
          />
        </label>
        {isLoadingContacts && <Loader />}
        <button className={style.button} type="submit">
          Add contact
        </button>
      </form>
    </div>
  );
}
