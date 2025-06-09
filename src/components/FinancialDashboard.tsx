
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DollarSign, 
  TrendingUp, 
  AlertCircle, 
  Calendar,
  CheckCircle,
  XCircle,
  Plus,
  Edit,
  Receipt
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const FinancialDashboard = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [payments, setPayments] = useState([]);
  const [schools, setSchools] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const [newSubscription, setNewSubscription] = useState({
    school_id: '',
    plan_name: 'basic',
    monthly_value: 299.99,
    due_day: 5
  });

  useEffect(() => {
    fetchFinancialData();
  }, []);

  const fetchFinancialData = async () => {
    try {
      // Buscar escolas
      const { data: schoolsData, error: schoolsError } = await supabase
        .from('schools')
        .select('*')
        .order('name');

      if (schoolsError) throw schoolsError;

      // Buscar assinaturas
      const { data: subscriptionsData, error: subscriptionsError } = await supabase
        .from('school_subscriptions')
        .select(`
          *,
          schools (
            id,
            name,
            email,
            city,
            state
          )
        `)
        .order('created_at', { ascending: false });

      if (subscriptionsError) throw subscriptionsError;

      // Buscar histórico de pagamentos
      const { data: paymentsData, error: paymentsError } = await supabase
        .from('payment_history')
        .select(`
          *,
          schools (
            id,
            name
          )
        `)
        .order('due_date', { ascending: false });

      if (paymentsError) throw paymentsError;

      setSchools(schoolsData || []);
      setSubscriptions(subscriptionsData || []);
      setPayments(paymentsData || []);
    } catch (error) {
      console.error('Error fetching financial data:', error);
      toast({
        title: "Erro ao carregar dados financeiros",
        description: "Não foi possível carregar os dados",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createSubscription = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data, error } = await supabase
        .from('school_subscriptions')
        .insert([newSubscription])
        .select()
        .single();

      if (error) throw error;

      await fetchFinancialData();
      setIsDialogOpen(false);
      setNewSubscription({
        school_id: '',
        plan_name: 'basic',
        monthly_value: 299.99,
        due_day: 5
      });

      toast({
        title: "Assinatura criada!",
        description: "A assinatura foi criada com sucesso",
      });
    } catch (error) {
      console.error('Error creating subscription:', error);
      toast({
        title: "Erro ao criar assinatura",
        description: "Não foi possível criar a assinatura",
        variant: "destructive",
      });
    }
  };

  const markPaymentAsPaid = async (paymentId: string) => {
    try {
      const { error } = await supabase
        .from('payment_history')
        .update({ 
          status: 'paid',
          paid_date: new Date().toISOString().split('T')[0],
          payment_method: 'manual'
        })
        .eq('id', paymentId);

      if (error) throw error;

      await fetchFinancialData();
      toast({
        title: "Pagamento confirmado!",
        description: "O pagamento foi marcado como pago",
      });
    } catch (error) {
      console.error('Error updating payment:', error);
      toast({
        title: "Erro ao confirmar pagamento",
        description: "Não foi possível confirmar o pagamento",
        variant: "destructive",
      });
    }
  };

  // Calcular estatísticas
  const totalRevenue = payments
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + Number(p.amount), 0);

  const monthlyRevenue = payments
    .filter(p => p.status === 'paid' && new Date(p.paid_date).getMonth() === new Date().getMonth())
    .reduce((sum, p) => sum + Number(p.amount), 0);

  const overduePayments = payments.filter(p => 
    p.status === 'pending' && new Date(p.due_date) < new Date()
  );

  const activeSubscriptions = subscriptions.filter(s => s.status === 'active');

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cards de Estatísticas Financeiras */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="gradient-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
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
            <div className="text-2xl font-bold">
              R$ {monthlyRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">Este mês</p>
          </CardContent>
        </Card>

        <Card className="gradient-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pagamentos em Atraso</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{overduePayments.length}</div>
            <p className="text-xs text-muted-foreground">Requer atenção</p>
          </CardContent>
        </Card>

        <Card className="gradient-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assinaturas Ativas</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeSubscriptions.length}</div>
            <p className="text-xs text-muted-foreground">Escolas pagantes</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="subscriptions" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="subscriptions">Assinaturas</TabsTrigger>
          <TabsTrigger value="payments">Pagamentos</TabsTrigger>
          <TabsTrigger value="overdue">Em Atraso</TabsTrigger>
        </TabsList>

        <TabsContent value="subscriptions">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Gerenciar Assinaturas</CardTitle>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Nova Assinatura
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Criar Nova Assinatura</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={createSubscription} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="school">Escola</Label>
                        <Select 
                          value={newSubscription.school_id} 
                          onValueChange={(value) => setNewSubscription({ ...newSubscription, school_id: value })}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a escola" />
                          </SelectTrigger>
                          <SelectContent>
                            {schools.map((school: any) => (
                              <SelectItem key={school.id} value={school.id}>
                                {school.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="plan">Plano</Label>
                        <Select 
                          value={newSubscription.plan_name} 
                          onValueChange={(value) => setNewSubscription({ ...newSubscription, plan_name: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="basic">Básico</SelectItem>
                            <SelectItem value="premium">Premium</SelectItem>
                            <SelectItem value="enterprise">Enterprise</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="value">Valor Mensal (R$)</Label>
                        <Input
                          id="value"
                          type="number"
                          step="0.01"
                          value={newSubscription.monthly_value}
                          onChange={(e) => setNewSubscription({ ...newSubscription, monthly_value: Number(e.target.value) })}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="due_day">Dia do Vencimento</Label>
                        <Input
                          id="due_day"
                          type="number"
                          min="1"
                          max="31"
                          value={newSubscription.due_day}
                          onChange={(e) => setNewSubscription({ ...newSubscription, due_day: Number(e.target.value) })}
                          required
                        />
                      </div>
                      
                      <Button type="submit" className="w-full">
                        Criar Assinatura
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subscriptions.map((subscription: any) => (
                  <div key={subscription.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{subscription.schools?.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Plano: {subscription.plan_name} | Vencimento: dia {subscription.due_day}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {subscription.schools?.city}, {subscription.schools?.state}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">
                        R$ {Number(subscription.monthly_value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </div>
                      <Badge variant={subscription.status === 'active' ? 'default' : 'destructive'}>
                        {subscription.status === 'active' ? 'Ativa' : 'Inativa'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Pagamentos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {payments.slice(0, 10).map((payment: any) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{payment.schools?.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Vencimento: {format(new Date(payment.due_date), 'dd/MM/yyyy', { locale: ptBR })}
                      </p>
                      {payment.paid_date && (
                        <p className="text-sm text-green-600">
                          Pago em: {format(new Date(payment.paid_date), 'dd/MM/yyyy', { locale: ptBR })}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="font-bold">
                          R$ {Number(payment.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </div>
                        <Badge 
                          variant={
                            payment.status === 'paid' ? 'default' : 
                            payment.status === 'overdue' ? 'destructive' : 'secondary'
                          }
                        >
                          {payment.status === 'paid' ? 'Pago' : 
                           payment.status === 'overdue' ? 'Atrasado' : 'Pendente'}
                        </Badge>
                      </div>
                      {payment.status === 'pending' && (
                        <Button
                          size="sm"
                          onClick={() => markPaymentAsPaid(payment.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Marcar como Pago
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overdue">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-destructive" />
                Pagamentos em Atraso
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {overduePayments.map((payment: any) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 border-l-4 border-l-destructive border rounded-lg bg-destructive/5">
                    <div>
                      <h3 className="font-semibold">{payment.schools?.name}</h3>
                      <p className="text-sm text-destructive">
                        Venceu em: {format(new Date(payment.due_date), 'dd/MM/yyyy', { locale: ptBR })}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {Math.floor((new Date().getTime() - new Date(payment.due_date).getTime()) / (1000 * 60 * 60 * 24))} dias de atraso
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="font-bold text-destructive">
                          R$ {Number(payment.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => markPaymentAsPaid(payment.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Marcar como Pago
                      </Button>
                    </div>
                  </div>
                ))}
                {overduePayments.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
                    <p>Nenhum pagamento em atraso!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
