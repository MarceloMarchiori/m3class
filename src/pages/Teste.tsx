
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Users, Building, Crown } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Teste = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState([]);
  const [schools, setSchools] = useState([]);
  const [userSchools, setUserSchools] = useState([]);

  useEffect(() => {
    fetchTestData();
  }, []);

  const fetchTestData = async () => {
    try {
      setLoading(true);

      // Buscar todos os perfis
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Buscar todas as escolas
      const { data: schoolsData, error: schoolsError } = await supabase
        .from('schools')
        .select('*')
        .order('created_at', { ascending: false });

      if (schoolsError) throw schoolsError;

      // Buscar relacionamentos usuário-escola
      const { data: userSchoolsData, error: userSchoolsError } = await supabase
        .from('user_schools')
        .select(`
          *,
          profiles!inner(name, email, user_type),
          schools!inner(name, city, state)
        `)
        .order('created_at', { ascending: false });

      if (userSchoolsError) throw userSchoolsError;

      setProfiles(profilesData || []);
      setSchools(schoolsData || []);
      setUserSchools(userSchoolsData || []);

      console.log('Profiles:', profilesData);
      console.log('Schools:', schoolsData);
      console.log('User Schools:', userSchoolsData);

    } catch (error) {
      console.error('Error fetching test data:', error);
      toast({
        title: "Erro ao carregar dados de teste",
        description: error.message || "Não foi possível carregar os dados",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
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
          <div className="flex items-center gap-4 mb-4">
            <Button variant="outline" size="sm" onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <div className="p-3 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl">
              <Users className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Página de Teste - Usuários
              </h1>
              <p className="text-muted-foreground">Visualização de todos os dados do sistema</p>
            </div>
          </div>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{profiles.length}</div>
              <p className="text-xs text-muted-foreground">Usuários cadastrados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Escolas</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{schools.length}</div>
              <p className="text-xs text-muted-foreground">Escolas cadastradas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Relacionamentos</CardTitle>
              <Crown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userSchools.length}</div>
              <p className="text-xs text-muted-foreground">Vínculos usuário-escola</p>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Usuários */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Todos os Usuários</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {profiles.map((profile: any) => (
                <div key={profile.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{profile.name}</h3>
                      <p className="text-sm text-muted-foreground">{profile.email}</p>
                      <p className="text-xs text-muted-foreground">ID: {profile.id}</p>
                      <p className="text-xs text-muted-foreground">
                        Criado: {new Date(profile.created_at).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getUserTypeBadgeVariant(profile.user_type)}>
                      {getUserTypeLabel(profile.user_type)}
                    </Badge>
                    {profile.secretaria_role && (
                      <Badge variant="outline">{profile.secretaria_role}</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Lista de Escolas */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Todas as Escolas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {schools.map((school: any) => (
                <div key={school.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Building className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{school.name}</h3>
                      <p className="text-sm text-muted-foreground">{school.email || 'Sem email'}</p>
                      <p className="text-xs text-muted-foreground">
                        {school.city}, {school.state} - CEP: {school.zip_code}
                      </p>
                      <p className="text-xs text-muted-foreground">ID: {school.id}</p>
                      <p className="text-xs text-muted-foreground">
                        Admin ID: {school.admin_user_id || 'Não definido'}
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

        {/* Relacionamentos Usuário-Escola */}
        <Card>
          <CardHeader>
            <CardTitle>Relacionamentos Usuário-Escola</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userSchools.map((relation: any) => (
                <div key={relation.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Crown className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">
                        {relation.profiles?.name} → {relation.schools?.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {relation.profiles?.email} | {getUserTypeLabel(relation.profiles?.user_type)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Escola: {relation.schools?.city}, {relation.schools?.state}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Criado: {new Date(relation.created_at).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {userSchools.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Crown className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhum relacionamento usuário-escola encontrado.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Informações do usuário atual */}
        {profile && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Usuário Atual (Logado)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 border rounded-lg bg-muted/30">
                <h3 className="font-semibold">{profile.name}</h3>
                <p className="text-sm text-muted-foreground">{profile.email}</p>
                <p className="text-xs text-muted-foreground">ID: {profile.id}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant={getUserTypeBadgeVariant(profile.user_type)}>
                    {getUserTypeLabel(profile.user_type)}
                  </Badge>
                  {profile.secretaria_role && (
                    <Badge variant="outline">{profile.secretaria_role}</Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Teste;
