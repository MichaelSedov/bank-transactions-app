import { useState, useEffect, useCallback } from 'react';
import { Transaction } from '../types/transactions';
import { request } from '../utils/request';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Load transactions on component mount
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await request<Transaction[]>({ url: '/transactions' });
        setTransactions(data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  // Add a new transaction
  const addTransaction = useCallback(
    async (transaction: Transaction) => {
      try {
        const newTransaction = await request<Transaction>({
          url: '/transactions',
          method: 'POST',
          body: transaction,
        });
        setTransactions((prevTransactions) => [newTransaction, ...prevTransactions]);
      } catch (error) {
        console.error('Error adding transaction:', error);
      }
    },
    [],
  );


  // Remove a transaction
  const removeTransaction = useCallback(
    async (id: number) => {
      try {
        await request<void>({
          url: `/transactions/${id}`,
          method: 'DELETE',
        });
        setTransactions((prevTransactions) => prevTransactions.filter((t) => t.id !== id));
      } catch (error) {
        console.error('Error deleting transaction:', error);
      }
    },
    [],
  );

  return {
    transactions,
    addTransaction,
    removeTransaction,
  };
};