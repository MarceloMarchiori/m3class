import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { 
  Building, 
  Plus, 
  Users, 
  Crown, 
  DollarSign,
  MessageSquare,
  TrendingUp,
  Calendar,
  UserPlus,
  Edit,
  Trash2,
  CreditCard,
  LogIn,
  Target,
  Award,
  Activity,
  PieChart,
  Search
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { ModernMetricCard } from './ModernMetricCard';
import { AdvancedChartCard } from './AdvancedChartCard';
import { FinancialDashboard } from './FinancialDashboard';
import { MessagingSystem } from './MessagingSystem';
import { SchoolCreationForm } from './SchoolCreationForm';
import { EnhancedUserCreationForm } from './EnhancedUserCreationForm';
import { SchoolEditForm } from './SchoolEditForm';
import { UserEditForm } from './UserEditForm';
import { SubscriptionEditForm } from './SubscriptionEditForm';
import { MasterUserImpersonation } from './MasterUserImpersonation';

export const MasterDashboard = () => {
  const [schools, setSchools] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSchoolDialogOpen, setIsSchoolDialogOpen] = useState(false);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [editingSchool, setEditingSchool] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [editingSubscription, setEditingSubscription] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: schoolsData, error: schoolsError } = await supabase
        .from('schools')
        .select('*')
        .order('created_at', { ascending: false });

      if (schoolsError) throw schoolsError;

      // Buscar apenas usuários admin escola e master
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select(`
          *,
          user_schools!inner(
            school_id,
            schools(name)
          )
        `)
        .in('user_type', ['master', 'school_admin'])
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      const { data: subscriptionsData, error: subscriptionsError } = await supabase
        .from('school_subscriptions')
        .select('*, schools(name)')
        .order('created_at', { ascending: false });

      if (subscriptionsError) throw subscriptionsError;

      const { data: paymentsData, error: paymentsError } = await supabase
        .from('payment_history')
        .select('*')
        .order('due_date', { ascending: false });

      if (paymentsError) throw paymentsError;

      setSchools(schoolsData || []);
      setProfiles(profilesData || []);
      setSubscriptions(subscriptionsData || []);
      setPayments(paymentsData || []);
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

  const handleDeleteSchool = async (schoolId: string) => {
    try {
      const { error } = await supabase
        .from('schools')
        .delete()
        .eq('id', schoolId);

      if (error) throw error;

      toast({
        title: "Escola excluída com sucesso!",
        description: "A escola foi removida do sistema.",
      });

      fetchData();
    } catch (error: any) {
      console.error('Error deleting school:', error);
      toast({
        title: "Erro ao excluir escola",
        description: error.message || "Não foi possível excluir a escola",
        variant: "destructive",
      });
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      // Primeiro remover relacionamentos
      await supabase
        .from('user_schools')
        .delete()
        .eq('user_id', userId);

      // Depois remover o perfil
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (error) throw error;

      toast({
        title: "Usuário excluído com sucesso!",
        description: "O usuário foi removido do sistema.",
      });

      fetchData();
    } catch (error: any) {
      console.error('Error deleting user:', error);
      toast({
        title: "Erro ao excluir usuário",
        description: error.message || "Não foi possível excluir o usuário",
        variant: "destructive",
      });
    }
  };

  const handleDeleteSubscription = async (subscriptionId: string) => {
    try {
      const { error } = await supabase
        .from('school_subscriptions')
        .delete()
        .eq('id', subscriptionId);

      if (error) throw error;

      toast({
        title: "Assinatura excluída com sucesso!",
        description: "A assinatura foi removida do sistema.",
      });

      fetchData();
    } catch (error: any) {
      console.error('Error deleting subscription:', error);
      toast({
        title: "Erro ao excluir assinatura",
        description: error.message || "Não foi possível excluir a assinatura",
        variant: "destructive",
      });
    }
  };

  const getUserTypeLabel = (userType: string) => {
    const labels: Record<string, string> = {
      master: 'Master',
      school_admin: 'Admin Escola'
    };
    return labels[userType] || userType;
  };

  const getUserTypeBadgeVariant = (userType: string): "default" | "destructive" | "outline" | "secondary" => {
    const variants: Record<string, "default" | "destructive" | "outline" | "secondary"> = {
      master: 'default',
      school_admin: 'secondary'
    };
    return variants[userType] || 'outline';
  };

  const handleImpersonateUser = (user: any) => {
    // Navegar para o dashboard demo com o ID do usuário
    navigate(`/teste?impersonate=${user.id}&userType=${user.user_type}&userName=${encodeURIComponent(user.name)}`);
  };

  // Calculations for metrics
  const totalRevenue = payments
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + Number(p.amount), 0);

  const monthlyRevenue = payments
    .filter(p => p.status === 'paid' && new Date(p.paid_date).getMonth() === new Date().getMonth())
    .reduce((sum, p) => sum + Number(p.amount), 0);

  const overduePayments = payments.filter(p => 
    p.status === 'pending' && new Date(p.due_date) < new Date()
  ).length;

  const activeSubscriptions = subscriptions.filter(s => s.status === 'active').length;

  // Generate sample data for charts
  const revenueData = [
    { name: 'Jan', value: 45000 },
    { name: 'Fev', value: 52000 },
    { name: 'Mar', value: 48000 },
    { name: 'Abr', value: 61000 },
    { name: 'Mai', value: 55000 },
    { name: 'Jun', value: 67000 },
  ];

  const userTypeData = [
    { name: 'Professores', value: profiles.filter(p => p.user_type === 'professor').length },
    { name: 'Alunos', value: profiles.filter(p => p.user_type === 'aluno').length },
    { name: 'Responsáveis', value: profiles.filter(p => p.user_type === 'responsavel').length },
    { name: 'Admins', value: profiles.filter(p => p.user_type === 'school_admin').length },
    { name: 'Secretaria', value: profiles.filter(p => p.user_type === 'secretaria').length },
  ];

  const sparklineData = [
    { value: 100 }, { value: 150 }, { value: 120 }, { value: 180 }, { value: 160 }, { value: 200 }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (editingSchool) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 sm:p-6">
        <div className="container mx-auto max-w-4xl">
          <SchoolEditForm
            school={editingSchool}
            onSchoolUpdated={() => {
              setEditingSchool(null);
              fetchData();
            }}
            onCancel={() => setEditingSchool(null)}
          />
        </div>
      </div>
    );
  }

  if (editingUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 sm:p-6">
        <div className="container mx-auto max-w-4xl">
          <UserEditForm
            user={editingUser}
            schools={schools}
            onUserUpdated={() => {
              setEditingUser(null);
              fetchData();
            }}
            onCancel={() => setEditingUser(null)}
          />
        </div>
      </div>
    );
  }

  if (editingSubscription) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 sm:p-6">
        <div className="container mx-auto max-w-4xl">
          <SubscriptionEditForm
            subscription={editingSubscription}
            onSubscriptionUpdated={() => {
              setEditingSubscription(null);
              fetchData();
            }}
            onCancel={() => setEditingSubscription(null)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 sm:p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <div className="p-3 sm:p-4 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-lg">
              <Crown className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Dashboard Master
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 font-medium">Gestão Comercial Avançada - EduDiário</p>
            </div>
          </div>
          
        </div>

        {/* Modern Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <ModernMetricCard
            title="Receita Total"
            value={`R$ ${totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
            change={{ value: 12.5, isPositive: true }}
            sparklineData={sparklineData}
            gradient="from-emerald-500 to-teal-600"
            icon={<DollarSign className="h-6 w-6 text-white" />}
          />
          
          <ModernMetricCard
            title="Receita Mensal"
            value={`R$ ${monthlyRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
            change={{ value: 8.2, isPositive: true }}
            sparklineData={sparklineData}
            gradient="from-blue-500 to-indigo-600"
            icon={<TrendingUp className="h-6 w-6 text-white" />}
          />
          
          <ModernMetricCard
            title="Total de Escolas"
            value={schools.length}
            change={{ value: 15.3, isPositive: true }}
            sparklineData={sparklineData}
            gradient="from-purple-500 to-pink-600"
            icon={<Building className="h-6 w-6 text-white" />}
          />
          
          <ModernMetricCard
            title="Admins Cadastrados"
            value={profiles.length}
            change={{ value: 22.1, isPositive: true }}
            sparklineData={sparklineData}
            gradient="from-orange-500 to-red-600"
            icon={<Users className="h-6 w-6 text-white" />}
          />
        </div>

        {/* Alert for overdue payments */}
        {overduePayments > 0 && (
          <Card className="mb-6 border-0 bg-gradient-to-r from-amber-50 to-orange-50 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 text-amber-800">
                <div className="p-2 bg-amber-200 rounded-lg">
                  <Calendar className="h-5 w-5" />
                </div>
                <span className="font-semibold text-lg">
                  ⚠️ Atenção: {overduePayments} pagamento(s) em atraso!
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="financial" className="space-y-6 sm:space-y-8">
          <TabsList className="w-full bg-white/60 backdrop-blur-sm border-0 shadow-lg rounded-xl p-2 h-auto">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 w-full">
              <TabsTrigger 
                value="financial" 
                className="flex flex-col items-center gap-2 rounded-lg p-4 text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white h-auto"
              >
                <DollarSign className="h-6 w-6" />
                <span>Financeiro</span>
              </TabsTrigger>
              <TabsTrigger 
                value="schools" 
                className="flex flex-col items-center gap-2 rounded-lg p-4 text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white h-auto"
              >
                <Building className="h-6 w-6" />
                <span>Escolas</span>
              </TabsTrigger>
              <TabsTrigger 
                value="users" 
                className="flex flex-col items-center gap-2 rounded-lg p-4 text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white h-auto"
              >
                <Users className="h-6 w-6" />
                <span>Usuários</span>
              </TabsTrigger>
              <TabsTrigger 
                value="access" 
                className="flex flex-col items-center gap-2 rounded-lg p-4 text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white h-auto"
              >
                <Search className="h-6 w-6" />
                <span>Acesso Interno</span>
              </TabsTrigger>
              <TabsTrigger 
                value="subscriptions" 
                className="flex flex-col items-center gap-2 rounded-lg p-4 text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white h-auto"
              >
                <CreditCard className="h-6 w-6" />
                <span>Assinaturas</span>
              </TabsTrigger>
            </div>
          </TabsList>

          <TabsContent value="financial">
            <FinancialDashboard />
          </TabsContent>

          <TabsContent value="schools">
            <Card className="shadow-lg border-0 bg-white/60 backdrop-blur-sm">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <CardTitle className="text-xl">Gerenciar Escolas</CardTitle>
                  <Button 
                    className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 w-full sm:w-auto h-12"
                    onClick={() => setIsSchoolDialogOpen(true)}
                  >
                    <Plus className="h-5 w-5" />
                    Nova Escola
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {schools.map((school: any) => (
                    <div key={school.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-all duration-200 gap-4">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 rounded-lg flex-shrink-0">
                          <Building className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-semibold text-lg">{school.name}</h3>
                          <p className="text-sm text-muted-foreground truncate">
                            {school.email || 'Sem email cadastrado'}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {school.city}, {school.state}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                        <div className="flex gap-2 flex-wrap">
                          <Badge variant={school.is_active ? 'default' : 'secondary'} className="text-sm px-3 py-1">
                            {school.is_active ? 'Ativa' : 'Inativa'}
                          </Badge>
                          {subscriptions.find((s: any) => s.school_id === school.id) && (
                            <Badge variant="outline" className="text-sm px-3 py-1">Com Assinatura</Badge>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="lg"
                            onClick={() => setEditingSchool(school)}
                            className="h-12 px-4"
                          >
                            <Edit className="h-5 w-5" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="lg" className="h-12 px-4">
                                <Trash2 className="h-5 w-5" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Tem certeza que deseja excluir a escola "{school.name}"? Esta ação não pode ser desfeita.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteSchool(school.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Excluir
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card className="shadow-lg border-0 bg-white/60 backdrop-blur-sm">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <CardTitle className="text-xl">Administradores das Escolas</CardTitle>
                  <Button 
                    className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 w-full sm:w-auto h-12"
                    onClick={() => setIsUserDialogOpen(true)}
                  >
                    <UserPlus className="h-5 w-5" />
                    Novo Admin
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profiles.map((profile: any) => (
                    <div key={profile.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-all duration-200 gap-4">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-100 rounded-lg flex-shrink-0">
                          <Users className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-semibold text-lg">{profile.name}</h3>
                          <p className="text-sm text-muted-foreground truncate">{profile.email}</p>
                          {profile.user_schools && profile.user_schools.length > 0 && (
                            <p className="text-xs text-muted-foreground">
                              Escolas: {profile.user_schools.map((us: any) => us.schools.name).join(', ')}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                        <Badge variant={getUserTypeBadgeVariant(profile.user_type)} className="text-sm px-3 py-1">
                          {getUserTypeLabel(profile.user_type)}
                        </Badge>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="lg"
                            onClick={() => handleImpersonateUser(profile)}
                            title="Entrar como este usuário"
                            className="h-12 px-4"
                          >
                            <LogIn className="h-5 w-5" />
                          </Button>
                          <Button
                            variant="outline"
                            size="lg"
                            onClick={() => setEditingUser(profile)}
                            className="h-12 px-4"
                          >
                            <Edit className="h-5 w-5" />
                          </Button>
                          {profile.user_type !== 'master' && (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="lg" className="h-12 px-4">
                                  <Trash2 className="h-5 w-5" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Tem certeza que deseja excluir o usuário "{profile.name}"? Esta ação não pode ser desfeita.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeleteUser(profile.id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Excluir
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="access">
            <MasterUserImpersonation />
          </TabsContent>

          <TabsContent value="subscriptions">
            <Card className="shadow-lg border-0 bg-white/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl">Gerenciar Assinaturas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subscriptions.map((subscription: any) => (
                    <div key={subscription.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-all duration-200 gap-4">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-100 rounded-lg flex-shrink-0">
                          <CreditCard className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-semibold text-lg">{subscription.schools?.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Plano: {subscription.plan_name} - R$ {subscription.monthly_value}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Vencimento dia {subscription.due_day} de cada mês
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                        <Badge variant={subscription.status === 'active' ? 'default' : 'secondary'} className="text-sm px-3 py-1">
                          {subscription.status === 'active' ? 'Ativa' : subscription.status}
                        </Badge>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="lg"
                            onClick={() => setEditingSubscription(subscription)}
                            className="h-12 px-4"
                          >
                            <Edit className="h-5 w-5" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="lg" className="h-12 px-4">
                                <Trash2 className="h-5 w-5" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Tem certeza que deseja excluir a assinatura da escola "{subscription.schools?.name}"? Esta ação não pode ser desfeita.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteSubscription(subscription.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Excluir
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Dialog open={isSchoolDialogOpen} onOpenChange={setIsSchoolDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Criar Nova Escola</DialogTitle>
            </DialogHeader>
            <SchoolCreationForm 
              onSchoolCreated={() => {
                setIsSchoolDialogOpen(false);
                fetchData();
              }}
              onCancel={() => setIsSchoolDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>

        <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Criar Novo Administrador de Escola</DialogTitle>
            </DialogHeader>
            <EnhancedUserCreationForm 
              schools={schools}
              restrictToSchoolAdmin={true}
              onUserCreated={() => {
                setIsUserDialogOpen(false);
                fetchData();
              }}
              onCancel={() => setIsUserDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
