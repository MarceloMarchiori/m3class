
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

    if (selectedSchools.length === 0) {
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
          school_ids: selectedSchools,
          isSchoolAdmin: userData.user_type === 'school_admin'
        }
      });

      if (error) throw error;

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
