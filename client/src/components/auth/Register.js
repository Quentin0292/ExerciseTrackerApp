import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Register = () => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;
  const { register, error, clearErrors } = authContext;

  useEffect(() => {
    if (error === 'User already exists') {
      setAlert(error, 'danger');
      clearErrors();
    }
  }, [error, setAlert, clearErrors]);

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
    // premier check pour verifier que tous les champs sont remplis
    if (name === '' || email === '' || password === '') {
      // console.log('Please enter all fields');
      setAlert('Please enter all fileds', 'danger');
    } // deuxième check pour verifier que les deux mots de passes sont identiques
    else if (password !== password2) {
      setAlert('Password do not match', 'danger');
    } // si les deux checks sont ok, on fais appelle à la fonction register() qui va enregistrer l'utilisateur dans la base de données via l'API
    else {
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
