
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { X } from 'lucide-react';

interface EnhancedUserCreationFormProps {
  schools: any[];
  onUserCreated: () => void;
  onCancel: () => void;
}

export const EnhancedUserCreationForm = ({ schools, onUserCreated, onCancel }: EnhancedUserCreationFormProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    user_type: ''
  });

  const [selectedSchools, setSelectedSchools] = useState<string[]>([]);

  const userTypes = [
    { value: 'school_admin', label: 'Admin da Escola' },
    { value: 'professor', label: 'Professor' },
    { value: 'secretaria', label: 'Secretaria' },
    { value: 'aluno', label: 'Aluno' },
    { value: 'responsavel', label: 'Responsável' }
  ];

  const handleSchoolToggle = (schoolId: string) => {
    setSelectedSchools(prev => 
      prev.includes(schoolId) 
        ? prev.filter(id => id !== schoolId)
        : [...prev, schoolId]
    );
  };

  const removeSchool = (schoolId: string) => {
    setSelectedSchools(prev => prev.filter(id => id !== schoolId));
  };

  const getSchoolName = (schoolId: string) => {
    return schools.find(school => school.id === schoolId)?.name || 'Escola não encontrada';
  };

  const validateForm = () => {
    if (!userData.name.trim()) {
      toast({
        title: "Erro",
        description: "Nome é obrigatório",
        variant: "destructive",
      });
      return false;
    }

    if (!userData.email.trim()) {
      toast({
        title: "Erro",
        description: "Email é obrigatório",
        variant: "destructive",
      });
      return false;
    }

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      toast({
        title: "Erro",
        description: "Email inválido",
        variant: "destructive",
      });
      return false;
    }

    if (userData.password !== userData.confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem",
        variant: "destructive",
      });
      return false;
    }

    if (userData.password.length < 6) {
      toast({
        title: "Erro",
        description: "A senha deve ter pelo menos 6 caracteres",
        variant: "destructive",
      });
      return false;
    }

    if (!userData.user_type) {
      toast({
        title: "Erro",
        description: "Selecione o tipo de usuário",
        variant: "destructive",
      });
      return false;
    }

    if (selectedSchools.length === 0) {
      toast({
        title: "Erro",
        description: "Selecione pelo menos uma escola",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      console.log('Enviando dados para criação do usuário:', {
        email: userData.email,
        name: userData.name.trim(),
        user_type: userData.user_type,
        school_ids: selectedSchools
      });

      const { data, error } = await supabase.functions.invoke('create-user', {
        body: {
          email: userData.email.trim(),
          password: userData.password,
          name: userData.name.trim(),
          user_type: userData.user_type,
          school_ids: selectedSchools
        }
      });

      console.log('Resposta da função:', { data, error });

      if (error) {
        console.error('Erro na função:', error);
        throw error;
      }

      if (data?.error) {
        console.error('Erro retornado pela função:', data.error);
        throw new Error(data.error);
      }

      toast({
        title: "Usuário criado com sucesso!",
        description: `O usuário ${userData.name} foi criado e vinculado a ${selectedSchools.length} escola(s)`,
      });

      // Reset form
      setUserData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        user_type: ''
      });
      setSelectedSchools([]);
      
      onUserCreated();
    } catch (error: any) {
      console.error('Error creating user:', error);
      
      let errorMessage = "Não foi possível criar o usuário";
      
      if (error.message) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }

      toast({
        title: "Erro ao criar usuário",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Criar Novo Usuário</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dados básicos do usuário */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="user-name">Nome Completo *</Label>
                <Input
                  id="user-name"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  placeholder="Nome completo"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="user-email">Email *</Label>
                <Input
                  id="user-email"
                  type="email"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  placeholder="usuario@email.com"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="user-password">Senha *</Label>
                <Input
                  id="user-password"
                  type="password"
                  value={userData.password}
                  onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                  placeholder="Mínimo 6 caracteres"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="user-confirm-password">Confirmar Senha *</Label>
                <Input
                  id="user-confirm-password"
                  type="password"
                  value={userData.confirmPassword}
                  onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })}
                  placeholder="Confirme a senha"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="user-type">Tipo de Usuário *</Label>
              <Select 
                value={userData.user_type} 
                onValueChange={(value) => setUserData({ ...userData, user_type: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo de usuário" />
                </SelectTrigger>
                <SelectContent>
                  {userTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Seleção de escolas */}
          <div className="space-y-4">
            <Label>Escolas vinculadas *</Label>
            
            {/* Escolas selecionadas */}
            {selectedSchools.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedSchools.map((schoolId) => (
                  <Badge key={schoolId} variant="default" className="flex items-center gap-1">
                    {getSchoolName(schoolId)}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeSchool(schoolId)}
                    />
                  </Badge>
                ))}
              </div>
            )}

            {/* Lista de escolas disponíveis */}
            <div className="border rounded-lg p-4 max-h-48 overflow-y-auto">
              <div className="space-y-2">
                {schools.map((school) => (
                  <div key={school.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`school-${school.id}`}
                      checked={selectedSchools.includes(school.id)}
                      onCheckedChange={() => handleSchoolToggle(school.id)}
                    />
                    <Label 
                      htmlFor={`school-${school.id}`}
                      className="text-sm font-normal cursor-pointer flex-1"
                    >
                      {school.name}
                      {school.city && school.state && (
                        <span className="text-muted-foreground ml-2">
                          - {school.city}, {school.state}
                        </span>
                      )}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {selectedSchools.length === 0 && (
              <p className="text-sm text-muted-foreground">
                Selecione pelo menos uma escola para vincular o usuário
              </p>
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
