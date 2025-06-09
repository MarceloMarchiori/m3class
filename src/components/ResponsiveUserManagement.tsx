
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Users, GraduationCap, UserPlus, School } from 'lucide-react';
import { SubjectManagement } from './SubjectManagement';
import { ClassCreationWizard } from './ClassCreationWizard';
import { EnhancedUserCreationForm } from './EnhancedUserCreationForm';

interface ResponsiveUserManagementProps {
  schools: any[];
  onUserCreated: () => void;
}

export const ResponsiveUserManagement: React.FC<ResponsiveUserManagementProps> = ({ schools, onUserCreated }) => {
  const [activeView, setActiveView] = useState('overview');
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [showCreateClass, setShowCreateClass] = useState(false);

  const handleCreateClass = (classData: any) => {
    console.log('Nova turma criada:', classData);
    setShowCreateClass(false);
    setActiveView('overview');
  };

  if (showCreateUser) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl sm:text-2xl font-bold">Cadastrar Novo Usuário</h2>
          <Button 
            variant="outline" 
            onClick={() => setShowCreateUser(false)}
            className="w-full sm:w-auto"
          >
            Voltar
          </Button>
        </div>
        <EnhancedUserCreationForm 
          schools={schools}
          onUserCreated={() => {
            setShowCreateUser(false);
            onUserCreated();
          }}
          onCancel={() => setShowCreateUser(false)}
        />
      </div>
    );
  }

  if (showCreateClass) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl sm:text-2xl font-bold">Criar Nova Turma</h2>
          <Button 
            variant="outline" 
            onClick={() => setShowCreateClass(false)}
            className="w-full sm:w-auto"
          >
            Voltar
          </Button>
        </div>
        <ClassCreationWizard 
          onComplete={handleCreateClass}
          onCancel={() => setShowCreateClass(false)}
        />
      </div>
    );
  }

  if (activeView === 'subjects') {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl sm:text-2xl font-bold">Gestão de Matérias</h2>
          <Button 
            variant="outline" 
            onClick={() => setActiveView('overview')}
            className="w-full sm:w-auto"
          >
            Voltar
          </Button>
        </div>
        <SubjectManagement />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <School className="h-5 w-5" />
            Gestão Escolar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="quick-actions" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="quick-actions">Ações Rápidas</TabsTrigger>
              <TabsTrigger value="management">Gerenciamento</TabsTrigger>
            </TabsList>
            
            <TabsContent value="quick-actions" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button 
                  className="h-20 flex flex-col gap-2 text-left"
                  onClick={() => setShowCreateUser(true)}
                >
                  <UserPlus className="h-6 w-6" />
                  <div>
                    <div className="font-medium">Cadastrar Usuário</div>
                    <div className="text-xs opacity-80">Professores, alunos, funcionários</div>
                  </div>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-20 flex flex-col gap-2 text-left"
                  onClick={() => setShowCreateClass(true)}
                >
                  <Users className="h-6 w-6" />
                  <div>
                    <div className="font-medium">Criar Turma</div>
                    <div className="text-xs opacity-80">Nova turma com professor</div>
                  </div>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-20 flex flex-col gap-2 text-left"
                  onClick={() => setActiveView('subjects')}
                >
                  <GraduationCap className="h-6 w-6" />
                  <div>
                    <div className="font-medium">Gerenciar Matérias</div>
                    <div className="text-xs opacity-80">Disciplinas e conteúdos</div>
                  </div>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-20 flex flex-col gap-2 text-left"
                  disabled
                >
                  <Plus className="h-6 w-6" />
                  <div>
                    <div className="font-medium">Outras Ações</div>
                    <div className="text-xs opacity-80">Em breve...</div>
                  </div>
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="management" className="space-y-4">
              <div className="text-center py-8 text-muted-foreground">
                <School className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Funcionalidades de gerenciamento avançado em desenvolvimento.</p>
                <p className="text-sm mt-2">Use as "Ações Rápidas" para cadastros básicos.</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
