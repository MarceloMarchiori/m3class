
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, UserPlus } from 'lucide-react';
import { EnhancedUserCreationForm } from './EnhancedUserCreationForm';

interface SecretaryUserManagementProps {
  schools: any[];
  onUserCreated: () => void;
}

export const SecretaryUserManagement: React.FC<SecretaryUserManagementProps> = ({ schools, onUserCreated }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);

  if (showCreateForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Cadastrar Novo Usuário</h2>
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
            Cadastrar Usuários
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
          <p>Cadastre novos alunos, professores e funcionários da escola.</p>
          <p className="text-sm mt-2">Use o formulário para criar usuários e vincular às escolas apropriadas.</p>
        </div>
      </CardContent>
    </Card>
  );
};
