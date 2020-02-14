import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';

const Login = props => {
  const authContext = useContext(AuthContext);

  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error === 'Invalid Credrentials') {
      console.log('invalid credentials');
    }
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (email === '' || password === '') {
      console.log('Please fill in all fields');
    } else {
      login({ email, password });
    }
  };

  return (
    <div className='form-container'>
      <h1 className='text-center p-4'>
        Account <span className='text-info'>Log in</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email Adress</label>
          <input
            className='form-control'
            name='email'
            onChange={onChange}
            value={email}
            type='text'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            className='form-control'
            name='password'
            onChange={onChange}
            type='password'
          />
        </div>
        <input
          type='submit'
          className='btn btn-info btn-block'
          value='Log in'
        />
      </form>
    </div>
  );
};

export default Login;
