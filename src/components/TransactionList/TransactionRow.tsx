import React, { memo } from 'react';
import { Transaction } from '../../types/transactions';
import Button from '../../ui/Button/Button';

interface TransactionRowProps {
  transaction: Transaction;
  onRemoveTransaction: (id: number) => void;
}

const TransactionRow: React.FC<TransactionRowProps> = ({ transaction, onRemoveTransaction }) => {
  const { id, date, beneficiary, amount, description, account } = transaction;

  return (
    <tr>
      <td>{new Date(date).toLocaleDateString()}</td>
      <td>{beneficiary}</td>
      <td>{amount && amount.toFixed(2)}</td>
      <td>{description}</td>
      <td>{account}</td>
      <td>
        <Button onClick={() => onRemoveTransaction(id)} label="Remove" />
      </td>
    </tr>
  );
};

export default memo(TransactionRow);
