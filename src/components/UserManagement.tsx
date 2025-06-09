
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ResponsiveUserManagement } from './ResponsiveUserManagement';

interface UserManagementProps {
  schools: any[];
  onUserCreated: () => void;
}

export const UserManagement: React.FC<UserManagementProps> = ({ schools, onUserCreated }) => {
  const { profile } = useAuth();

  // Verificar se o usuário tem permissão para criar usuários
  const canCreateUsers = profile?.user_type === 'master' || 
                         profile?.user_type === 'school_admin' || 
                         profile?.user_type === 'secretaria';

  if (!canCreateUsers) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md mx-auto px-6">
          <div className="p-4 bg-muted/50 rounded-full w-fit mx-auto">
            <svg className="h-12 w-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Acesso Restrito</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Você não tem permissão para acessar o gerenciamento de usuários.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Apenas administradores, diretores e secretarias podem criar usuários.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <ResponsiveUserManagement schools={schools} onUserCreated={onUserCreated} />;
};
