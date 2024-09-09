import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.css';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  label?: string;
  options: Option[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  required?: boolean;
  fieldName?: string; 
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  options,
  value,
  onChange,
  multiple = false,
  required = false,
  fieldName = 'options',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleChange = (selectedValue: string) => {
    if (multiple) {
      const newValue = Array.isArray(value) ? [...value] : [];
      const index = newValue.indexOf(selectedValue);
      if (index === -1) {
        newValue.push(selectedValue);
      } else {
        newValue.splice(index, 1);
      }
      onChange(newValue);
    } else {
      onChange(selectedValue);
      setIsOpen(false);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const getDisplayValue = () => {
    if (!isFocused && !value) {
      return label || `Select ${fieldName}`;
    }
    if (multiple && Array.isArray(value)) {
      const count = value.length;
      return count > 0 ? (
        <>
          <span className="selected-count">{count}</span>
          {`${count} ${fieldName}`}
        </>
      ) : `Select ${fieldName}`;
    } else {
      const selectedOption = options.find(option => option.value === value);
      return selectedOption ? selectedOption.label : `Select ${fieldName}`;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`${styles.customSelect} ${isOpen ? styles.open : ''} ${isFocused || value ? styles.focused : ''}`} ref={selectRef}>
      <div 
        className={styles.selectWrapper}
        onClick={() => {
          toggleDropdown();
          setIsFocused(true);
        }}
        onBlur={() => setIsFocused(false)}
        tabIndex={0}
      >
        <div className={styles.selectedValue}>
          {getDisplayValue()}
        </div>
        <div className={styles.arrow}></div>
        {isOpen && (
          <div className={styles.options}>
            {options.map((option) => (
              <div
                key={option.value}
                className={`${styles.option} ${Array.isArray(value) && value.includes(option.value) ? styles.selected : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleChange(option.value);
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
      {required && <span className={styles.required}>*</span>}
    </div>
  );
};

export default CustomSelect;