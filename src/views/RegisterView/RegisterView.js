import { useState } from 'react';
import style from './RegisterView.module.css';
import { useDispatch } from 'react-redux';
import { authOperations } from '../../redux/auth';

export default function RegisterView() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = event => {
    const { name, value } = event.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'email':
        setEmail(value);
        break;

      case 'password':
        setPassword(value);
        break;

      default:
        console.log(null);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(authOperations.register({ name, email, password }));
    reset();
  };

  const reset = () => {
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className={style.container}>
      <h1 className={style.title}>Register Page</h1>
      <form className={style.containerForm} onSubmit={handleSubmit}>
        <div className={style.blockinput}>
          <i className={style.icon}></i>
          <input
            className={style.input}
            type="text"
            autoFocus
            placeholder="Name"
            autoComplete="off"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
            value={name}
            onChange={handleChange}
          />
        </div>
        <div className={style.blockinput}>
          <i className={style.icon}></i>
          <input
            className={style.input}
            type="email"
            placeholder="Email"
            autoComplete="off"
            name="email"
            title="Название электронной почты должно состоять из букв, цифр и должно содержать @"
            required
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className={style.blockinput}>
          <i className={style.icon}></i>
          <input
            className={style.input}
            type="password"
            placeholder="Password"
            autoComplete="off"
            name="password"
            title="Пароль должен быть не меньше 6 символов, состоять из букв нижнего регистра, букв верхнего регистра, цифр и не должен совпадать с именем или электронной почтой"
            required
            value={password}
            onChange={handleChange}
          />
        </div>
        <button className={style.button} type="submit">
          Register
        </button>
      </form>
    </div>
  );
}
