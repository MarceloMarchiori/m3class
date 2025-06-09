
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { User, Save, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UserEditFormProps {
  user: any;
  schools: any[];
  onUserUpdated: () => void;
  onCancel: () => void;
}

export const UserEditForm: React.FC<UserEditFormProps> = ({
  user,
  schools,
  onUserUpdated,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    user_type: user.user_type || 'school_admin',
    secretaria_role: user.secretaria_role || ''
  });
  const [selectedSchools, setSelectedSchools] = useState<string[]>(
    user.user_schools?.map((us: any) => us.school_id) || []
  );
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Atualizar perfil do usuário
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          name: formData.name,
          email: formData.email,
          user_type: formData.user_type,
          secretaria_role: formData.user_type === 'secretaria' ? formData.secretaria_role : null
        })
        .eq('id', user.id);

      if (profileError) throw profileError;

      // Atualizar relacionamentos escola-usuário
      // Primeiro remover todos os relacionamentos existentes
      const { error: deleteError } = await supabase
        .from('user_schools')
        .delete()
        .eq('user_id', user.id);

      if (deleteError) throw deleteError;

      // Inserir novos relacionamentos
      if (selectedSchools.length > 0) {
        const userSchoolsData = selectedSchools.map(schoolId => ({
          user_id: user.id,
          school_id: schoolId
        }));

        const { error: insertError } = await supabase
          .from('user_schools')
          .insert(userSchoolsData);

        if (insertError) throw insertError;
      }

      toast({
        title: "Usuário atualizado com sucesso!",
        description: "As informações do usuário foram atualizadas.",
      });

      onUserUpdated();
    } catch (error: any) {
      console.error('Error updating user:', error);
      toast({
        title: "Erro ao atualizar usuário",
        description: error.message || "Não foi possível atualizar o usuário",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSchoolToggle = (schoolId: string, checked: boolean) => {
    if (checked) {
      setSelectedSchools([...selectedSchools, schoolId]);
    } else {
      setSelectedSchools(selectedSchools.filter(id => id !== schoolId));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Editar Usuário: {user.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nome Completo *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="user_type">Tipo de Usuário *</Label>
              <Select value={formData.user_type} onValueChange={(value) => setFormData({ ...formData, user_type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="school_admin">Admin da Escola</SelectItem>
                  <SelectItem value="professor">Professor</SelectItem>
                  <SelectItem value="aluno">Aluno</SelectItem>
                  <SelectItem value="responsavel">Responsável</SelectItem>
                  <SelectItem value="secretaria">Secretaria</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {formData.user_type === 'secretaria' && (
              <div>
                <Label htmlFor="secretaria_role">Cargo na Secretaria</Label>
                <Select value={formData.secretaria_role} onValueChange={(value) => setFormData({ ...formData, secretaria_role: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o cargo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="diretor">Diretor</SelectItem>
                    <SelectItem value="secretario_educacao">Secretário de Educação</SelectItem>
                    <SelectItem value="secretaria_operacional">Secretária Operacional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div>
            <Label>Escolas Vinculadas</Label>
            <div className="mt-2 space-y-2 max-h-40 overflow-y-auto border rounded-md p-3">
              {schools.map((school) => (
                <div key={school.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={school.id}
                    checked={selectedSchools.includes(school.id)}
                    onCheckedChange={(checked) => handleSchoolToggle(school.id, !!checked)}
                  />
                  <Label htmlFor={school.id} className="text-sm font-normal">
                    {school.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              <Save className="h-4 w-4 mr-2" />
              {loading ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
