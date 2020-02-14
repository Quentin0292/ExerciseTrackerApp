import React, { useContext, useEffect } from 'react';
import ExerciseList from '../exercises/ExercisesList';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <ExerciseList />
    </div>
  );
};

export default Home;
