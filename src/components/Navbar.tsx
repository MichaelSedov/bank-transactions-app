import React from 'react';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <h1>Bank Transactions App</h1>
    </nav>
  );
};

export default Navbar;
