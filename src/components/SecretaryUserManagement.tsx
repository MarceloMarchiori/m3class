
import React from 'react';
import { ResponsiveUserManagement } from './ResponsiveUserManagement';

interface SecretaryUserManagementProps {
  schools: any[];
  onUserCreated: () => void;
}

export const SecretaryUserManagement: React.FC<SecretaryUserManagementProps> = ({ schools, onUserCreated }) => {
  return <ResponsiveUserManagement schools={schools} onUserCreated={onUserCreated} />;
};
