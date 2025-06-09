
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface SchoolCreationFormProps {
  onSchoolCreated: () => void;
  onCancel: () => void;
}

export const SchoolCreationForm = ({ onSchoolCreated, onCancel }: SchoolCreationFormProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const [schoolData, setSchoolData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip_code: ''
  });

  const [adminData, setAdminData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (adminData.password !== adminData.confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem",
        variant: "destructive",
      });
      return;
    }

    if (adminData.password.length < 6) {
      toast({
        title: "Erro",
        description: "A senha deve ter pelo menos 6 caracteres",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // 1. Criar a escola primeiro
      const { data: school, error: schoolError } = await supabase
        .from('schools')
        .insert([schoolData])
        .select()
        .single();

      if (schoolError) throw schoolError;

      // 2. Criar o usuário admin da escola usando a Edge Function
      const { data: createUserResult, error: createUserError } = await supabase.functions.invoke('create-user', {
        body: {
          email: adminData.email,
          password: adminData.password,
          name: adminData.name,
          user_type: 'school_admin',
          school_ids: [school.id],
          isSchoolAdmin: true
        }
      });

      if (createUserError) {
        // Se falhar na criação do usuário, deletar a escola criada
        await supabase.from('schools').delete().eq('id', school.id);
        throw createUserError;
      }

      toast({
        title: "Escola criada com sucesso!",
        description: `A escola "${school.name}" e o usuário admin foram criados`,
      });

      onSchoolCreated();
    } catch (error: any) {
      console.error('Error creating school:', error);
      toast({
        title: "Erro ao criar escola",
        description: error.message || "Não foi possível criar a escola",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Criar Nova Escola</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dados da Escola */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Informações da Escola</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="school-name">Nome da Escola *</Label>
                <Input
                  id="school-name"
                  value={schoolData.name}
                  onChange={(e) => setSchoolData({ ...schoolData, name: e.target.value })}
                  placeholder="Nome da escola"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="school-email">Email da Escola</Label>
                <Input
                  id="school-email"
                  type="email"
                  value={schoolData.email}
                  onChange={(e) => setSchoolData({ ...schoolData, email: e.target.value })}
                  placeholder="contato@escola.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="school-phone">Telefone</Label>
                <Input
                  id="school-phone"
                  value={schoolData.phone}
                  onChange={(e) => setSchoolData({ ...schoolData, phone: e.target.value })}
                  placeholder="(11) 99999-9999"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="school-address">Endereço</Label>
                <Input
                  id="school-address"
                  value={schoolData.address}
                  onChange={(e) => setSchoolData({ ...schoolData, address: e.target.value })}
                  placeholder="Rua, número"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="school-city">Cidade</Label>
                <Input
                  id="school-city"
                  value={schoolData.city}
                  onChange={(e) => setSchoolData({ ...schoolData, city: e.target.value })}
                  placeholder="Cidade"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="school-state">Estado</Label>
                <Input
                  id="school-state"
                  value={schoolData.state}
                  onChange={(e) => setSchoolData({ ...schoolData, state: e.target.value })}
                  placeholder="SP"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="school-zip">CEP</Label>
                <Input
                  id="school-zip"
                  value={schoolData.zip_code}
                  onChange={(e) => setSchoolData({ ...schoolData, zip_code: e.target.value })}
                  placeholder="00000-000"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Dados do Admin */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Administrador da Escola</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="admin-name">Nome do Admin *</Label>
                <Input
                  id="admin-name"
                  value={adminData.name}
                  onChange={(e) => setAdminData({ ...adminData, name: e.target.value })}
                  placeholder="Nome completo"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="admin-email">Email do Admin *</Label>
                <Input
                  id="admin-email"
                  type="email"
                  value={adminData.email}
                  onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
                  placeholder="admin@escola.com"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="admin-password">Senha *</Label>
                <Input
                  id="admin-password"
                  type="password"
                  value={adminData.password}
                  onChange={(e) => setAdminData({ ...adminData, password: e.target.value })}
                  placeholder="Mínimo 6 caracteres"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="admin-confirm-password">Confirmar Senha *</Label>
                <Input
                  id="admin-confirm-password"
                  type="password"
                  value={adminData.confirmPassword}
                  onChange={(e) => setAdminData({ ...adminData, confirmPassword: e.target.value })}
                  placeholder="Confirme a senha"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Criando..." : "Criar Escola"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
