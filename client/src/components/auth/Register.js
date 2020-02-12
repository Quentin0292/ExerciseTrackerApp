import React, { useState, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';

const Register = () => {
  const authContext = useContext(AuthContext);

  const { register } = authContext;
  // déclare une nouvelle variable d'état que je vais appeler user
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = user;

  // remplace ici les valeurs du state user avec les valeurs entrées dans le formulaire
  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      console.log('Please enter all fields');
    } else if (password !== password2) {
      console.log('Password do not match');
    } else {
      register({
        name,
        email,
        password
      });
    }
  };

  return (
    <div className='form-container'>
      <h1 className='text-center p-4'>
        Account <span className='text-info'>Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            value={name}
            className='form-control'
            name='name'
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email Adress</label>
          <input
            type='text'
            value={email}
            className='form-control'
            name='email'
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            value={password}
            className='form-control'
            minLength='6'
            name='password'
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password2'>Confirm Password</label>
          <input
            type='password'
            value={password2}
            className='form-control'
            minLength='6'
            name='password2'
            onChange={onChange}
          />
        </div>
        <input
          type='submit'
          value='Register'
          className='btn btn-info btn-block'
        />
      </form>
    </div>
  );
};

export default Register;
