import React, { useState } from 'react';
import styles from './CustomInput.module.css';

interface CustomInputProps {
  type: 'text' | 'email' | 'password' | 'date' | 'select' | 'textarea';
  label: string;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  options?: string[];
  multiple?: boolean;
  multiline?: boolean;
  rows?: number;
  placeholder?: string;
  showPasswordToggle?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  type,
  label,
  value,
  onChange,
  options,
  multiple,
  multiline,
  rows = 3,
  placeholder
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (type === 'select' && multiple) {
      const selectedOptions = Array.from((e.target as HTMLSelectElement).selectedOptions, option => option.value);
      onChange(selectedOptions);
    } else {
      onChange(e.target.value);
    }
  };

  const renderInput = () => {
    switch (type) {
      case 'select':
        return (
          <select
            value={multiple ? (value as string[]) : (value as string)}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            multiple={multiple}
          >
            {!multiple && <option value="">{placeholder || `Select ${label}`}</option>}
            {options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case 'date':
        return (
          <input
            type="date"
            value={value as string}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
          />
        );
      case 'textarea':
        return (
          <textarea
            value={value as string}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            rows={rows}
            placeholder={placeholder}
          />
        );
      default:
        return (
          <input
            type={type}
            value={value as string}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
          />
        );
    }
  };

  return (
    <div className={`${styles.customInput} ${isFocused ? styles.focused : ''} ${multiline ? styles.multiline : ''}`}>
      <label>{label}</label>
      {renderInput()}
      {type === 'select' && multiple && Array.isArray(value) && (
        <div className={styles.selectedCount}>{`${value.length} selected`}</div>
      )}
    </div>
  );
};

export default CustomInput;