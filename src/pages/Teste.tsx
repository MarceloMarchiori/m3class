
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Users, Building, Crown, Search, Filter, Database } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Teste = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState<any[]>([]);
  const [schools, setSchools] = useState<any[]>([]);
  const [userSchools, setUserSchools] = useState<any[]>([]);
  const [contracts, setContracts] = useState<any[]>([]);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

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

      // Buscar contratos
      const { data: contractsData, error: contractsError } = await supabase
        .from('school_contracts')
        .select(`
          *,
          schools!inner(name)
        `)
        .order('created_at', { ascending: false });

      if (contractsError) throw contractsError;

      // Buscar assinaturas
      const { data: subscriptionsData, error: subscriptionsError } = await supabase
        .from('school_subscriptions')
        .select(`
          *,
          schools!inner(name)
        `)
        .order('created_at', { ascending: false });

      if (subscriptionsError) throw subscriptionsError;

      setProfiles(profilesData || []);
      setSchools(schoolsData || []);
      setUserSchools(userSchoolsData || []);
      setContracts(contractsData || []);
      setSubscriptions(subscriptionsData || []);

      console.log('Profiles:', profilesData);
      console.log('Schools:', schoolsData);
      console.log('User Schools:', userSchoolsData);
      console.log('Contracts:', contractsData);
      console.log('Subscriptions:', subscriptionsData);

    } catch (error: any) {
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

  const getStatusBadgeVariant = (status: string): "default" | "destructive" | "outline" | "secondary" => {
    const variants: Record<string, "default" | "destructive" | "outline" | "secondary"> = {
      active: 'default',
      inactive: 'secondary',
      pending: 'outline',
      paid: 'default'
    };
    return variants[status] || 'outline';
  };

  const filteredProfiles = profiles.filter(profile => 
    profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.user_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSchools = schools.filter(school =>
    school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.state?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background p-3 sm:p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
            <Button variant="outline" size="sm" onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl">
                <Database className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Página de Teste - Sistema
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Visualização de todos os dados do sistema {profile ? `(Logado como: ${profile.name})` : '(Acesso público)'}
                </p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, email, cidade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Usuários</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-2xl font-bold">{profiles.length}</div>
              <p className="text-xs text-muted-foreground">Cadastrados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Escolas</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-2xl font-bold">{schools.length}</div>
              <p className="text-xs text-muted-foreground">Ativas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Vínculos</CardTitle>
              <Crown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-2xl font-bold">{userSchools.length}</div>
              <p className="text-xs text-muted-foreground">Usuário-Escola</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Contratos</CardTitle>
              <Filter className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-2xl font-bold">{contracts.length}</div>
              <p className="text-xs text-muted-foreground">Ativos</p>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Usuários */}
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Todos os Usuários ({filteredProfiles.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {filteredProfiles.map((profile: any) => (
                <div key={profile.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border rounded-lg hover:bg-muted/50 gap-3 sm:gap-4">
                  <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                    <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                      <Users className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-sm sm:text-base truncate">{profile.name}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground truncate">{profile.email}</p>
                      <p className="text-xs text-muted-foreground">
                        ID: {profile.id.substring(0, 8)}... | 
                        Criado: {new Date(profile.created_at).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant={getUserTypeBadgeVariant(profile.user_type)} className="text-xs">
                      {getUserTypeLabel(profile.user_type)}
                    </Badge>
                    {profile.secretaria_role && (
                      <Badge variant="outline" className="text-xs">{profile.secretaria_role}</Badge>
                    )}
                    {profile.id.startsWith('d') && (
                      <Badge variant="secondary" className="text-xs">DEMO</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Lista de Escolas */}
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Todas as Escolas ({filteredSchools.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {filteredSchools.map((school: any) => (
                <div key={school.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border rounded-lg hover:bg-muted/50 gap-3 sm:gap-4">
                  <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                    <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                      <Building className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-sm sm:text-base">{school.name}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">{school.email || 'Sem email'}</p>
                      <p className="text-xs text-muted-foreground">
                        {school.city}, {school.state} - CEP: {school.zip_code}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Admin: {school.admin_user_id ? school.admin_user_id.substring(0, 8) + '...' : 'Não definido'}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant={school.is_active ? 'default' : 'secondary'} className="text-xs">
                      {school.is_active ? 'Ativa' : 'Inativa'}
                    </Badge>
                    {school.id.match(/^[1-9a]/i) && (
                      <Badge variant="secondary" className="text-xs">DEMO</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Assinaturas e Contratos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 sm:mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Assinaturas ({subscriptions.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {subscriptions.slice(0, 5).map((subscription: any) => (
                  <div key={subscription.id} className="p-3 border rounded-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <h4 className="font-medium text-sm">{subscription.schools?.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          Plano: {subscription.plan_name} - R$ {subscription.monthly_value}
                        </p>
                      </div>
                      <Badge variant={getStatusBadgeVariant(subscription.status)} className="text-xs self-start sm:self-center">
                        {subscription.status}
                      </Badge>
                    </div>
                  </div>
                ))}
                {subscriptions.length > 5 && (
                  <p className="text-xs text-muted-foreground text-center">
                    +{subscriptions.length - 5} mais assinaturas
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Contratos ({contracts.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {contracts.slice(0, 5).map((contract: any) => (
                  <div key={contract.id} className="p-3 border rounded-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <h4 className="font-medium text-sm">{contract.schools?.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          {contract.contract_number} - {new Date(contract.start_date).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      <Badge variant={getStatusBadgeVariant(contract.status)} className="text-xs self-start sm:self-center">
                        {contract.status}
                      </Badge>
                    </div>
                  </div>
                ))}
                {contracts.length > 5 && (
                  <p className="text-xs text-muted-foreground text-center">
                    +{contracts.length - 5} mais contratos
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Relacionamentos Usuário-Escola */}
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Relacionamentos Usuário-Escola ({userSchools.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {userSchools.map((relation: any) => (
                <div key={relation.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border rounded-lg hover:bg-muted/50 gap-3">
                  <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                    <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
                      <Crown className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-sm sm:text-base">
                        {relation.profiles?.name} → {relation.schools?.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {relation.profiles?.email} | {getUserTypeLabel(relation.profiles?.user_type)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Escola: {relation.schools?.city}, {relation.schools?.state} | 
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
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Usuário Atual (Logado)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-3 sm:p-4 border rounded-lg bg-muted/30">
                <h3 className="font-semibold text-sm sm:text-base">{profile.name}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">{profile.email}</p>
                <p className="text-xs text-muted-foreground">ID: {profile.id}</p>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <Badge variant={getUserTypeBadgeVariant(profile.user_type)} className="text-xs">
                    {getUserTypeLabel(profile.user_type)}
                  </Badge>
                  {profile.secretaria_role && (
                    <Badge variant="outline" className="text-xs">{profile.secretaria_role}</Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {!profile && (
          <Card>
            <CardContent className="text-center py-8">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="font-semibold mb-2">Acesso Público</h3>
              <p className="text-muted-foreground mb-4">
                Você está visualizando os dados como visitante. Para acessar recursos completos, faça login.
              </p>
              <Button onClick={() => navigate('/')}>
                Fazer Login
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Teste;
