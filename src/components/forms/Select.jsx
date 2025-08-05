/**
 * Select Component - Dropdown select with validation
 */

import { forwardRef } from 'react';

const Select = forwardRef(({
  label,
  value,
  onChange,
  onBlur,
  onFocus,
  options = [],
  placeholder = 'Select an option...',
  error,
  disabled = false,
  required = false,
  className = '',
  selectClassName = '',
  name,
  id,
  ...props
}, ref) => {
  const selectId = id || name || `select-${Math.random().toString(36).substr(2, 9)}`;
  
  const baseSelectClasses = 'w-full px-3 py-2 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed bg-white';
  
  const selectStateClasses = error
    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500';
    
  const selectClasses = [
    baseSelectClasses,
    selectStateClasses,
    selectClassName
  ].filter(Boolean).join(' ');

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={selectId}
          className={`block text-sm font-medium mb-1 ${
            error ? 'text-red-700' : 'text-gray-700'
          }`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <select
        ref={ref}
        id={selectId}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        disabled={disabled}
        required={required}
        className={selectClasses}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        
        {options.map((option) => {
          // Handle both string options and object options
          const optionValue = typeof option === 'string' ? option : option.value;
          const optionLabel = typeof option === 'string' ? option : option.label;
          const optionDisabled = typeof option === 'object' ? option.disabled : false;
          
          return (
            <option
              key={optionValue}
              value={optionValue}
              disabled={optionDisabled}
            >
              {optionLabel}
            </option>
          );
        })}
      </select>
      
      {error && (
        <p className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
