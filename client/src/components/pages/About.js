import React from 'react';

const About = () => {
  return (
    <div>
      <h1 className='text-center p-4'>About This App</h1>
      <p className='my-1'>
        This is a full stack React App for keeping Exercise Log
      </p>
      <p className='bg-dark p-1'>
        <strong style={{ color: 'white' }}>Version: 1.0.0</strong>
      </p>
    </div>
  );
};

export default About;
