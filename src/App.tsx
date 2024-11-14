import React, { useMemo } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Balance from './components/Balance/Balance';
import NewTransactionForm from './components/NewTransactionForm/NewTransactionForm';
import TransactionsList from './components/TransactionList/TransactionList';
import Footer from './components/Footer/Footer';
import Filter from './components/Filter/Filter';
import { useTransactions } from './hooks/useTransactions';
import { useFilteredTransactions } from './hooks/useFilteredTransactions';

const App: React.FC = () => {
  const { transactions } = useTransactions();
  const { setFilterText, filteredTransactions } = useFilteredTransactions(transactions);

  const totalBalance = useMemo(() => {
    return filteredTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);
  }, [filteredTransactions]);

  return (
    <div className="app">
      <Navbar />
      <div className="content">
        <div className="main row">
          <div className="main__balance column">
            <Balance total={totalBalance} />
            <Filter onFilterChange={setFilterText} />
          </div>
          <div className="main__form column">
            <NewTransactionForm />
          </div>
        </div>
        <div className="row">
          <TransactionsList transactions={filteredTransactions} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
