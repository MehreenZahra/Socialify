import React, { useState } from 'react';
import styles from './CustomInput.module.css';

interface CustomInputProps {
  type: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: string;
  onIconClick?: () => void;
  rows?: number;
}

const CustomInput: React.FC<CustomInputProps> = ({
  type,
  label,
  value,
  onChange,
  placeholder,
  icon,
  onIconClick,
  rows
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const inputProps = {
    type,
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value),
    onFocus: handleFocus,
    onBlur: handleBlur,
    placeholder: ' ', // Empty space to ensure consistent height
  };

  const isTextarea = type === 'textarea';

  return (
    <div className={`${styles.inputContainer} ${isTextarea ? styles.textareaContainer : ''} ${isFocused || value ? styles.focused : ''}`}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputWrapper}>
        {isTextarea ? (
          <textarea {...inputProps} rows={rows} />
        ) : (
          <input {...inputProps} />
        )}
        {icon && (
          <span className={styles.icon} onClick={onIconClick}>
            {icon}
          </span>
        )}
      </div>
    </div>
  );
};

export default CustomInput;