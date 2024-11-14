import React, { ComponentPropsWithoutRef } from 'react';
import styles from './Button.module.css';

export interface Props extends ComponentPropsWithoutRef<'button'> {
  label: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<Props> = ({
  label,
  type = 'button',
  ...otherProps
}) => {
  return <button type={type} {...otherProps} className={styles.btn}>{label}</button>
};

export default Button;