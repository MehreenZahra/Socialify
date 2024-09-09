import React, { useState } from 'react';
import styles from './styles.module.css';

interface CustomInputProps {
  type: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: string;
  onIconClick?: () => void;
  rows?: number;
  iconClassName?: string; // New prop
}

const CustomInput: React.FC<CustomInputProps> = ({
  type,
  label,
  value,
  onChange,
  placeholder,
  icon,
  onIconClick,
  rows,
  iconClassName
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputProps = {
    type: type === 'password' ? (showPassword ? 'text' : 'password') : type,
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value),
    onFocus: handleFocus,
    onBlur: handleBlur,
    placeholder: ' ', // Empty space to ensure consistent height
  };

  const isTextarea = type === 'textarea';
  const isPassword = type === 'password';

  const EyeIcon = ({ open }: { open: boolean }) => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${styles.eyeIcon} ${showPassword ? styles.active : ''}`}
    >
      <path
        d="M10 4C5.45455 4 1.57273 6.90909 0 11C1.57273 15.0909 5.45455 18 10 18C14.5455 18 18.4273 15.0909 20 11C18.4273 6.90909 14.5455 4 10 4ZM10 15.4545C7.49091 15.4545 5.45455 13.4182 5.45455 11C5.45455 8.58182 7.49091 6.54545 10 6.54545C12.5091 6.54545 14.5455 8.58182 14.5455 11C14.5455 13.4182 12.5091 15.4545 10 15.4545Z"
        fill="currentColor"
      />
      <path
        d="M10 8.36364C8.49091 8.36364 7.27273 9.58182 7.27273 11C7.27273 12.4182 8.49091 13.6364 10 13.6364C11.5091 13.6364 12.7273 12.4182 12.7273 11C12.7273 9.58182 11.5091 8.36364 10 8.36364Z"
        fill="currentColor"
      />
      {!open && (
        <path
          d="M3 3L17 17"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      )}
    </svg>
  );

  return (
    <div className={`${styles.inputContainer} ${isTextarea ? styles.textareaContainer : ''} ${isFocused || value ? styles.focused : ''}`}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputWrapper}>
        {isTextarea ? (
          <textarea {...inputProps} rows={rows} />
        ) : (
          <input {...inputProps} />
        )}
        {isPassword && (
          <span className={`${styles.icon} ${styles.passwordIcon} ${iconClassName || ''}`} onClick={togglePasswordVisibility}>
            <EyeIcon open={showPassword} />
          </span>
        )}
        {!isPassword && icon && (
          <span className={styles.icon} onClick={onIconClick}>
            {icon}
          </span>
        )}
      </div>
    </div>
  );
};

export default CustomInput;