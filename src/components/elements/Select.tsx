import React, { ChangeEvent, useState } from 'react';
// FUTURE: Required, colours, etcc
type SelectProps = {
  onChange(e: React.ChangeEvent<HTMLSelectElement>): any;
  items: SelectItem[];
  selectedValue?: string;
};

type SelectItem = {
  label: string;
  value: string;
};

/**
 * HTML Select Eelement
 * @returns 
 */
function Select({ onChange, items, selectedValue }: SelectProps): JSX.Element {
  const [currentValue, setCurrentValue] = useState(selectedValue);

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    setCurrentValue(e.target.value);
    onChange(e);
  }

  return (
    <div className='control'>
      <div className='select'>
        <select value={currentValue} onChange={handleChange}>
          <option></option>
          {
            items.map(item => {
              return <option key={item.value} value={item.value}>{item.label}</option>;
            })
          }
        </select>
      </div>
    </div>
  );
}

export default Select;