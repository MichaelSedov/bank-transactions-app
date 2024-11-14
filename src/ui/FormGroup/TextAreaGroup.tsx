import React from 'react';
import styles from './FormGroup.module.css';

interface TextAreaGroupProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  inputClassName?: string;
}

const TextAreaGroup: React.FC<TextAreaGroupProps> = ({
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
      <textarea
        className={`${styles.input} ${inputClassName || ''}`}
        {...otherProps}
      />
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default TextAreaGroup;