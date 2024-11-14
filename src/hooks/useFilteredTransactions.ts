import { useState, useMemo } from 'react';
import { Transaction } from '../types/transactions';

export const useFilteredTransactions = (transactions: Transaction[]) => {
  const [filterText, setFilterText] = useState('');

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) =>
      t.beneficiary.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [transactions, filterText]);

  return {
    filterText,
    setFilterText,
    filteredTransactions,
  };
};