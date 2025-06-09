
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { UserPlus, School, Mail, User, Lock, MapPin, Phone } from 'lucide-react';

interface EnhancedUserCreationFormProps {
  schools: any[];
  onUserCreated: () => void;
  onCancel: () => void;
  restrictToSchoolAdmin?: boolean;
}

export const EnhancedUserCreationForm = ({ 
  schools, 
  onUserCreated, 
  onCancel,
  restrictToSchoolAdmin = false 
}: EnhancedUserCreationFormProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { profile } = useAuth();
  
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    user_type: restrictToSchoolAdmin ? 'school_admin' : 'professor',
    selectedSchools: [] as string[],
    phone: '',
    address: ''
  });

  // Determine available user types based on current user and restrictions
  const getAvailableUserTypes = () => {
    if (restrictToSchoolAdmin) {
      return [{ value: 'school_admin', label: 'Administrador da Escola' }];
    }

    if (profile?.user_type === 'master') {
      return [
        { value: 'school_admin', label: 'Administrador da Escola' },
        { value: 'professor', label: 'Professor' },
        { value: 'aluno', label: 'Aluno' },
        { value: 'responsavel', label: 'Responsável' },
        { value: 'secretaria', label: 'Secretaria' }
      ];
    }

    if (profile?.user_type === 'school_admin' || profile?.user_type === 'secretaria') {
      return [
        { value: 'professor', label: 'Professor' },
        { value: 'aluno', label: 'Aluno' },
        { value: 'responsavel', label: 'Responsável' },
        { value: 'secretaria', label: 'Secretaria' }
      ];
    }

    return [];
  };

  const availableUserTypes = getAvailableUserTypes();

  // Filter schools based on user permissions
  const getAvailableSchools = () => {
    if (profile?.user_type === 'master') {
      return schools;
    }
    
    // For school_admin and secretaria, only show their own schools
    return schools.filter(school => {
      // This would need to be implemented based on user_schools relationship
      return true; // For now, show all schools - this should be filtered based on user's schools
    });
  };

  const availableSchools = getAvailableSchools();

  const handleSchoolSelection = (schoolId: string, checked: boolean) => {
    setUserData(prev => ({
      ...prev,
      selectedSchools: checked 
        ? [...prev.selectedSchools, schoolId]
        : prev.selectedSchools.filter(id => id !== schoolId)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (userData.password !== userData.confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem",
        variant: "destructive",
      });
      return;
    }

    if (userData.password.length < 6) {
      toast({
        title: "Erro",
        description: "A senha deve ter pelo menos 6 caracteres",
        variant: "destructive",
      });
      return;
    }

    if (userData.selectedSchools.length === 0) {
      toast({
        title: "Erro",
        description: "Selecione pelo menos uma escola",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('create-user', {
        body: {
          email: userData.email,
          password: userData.password,
          name: userData.name,
          user_type: userData.user_type,
          school_ids: userData.selectedSchools,
          phone: userData.phone || null,
          address: userData.address || null,
          isSchoolAdmin: userData.user_type === 'school_admin'
        }
      });

      if (error) throw error;

      toast({
        title: "Usuário criado com sucesso!",
        description: `O usuário ${userData.name} foi criado`,
      });

      onUserCreated();
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

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5" />
          {restrictToSchoolAdmin ? 'Criar Administrador de Escola' : 'Criar Novo Usuário'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações Básicas */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User className="h-5 w-5" />
              Informações Pessoais
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo *</Label>
                <Input
                  id="name"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  placeholder="Nome completo"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    placeholder="email@exemplo.com"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    value={userData.phone}
                    onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                    placeholder="(11) 99999-9999"
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="address"
                    value={userData.address}
                    onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                    placeholder="Endereço completo"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Informações de Acesso */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Informações de Acesso
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Senha *</Label>
                <Input
                  id="password"
                  type="password"
                  value={userData.password}
                  onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                  placeholder="Mínimo 6 caracteres"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Senha *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={userData.confirmPassword}
                  onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })}
                  placeholder="Confirme a senha"
                  required
                />
              </div>
            </div>

            {!restrictToSchoolAdmin && (
              <div className="space-y-2">
                <Label htmlFor="user_type">Tipo de Usuário *</Label>
                <Select 
                  value={userData.user_type} 
                  onValueChange={(value) => setUserData({ ...userData, user_type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de usuário" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableUserTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Seleção de Escolas */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <School className="h-5 w-5" />
              Escolas
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-48 overflow-y-auto p-1">
              {availableSchools.map((school) => (
                <div key={school.id} className="flex items-center space-x-2 p-2 border rounded-lg hover:bg-muted/50">
                  <Checkbox
                    id={school.id}
                    checked={userData.selectedSchools.includes(school.id)}
                    onCheckedChange={(checked) => handleSchoolSelection(school.id, checked as boolean)}
                  />
                  <Label htmlFor={school.id} className="text-sm font-medium cursor-pointer flex-1">
                    {school.name}
                  </Label>
                </div>
              ))}
            </div>
            
            {availableSchools.length === 0 && (
              <p className="text-sm text-muted-foreground">Nenhuma escola disponível</p>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Criando..." : "Criar Usuário"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
