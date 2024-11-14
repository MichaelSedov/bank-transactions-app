import React, { useState } from 'react';
import InputGroup from '../../ui/FormGroup/InputGroup';

interface FilterProps {
  onFilterChange: (beneficiary: string) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputValue(value);
    onFilterChange(value);
  };

  return (
    <div className="filter">
      <InputGroup label="Beneficiary Name" name="beneficiary" value={inputValue} onChange={handleChange} />
    </div>
  );
};

export default Filter;