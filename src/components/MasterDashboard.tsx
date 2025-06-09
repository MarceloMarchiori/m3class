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
  CreditCard
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { UserManagement } from './UserManagement';
import { FinancialDashboard } from './FinancialDashboard';
import { MessagingSystem } from './MessagingSystem';
import { SchoolCreationForm } from './SchoolCreationForm';
import { EnhancedUserCreationForm } from './EnhancedUserCreationForm';
import { SchoolEditForm } from './SchoolEditForm';
import { UserEditForm } from './UserEditForm';
import { SubscriptionEditForm } from './SubscriptionEditForm';

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
  const { toast } = useToast();

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

      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select(`
          *,
          user_schools!inner(
            school_id,
            schools(name)
          )
        `)
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
    const labels = {
      master: 'Master',
      school_admin: 'Admin Escola',
      professor: 'Professor',
      aluno: 'Aluno',
      responsavel: 'Responsável',
      secretaria: 'Secretaria'
    };
    return labels[userType as keyof labels] || userType;
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (editingSchool) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background p-6">
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
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background p-6">
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
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background p-6">
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
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background p-6">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
              <Crown className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Dashboard Comercial Master
              </h1>
              <p className="text-muted-foreground">Gestão completa da plataforma EduDiário</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                R$ {totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-muted-foreground">Acumulado</p>
            </CardContent>
          </Card>

          <Card className="gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                R$ {monthlyRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-muted-foreground">Este mês</p>
            </CardContent>
          </Card>

          <Card className="gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Escolas</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{schools.length}</div>
              <p className="text-xs text-muted-foreground">
                {schools.filter((s: any) => s.is_active).length} ativas
              </p>
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
        </div>

        {overduePayments > 0 && (
          <Card className="mb-6 border-orange-200 bg-orange-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-orange-700">
                <Calendar className="h-5 w-5" />
                <span className="font-semibold">
                  Atenção: {overduePayments} pagamento(s) em atraso!
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Visão Geral
            </TabsTrigger>
            <TabsTrigger value="financial" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Financeiro
            </TabsTrigger>
            <TabsTrigger value="schools" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Escolas
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Usuários
            </TabsTrigger>
            <TabsTrigger value="subscriptions" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Assinaturas
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Comunicação
            </TabsTrigger>
            <TabsTrigger value="manage-users" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Criar Usuários
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Resumo Financeiro</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Assinaturas Ativas:</span>
                    <Badge variant="default">{activeSubscriptions}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Pagamentos em Atraso:</span>
                    <Badge variant={overduePayments > 0 ? "destructive" : "secondary"}>
                      {overduePayments}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Receita Média por Escola:</span>
                    <span className="font-bold">
                      R$ {activeSubscriptions > 0 ? 
                        (monthlyRevenue / activeSubscriptions).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : 
                        '0,00'
                      }
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Escolas por Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Escolas Ativas:</span>
                    <Badge variant="default">
                      {schools.filter((s: any) => s.is_active).length}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Escolas Inativas:</span>
                    <Badge variant="secondary">
                      {schools.filter((s: any) => !s.is_active).length}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Com Assinatura:</span>
                    <Badge variant="default">{activeSubscriptions}</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="financial">
            <FinancialDashboard />
          </TabsContent>

          <TabsContent value="schools">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Gerenciar Escolas</CardTitle>
                  <Button 
                    className="flex items-center gap-2"
                    onClick={() => setIsSchoolDialogOpen(true)}
                  >
                    <Plus className="h-4 w-4" />
                    Nova Escola
                  </Button>
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
                        {subscriptions.find((s: any) => s.school_id === school.id) && (
                          <Badge variant="outline">Com Assinatura</Badge>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingSchool(school)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
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
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Usuários Cadastrados</CardTitle>
                  <Button 
                    className="flex items-center gap-2"
                    onClick={() => setIsUserDialogOpen(true)}
                  >
                    <UserPlus className="h-4 w-4" />
                    Novo Usuário
                  </Button>
                </div>
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
                          {profile.user_schools && profile.user_schools.length > 0 && (
                            <p className="text-xs text-muted-foreground">
                              Escolas: {profile.user_schools.map((us: any) => us.schools.name).join(', ')}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getUserTypeBadgeVariant(profile.user_type)}>
                          {getUserTypeLabel(profile.user_type)}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingUser(profile)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
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
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscriptions">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Assinaturas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subscriptions.map((subscription: any) => (
                    <div key={subscription.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <CreditCard className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{subscription.schools?.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Plano: {subscription.plan_name} - R$ {subscription.monthly_value}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Vencimento dia {subscription.due_day} de cada mês
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={subscription.status === 'active' ? 'default' : 'secondary'}>
                          {subscription.status === 'active' ? 'Ativa' : subscription.status}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingSubscription(subscription)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
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
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <MessagingSystem />
          </TabsContent>

          <TabsContent value="manage-users">
            <UserManagement schools={schools} onUserCreated={fetchData} />
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
              <DialogTitle>Criar Novo Usuário</DialogTitle>
            </DialogHeader>
            <EnhancedUserCreationForm 
              schools={schools}
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
