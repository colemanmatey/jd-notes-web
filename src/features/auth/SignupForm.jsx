/**
 * SignupForm Component - Handles user registration
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '../../components';
import { authService } from '../../services/auth.js';
import { isValidEmail } from '../../lib/utils.js';
import { ROUTES } from '../../constants/index.js';

const SignupForm = ({ onSuccess, className = '' }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      const { confirmPassword, ...registrationData } = formData;
      const response = await authService.register(registrationData);
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess(response);
      } else {
        // Default navigation
        navigate(ROUTES.DASHBOARD);
      }
    } catch (error) {
      setErrors({
        submit: error.message || 'Registration failed. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      {errors.submit && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {errors.submit}
        </div>
      )}
      
      <Input
        label="Full Name"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Enter your full name"
        error={errors.name}
        required
        autoComplete="name"
        disabled={isLoading}
      />
      
      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Enter your email"
        error={errors.email}
        required
        autoComplete="email"
        disabled={isLoading}
      />
      
      <Input
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        placeholder="Create a password"
        error={errors.password}
        required
        autoComplete="new-password"
        disabled={isLoading}
      />
      
      <Input
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleInputChange}
        placeholder="Confirm your password"
        error={errors.confirmPassword}
        required
        autoComplete="new-password"
        disabled={isLoading}
      />
      
      <Button
        type="submit"
        className="w-full"
        loading={isLoading}
        disabled={isLoading}
      >
        {isLoading ? 'Creating account...' : 'Create account'}
      </Button>
    </form>
  );
};

export default SignupForm;
