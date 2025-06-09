
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, UserPlus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Database } from '@/integrations/supabase/types';

type UserType = Database['public']['Enums']['user_type'];
type SecretariaRole = Database['public']['Enums']['secretaria_role'];

interface UserManagementProps {
  schools: any[];
  onUserCreated: () => void;
}

export const UserManagement: React.FC<UserManagementProps> = ({ schools, onUserCreated }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    user_type: 'secretaria' as UserType,
    secretaria_role: 'secretaria_operacional' as SecretariaRole,
    school_id: ''
  });

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Primeiro, criar o usuário no auth
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: newUser.email,
        password: newUser.password,
        email_confirm: true,
        user_metadata: {
          name: newUser.name,
          user_type: newUser.user_type,
          secretaria_role: newUser.user_type === 'secretaria' ? newUser.secretaria_role : null,
          school_id: newUser.school_id
        }
      });

      if (authError) throw authError;

      // Criar o perfil do usuário com tipos corretos
      const profileData = {
        id: authData.user.id,
        name: newUser.name,
        email: newUser.email,
        user_type: newUser.user_type,
        secretaria_role: newUser.user_type === 'secretaria' ? newUser.secretaria_role : null,
        school_id: newUser.school_id || null
      };

      const { error: profileError } = await supabase
        .from('profiles')
        .insert(profileData);

      if (profileError) throw profileError;

      // Reset form
      setNewUser({
        name: '',
        email: '',
        password: '',
        user_type: 'secretaria' as UserType,
        secretaria_role: 'secretaria_operacional' as SecretariaRole,
        school_id: ''
      });
      
      setIsDialogOpen(false);
      onUserCreated();
      
      toast({
        title: "Usuário criado!",
        description: `${newUser.name} foi adicionado com sucesso`,
      });
    } catch (error: any) {
      console.error('Error creating user:', error);
      toast({
        title: "Erro ao criar usuário",
        description: error.message || "Não foi possível criar o usuário",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getUserTypeLabel = (type: string) => {
    const labels = {
      secretaria: 'Secretaria',
      professor: 'Professor',
      aluno: 'Aluno',
      responsavel: 'Responsável'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getSecretariaRoleLabel = (role: string) => {
    const labels = {
      diretor: 'Diretor',
      secretario_educacao: 'Secretário de Educação',
      secretaria_operacional: 'Secretaria Operacional'
    };
    return labels[role as keyof typeof labels] || role;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Gerenciar Usuários
          </CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Novo Usuário
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Criar Novo Usuário</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateUser} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    placeholder="Nome do usuário"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    placeholder="usuario@email.com"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="user_type">Tipo de Usuário</Label>
                  <Select 
                    value={newUser.user_type} 
                    onValueChange={(value: UserType) => setNewUser({ ...newUser, user_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="secretaria">Secretaria</SelectItem>
                      <SelectItem value="professor">Professor</SelectItem>
                      <SelectItem value="aluno">Aluno</SelectItem>
                      <SelectItem value="responsavel">Responsável</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {newUser.user_type === 'secretaria' && (
                  <div className="space-y-2">
                    <Label htmlFor="secretaria_role">Função na Secretaria</Label>
                    <Select 
                      value={newUser.secretaria_role} 
                      onValueChange={(value: SecretariaRole) => setNewUser({ ...newUser, secretaria_role: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a função" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="diretor">Diretor</SelectItem>
                        <SelectItem value="secretario_educacao">Secretário de Educação</SelectItem>
                        <SelectItem value="secretaria_operacional">Secretaria Operacional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="school">Escola</Label>
                  <Select 
                    value={newUser.school_id} 
                    onValueChange={(value) => setNewUser({ ...newUser, school_id: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a escola" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Nenhuma escola (Master)</SelectItem>
                      {schools.map((school) => (
                        <SelectItem key={school.id} value={school.id}>
                          {school.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Criando..." : "Criar Usuário"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8 text-muted-foreground">
          <UserPlus className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Clique em "Novo Usuário" para começar a adicionar usuários ao sistema.</p>
          <p className="text-sm mt-2">Apenas usuários master podem criar novos usuários.</p>
        </div>
      </CardContent>
    </Card>
  );
};
