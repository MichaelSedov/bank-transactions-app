import React from 'react';
import styles from './TransactionsList.module.css';
import { Transaction } from '../../types/transactions';
import TransactionRow from './TransactionRow';
import { useTransactions } from '../../hooks/useTransactions';

interface TransactionsListProps {
  transactions: Transaction[];
}

const TransactionsList: React.FC<TransactionsListProps> = ({ transactions }) => {
  const { removeTransaction } = useTransactions();

  const handleRemoveTransaction = (id: number) => {
    removeTransaction(id);
  };

  return (
    <div className={styles.transactionsList}>
      <h2>Transactions</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Beneficiary</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Account</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <TransactionRow
              key={transaction.id}
              transaction={transaction}
              onRemoveTransaction={handleRemoveTransaction}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsList;
