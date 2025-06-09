
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, UserPlus } from 'lucide-react';
import { EnhancedUserCreationForm } from './EnhancedUserCreationForm';

interface UserManagementProps {
  schools: any[];
  onUserCreated: () => void;
}

export const UserManagement: React.FC<UserManagementProps> = ({ schools, onUserCreated }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);

  if (showCreateForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Criar Novo Usuário</h2>
          <Button 
            variant="outline" 
            onClick={() => setShowCreateForm(false)}
          >
            Voltar
          </Button>
        </div>
        <EnhancedUserCreationForm 
          schools={schools}
          onUserCreated={() => {
            setShowCreateForm(false);
            onUserCreated();
          }}
          onCancel={() => setShowCreateForm(false)}
        />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Gerenciar Usuários
          </CardTitle>
          <Button 
            className="flex items-center gap-2"
            onClick={() => setShowCreateForm(true)}
          >
            <Plus className="h-4 w-4" />
            Novo Usuário
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8 text-muted-foreground">
          <UserPlus className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Clique em "Novo Usuário" para começar a adicionar usuários ao sistema.</p>
          <p className="text-sm mt-2">Use o formulário completo para criar usuários e vincular a múltiplas escolas.</p>
        </div>
      </CardContent>
    </Card>
  );
};
