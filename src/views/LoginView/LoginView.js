// import React, { Component } from 'react';
import { useState } from 'react';
import style from './LoginView.module.css';
import { connect } from 'react-redux';
import { authOperations } from '../../redux/auth';

const LoginView = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = event => {
    const { name, value } = event.currentTarget;

    switch (name) {
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
    onLogin({ email, password });
    reset();
  };

  const reset = () => {
    setEmail('');
    setPassword('');
  };

  return (
    <div className={style.container}>
      <h1 className={style.title}>Login Page</h1>
      <form className={style.containerForm} onSubmit={handleSubmit}>
        <div className={style.blockinput}>
          <i className={style.icon}></i>
          <input
            className={style.input}
            type="email"
            autoFocus
            placeholder="Email"
            autoComplete="off"
            name="email"
            title="Название электронной почты должно состоять из букв, цифр и должно сожержать @"
            required
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className={style.blockinput}>
          <i className={style.icon}></i>
          <input
            className={style.input}
            placeholder="Password"
            type="password"
            autoComplete="off"
            name="password"
            title="Пароль должен быть не меньше 6 символов, состоять из букв нижнего регистра, букв верхнего регистра, цифр и не должен совпадать с именем и электронной почтой"
            required
            value={password}
            onChange={handleChange}
          />
        </div>
        <button className={style.button} type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

// class LoginView extends Component {
//   state = {
//     email: '',
//     password: '',
//   };

//   handleChange = event => {
//     const { name, value } = event.currentTarget;
//     this.setState({ [name]: value });
//   };

//   handleSubmit = event => {
//     event.preventDefault();
//     this.props.onLogin(this.state);
//     this.setState({ email: '', password: '' });
//     this.reset();
//   };

//   reset = () => {
//     this.setState({ email: '', password: '' });
//   };

//   render() {
//     const { email, password } = this.state;
//     return (
//       <div className={style.container}>
//         <h1 className={style.title}>Login Page</h1>
//         <form className={style.containerForm} onSubmit={this.handleSubmit}>
//           <div className={style.blockinput}>
//             <i className={style.icon}></i>
//             <input
//               className={style.input}
//               type="email"
//               autoFocus
//               placeholder="Email"
//               autoComplete="off"
//               name="email"
//               title="Название электронной почты должно состоять из букв, цифр и должно сожержать @"
//               required
//               value={email}
//               onChange={this.handleChange}
//             />
//           </div>
//           <div className={style.blockinput}>
//             <i className={style.icon}></i>
//             <input
//               className={style.input}
//               placeholder="Password"
//               type="password"
//               autoComplete="off"
//               name="password"
//               title="Пароль должен быть не меньше 6 символов, состоять из букв нижнего регистра, букв верхнего регистра, цифр и не должен совпадать с именем и электронной почтой"
//               required
//               value={password}
//               onChange={this.handleChange}
//             />
//           </div>
//           <button className={style.button} type="submit">
//             Login
//           </button>
//         </form>
//       </div>
//     );
//   }
// }
const mapDispatchToProps = {
  onLogin: authOperations.logIn,
};
export default connect(null, mapDispatchToProps)(LoginView);
