import React, { memo } from 'react';

interface BalanceProps {
  total: number;
}

const Balance: React.FC<BalanceProps> = ({ total }) => {
  return (
    <div className="balance">
      <h2>Balance: ${total.toFixed(2)}</h2>
    </div>
  );
};

export default memo(Balance);