import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building, Plus, Users, School, Crown, Edit, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { UserManagement } from './UserManagement';

export const MasterDashboard = () => {
  const [schools, setSchools] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  const [newSchool, setNewSchool] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip_code: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Buscar escolas
      const { data: schoolsData, error: schoolsError } = await supabase
        .from('schools')
        .select('*')
        .order('created_at', { ascending: false });

      if (schoolsError) throw schoolsError;

      // Buscar perfis
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*, schools(*)')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      setSchools(schoolsData || []);
      setProfiles(profilesData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar os dados",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSchool = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data, error } = await supabase
        .from('schools')
        .insert([newSchool])
        .select()
        .single();

      if (error) throw error;

      setSchools([data, ...schools]);
      setNewSchool({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip_code: ''
      });
      setIsDialogOpen(false);
      
      toast({
        title: "Escola criada!",
        description: "A escola foi criada com sucesso",
      });
    } catch (error) {
      console.error('Error creating school:', error);
      toast({
        title: "Erro ao criar escola",
        description: "Não foi possível criar a escola",
        variant: "destructive",
      });
    }
  };

  const getUserTypeLabel = (userType: string) => {
    const labels = {
      master: 'Master',
      school_admin: 'Admin Escola',
      professor: 'Professor',
      aluno: 'Aluno',
      responsavel: 'Responsável',
      secretaria: 'Secretaria'
    };
    return labels[userType as keyof typeof labels] || userType;
  };

  const getUserTypeBadgeVariant = (userType: string): "default" | "destructive" | "outline" | "secondary" => {
    const variants: Record<string, "default" | "destructive" | "outline" | "secondary"> = {
      master: 'default',
      school_admin: 'secondary',
      professor: 'outline',
      aluno: 'outline',
      responsavel: 'outline',
      secretaria: 'outline'
    };
    return variants[userType] || 'outline';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
              <Crown className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Painel Master
              </h1>
              <p className="text-muted-foreground">Gerencie escolas e usuários da plataforma</p>
            </div>
          </div>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Escolas</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{schools.length}</div>
              <p className="text-xs text-muted-foreground">Escolas cadastradas</p>
            </CardContent>
          </Card>

          <Card className="gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{profiles.length}</div>
              <p className="text-xs text-muted-foreground">Usuários registrados</p>
            </CardContent>
          </Card>

          <Card className="gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Escolas Ativas</CardTitle>
              <School className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {schools.filter((school: any) => school.is_active).length}
              </div>
              <p className="text-xs text-muted-foreground">Escolas em funcionamento</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs principais */}
        <Tabs defaultValue="schools" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="schools" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Escolas
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Usuários
            </TabsTrigger>
            <TabsTrigger value="manage-users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Criar Usuários
            </TabsTrigger>
          </TabsList>

          {/* Tab de Escolas */}
          <TabsContent value="schools">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Gerenciar Escolas</CardTitle>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Nova Escola
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Criar Nova Escola</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleCreateSchool} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nome da Escola</Label>
                          <Input
                            id="name"
                            value={newSchool.name}
                            onChange={(e) => setNewSchool({ ...newSchool, name: e.target.value })}
                            placeholder="Nome da escola"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={newSchool.email}
                            onChange={(e) => setNewSchool({ ...newSchool, email: e.target.value })}
                            placeholder="contato@escola.com"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Telefone</Label>
                          <Input
                            id="phone"
                            value={newSchool.phone}
                            onChange={(e) => setNewSchool({ ...newSchool, phone: e.target.value })}
                            placeholder="(11) 99999-9999"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">Endereço</Label>
                          <Input
                            id="address"
                            value={newSchool.address}
                            onChange={(e) => setNewSchool({ ...newSchool, address: e.target.value })}
                            placeholder="Rua, número"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city">Cidade</Label>
                            <Input
                              id="city"
                              value={newSchool.city}
                              onChange={(e) => setNewSchool({ ...newSchool, city: e.target.value })}
                              placeholder="Cidade"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state">Estado</Label>
                            <Input
                              id="state"
                              value={newSchool.state}
                              onChange={(e) => setNewSchool({ ...newSchool, state: e.target.value })}
                              placeholder="SP"
                            />
                          </div>
                        </div>
                        <Button type="submit" className="w-full">
                          Criar Escola
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {schools.map((school: any) => (
                    <div key={school.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Building className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{school.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {school.email || 'Sem email cadastrado'}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {school.city}, {school.state}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={school.is_active ? 'default' : 'secondary'}>
                          {school.is_active ? 'Ativa' : 'Inativa'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab de Usuários */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Usuários Cadastrados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profiles.map((profile: any) => (
                    <div key={profile.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Users className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{profile.name}</h3>
                          <p className="text-sm text-muted-foreground">{profile.email}</p>
                          {profile.schools && (
                            <p className="text-xs text-muted-foreground">
                              Escola: {profile.schools.name}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getUserTypeBadgeVariant(profile.user_type)}>
                          {getUserTypeLabel(profile.user_type)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab de Gerenciar Usuários */}
          <TabsContent value="manage-users">
            <UserManagement schools={schools} onUserCreated={fetchData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
