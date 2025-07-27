/**
 * API Health Check and Connection Status Component
 */

import { useHealthCheck } from '../../hooks/useHealthCheck.js';
import Icon from '../ui/Icon.jsx';

const APIStatus = ({ className = '' }) => {
  const { isOnline, isApiHealthy, apiStatus, lastChecked, checkHealth } = useHealthCheck();

  const getStatusIcon = () => {
    if (!isOnline) return 'x';
    if (isApiHealthy) return 'check';
    return 'warning';
  };

  const getStatusColor = () => {
    if (!isOnline) return 'text-red-500';
    if (isApiHealthy) return 'text-green-500';
    return 'text-yellow-500';
  };

  const getStatusText = () => {
    if (!isOnline) return 'Offline';
    if (isApiHealthy) return 'Connected';
    return 'Limited Connection';
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Icon 
        name={getStatusIcon()} 
        size={16} 
        className={getStatusColor()} 
      />
      <span className="text-sm text-gray-300">
        {getStatusText()}
      </span>
      
      {!isApiHealthy && isOnline && (
        <button
          onClick={checkHealth}
          className="text-xs text-blue-400 hover:text-blue-300 underline"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default APIStatus;
