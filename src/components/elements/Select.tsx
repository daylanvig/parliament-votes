import React from 'react';

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
  return (
    <div className="select">
      <select value={selectedValue} onChange={e => onChange(e)}>
        <option></option>
        {
          items.map(item => {
            return <option key={item.value} value={item.value}>{item.label}</option>;
          })
        }
      </select>
    </div>
  );
}

export default Select;