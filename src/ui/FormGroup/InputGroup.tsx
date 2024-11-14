import React from 'react';
import styles from './FormGroup.module.css';

interface InputGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  inputClassName?: string;
}

const InputGroup: React.FC<InputGroupProps> = ({
  label,
  error,
  inputClassName,
  ...otherProps
}) => {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={otherProps.name} className={styles.label}>
        {label}
      </label>
      <input
        className={`${styles.input} ${inputClassName || ''}`}
        {...otherProps}
      />
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default InputGroup;
