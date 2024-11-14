import React, { useState, memo } from 'react';
import styles from './NewTransactionForm.module.css';
import { Transaction } from '../../types/transactions';
import Button from '../../ui/Button/Button';
import InputGroup from '../../ui/FormGroup/InputGroup';
import TextAreaGroup from '../../ui/FormGroup/TextAreaGroup';
import { useTransactions } from '../../hooks/useTransactions';

const NewTransactionForm: React.FC = () => {
  const { addTransaction } = useTransactions();

  const [formData, setFormData] = useState({
    amount: '',
    account: '',
    beneficiary: '',
    date: '',
    description: '',
  });

  const [errors, setErrors] = useState({
    amount: '',
    account: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validate = () => {
    let valid = true;
    let newErrors = { amount: '', account: '' };

    const amountValue = parseFloat(formData.amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      newErrors.amount = 'Amount must be a positive number.';
      valid = false;
    }

    if (!formData.account.trim()) {
      newErrors.account = 'Account number is required.';
      valid = false;
    } else if (!/^\d+$/.test(formData.account)) {
      newErrors.account = 'Account number must contain only numbers.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const newTransaction: Transaction = {
      id: Date.now(),
      amount: parseFloat(formData.amount),
      account: formData.account,
      beneficiary: formData.beneficiary,
      date: formData.date || new Date().toISOString(),
      description: formData.description,
      address: '',
    };
    addTransaction(newTransaction);
    setFormData({
      amount: '',
      account: '',
      beneficiary: '',
      date: '',
      description: '',
    });
  };

  return (
    <>
      <h3>Add New Transaction</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <InputGroup
          label="Amount:"
          name="amount"
          type="number"
          value={formData.amount}
          onChange={handleChange}
          required={true}
          min={0}
          error={errors.amount}
        />
        <InputGroup
          label="Account Number:"
          name="account"
          type="text"
          value={formData.account}
          onChange={handleChange}
          required={true}
          error={errors.account}
        />
        <InputGroup
          label="Beneficiary:"
          name="beneficiary"
          type="text"
          value={formData.beneficiary}
          onChange={handleChange}
        />
        <InputGroup
          label="Date:"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
        />
        <TextAreaGroup
          label="Description:"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <div className={styles.actions}>
          <Button onClick={handleSubmit} type="submit" label="Add Transaction" />
        </div>
      </form>
    </>
  );
};

export default memo(NewTransactionForm);
