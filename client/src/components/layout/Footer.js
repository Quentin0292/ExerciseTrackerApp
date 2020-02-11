import React from 'react';

const Footer = () => {
  const date = new Date();
  return (
    <footer className='footer navbar navbar-light bg-dark fixed-bottom mt-auto py-3'>
      <div className='container nav-item'>
        <span className='text-muted nav-link'>
          {date.getFullYear()} by{' '}
          <a
            style={linkGithub}
            href='https://github.com/quentin0292'
            target='_blank'
            rel='noopener noreferer'
          >
            Quentin Lecocq
          </a>
        </span>
      </div>
    </footer>
  );
};

const linkGithub = {
  textDecoration: 'none',
  color: '#fff'
};

export default Footer;
