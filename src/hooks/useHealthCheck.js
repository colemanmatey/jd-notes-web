/**
 * Health Check Hook - Monitors API connectivity
 */

import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '../services/api.js';
import { API_ENDPOINTS } from '../constants/index.js';

export function useHealthCheck() {
  const [isOnline, setIsOnline] = useState(true);
  const [apiStatus, setApiStatus] = useState('unknown'); // 'healthy', 'unhealthy', 'unknown'
  const [lastChecked, setLastChecked] = useState(null);
  const [error, setError] = useState(null);

  const checkHealth = useCallback(async () => {
    try {
      setError(null);
      const response = await apiClient.get(API_ENDPOINTS.HEALTH);
      
      if (response && (response.status === 'ok' || response.message)) {
        setApiStatus('healthy');
      } else {
        setApiStatus('unhealthy');
      }
      
      setLastChecked(new Date().toISOString());
    } catch (err) {
      console.warn('Health check failed:', err);
      setApiStatus('unhealthy');
      setError(err.message);
      setLastChecked(new Date().toISOString());
    }
  }, []);

  // Check network connectivity
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial check
    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Periodic health checks
  useEffect(() => {
    // Initial health check
    checkHealth();

    // Set up periodic checks every 5 minutes
    const interval = setInterval(checkHealth, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [checkHealth]);

  const isApiHealthy = apiStatus === 'healthy';
  const shouldUseFallback = !isOnline || !isApiHealthy;

  return {
    isOnline,
    apiStatus,
    isApiHealthy,
    shouldUseFallback,
    lastChecked,
    error,
    checkHealth
  };
}
