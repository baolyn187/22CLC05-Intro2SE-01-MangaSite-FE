import React from 'react';
import styles from './Button.module.css'; // Import CSS Module

const Button = ({ label, onClick, disabled = false }) => {
  return (
    <button
      className={`${styles.button} ${disabled ? styles.disabled : ''}`} // Dynamically apply styles
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
