/**
 * Textarea Component - Multi-line text input with validation
 */

import { forwardRef } from 'react';

const Textarea = forwardRef(({
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  onFocus,
  error,
  disabled = false,
  required = false,
  rows = 4,
  className = '',
  textareaClassName = '',
  name,
  id,
  maxLength,
  showCharCount = false,
  ...props
}, ref) => {
  const textareaId = id || name || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  
  const baseTextareaClasses = 'w-full px-3 py-2 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed resize-vertical';
  
  const textareaStateClasses = error
    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500';
    
  const textareaClasses = [
    baseTextareaClasses,
    textareaStateClasses,
    textareaClassName
  ].filter(Boolean).join(' ');

  const characterCount = value ? value.length : 0;
  const isOverLimit = maxLength && characterCount > maxLength;

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={textareaId}
          className={`block text-sm font-medium mb-1 ${
            error ? 'text-red-700' : 'text-gray-700'
          }`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <textarea
        ref={ref}
        id={textareaId}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        rows={rows}
        maxLength={maxLength}
        className={textareaClasses}
        {...props}
      />
      
      {(showCharCount && maxLength) && (
        <div className="mt-1 text-sm text-right">
          <span className={isOverLimit ? 'text-red-600' : 'text-gray-500'}>
            {characterCount}/{maxLength}
          </span>
        </div>
      )}
      
      {error && (
        <p className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
