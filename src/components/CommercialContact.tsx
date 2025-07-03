import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Phone, 
  Mail, 
  CreditCard, 
  MessageSquare, 
  Send, 
  Calendar,
  DollarSign,
  Building
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CommercialContactProps {
  schoolId?: string;
  userEmail?: string;
  userName?: string;
}

export const CommercialContact: React.FC<CommercialContactProps> = ({
  schoolId = 'demo-school',
  userEmail = 'admin@escola.com',
  userName = 'Administrador Demo'
}) => {
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: ''
  });
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.subject || !contactForm.message) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha o assunto e a mensagem.",
        variant: "destructive"
      });
      return;
    }

    setSending(true);
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert({
          school_id: schoolId,
          sender_name: userName,
          sender_email: userEmail,
          subject: contactForm.subject,
          message: contactForm.message
        });

      if (error) throw error;

      toast({
        title: "Mensagem enviada!",
        description: "Nossa equipe entrará em contato em breve."
      });

      setContactForm({ subject: '', message: '' });
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      toast({
        title: "Erro ao enviar mensagem",
        description: "Tente novamente mais tarde.",
        variant: "destructive"
      });
    } finally {
      setSending(false);
    }
  };

  const subscriptionInfo = {
    plan: 'Plano Pro',
    monthlyValue: 149.90,
    dueDate: '15 de cada mês',
    pixKey: 'contato@m3class.com.br',
    nextPayment: '15/02/2025'
  };

  return (
    <div className="space-y-6">
      {/* Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Contato Comercial
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Phone className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium">Setor Comercial</p>
                <p className="text-sm text-muted-foreground">(34) 99799-2661</p>
                <p className="text-xs text-blue-600">WhatsApp disponível</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <Mail className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium">E-mail</p>
                <p className="text-sm text-muted-foreground">contato@m3class.com.br</p>
                <p className="text-xs text-green-600">Resposta em até 24h</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <MessageSquare className="h-5 w-5 text-purple-600" />
              <div>
                <p className="font-medium">Suporte Técnico</p>
                <p className="text-sm text-muted-foreground">suporte@m3class.com.br</p>
                <p className="text-xs text-purple-600">Seg-Sex: 8h às 18h</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Informações de Pagamento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">{subscriptionInfo.plan}</p>
                <Badge variant="default">Ativo</Badge>
              </div>
              <p className="text-2xl font-bold text-green-600">
                R$ {subscriptionInfo.monthlyValue.toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground">Valor mensal</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">Vencimento</p>
                  <p className="text-sm text-muted-foreground">{subscriptionInfo.dueDate}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <DollarSign className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-sm font-medium">Próximo pagamento</p>
                  <p className="text-sm text-muted-foreground">{subscriptionInfo.nextPayment}</p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <p className="font-medium text-green-800 mb-2">Chave PIX</p>
              <p className="text-sm font-mono bg-white p-2 rounded border">
                {subscriptionInfo.pixKey}
              </p>
              <p className="text-xs text-green-600 mt-1">
                Copie e cole no seu app bancário
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Enviar Mensagem
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Nome</label>
                <Input value={userName} disabled className="bg-muted" />
              </div>
              <div>
                <label className="text-sm font-medium">E-mail</label>
                <Input value={userEmail} disabled className="bg-muted" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Assunto *</label>
              <Input
                placeholder="Ex: Dúvidas sobre plano, suporte técnico..."
                value={contactForm.subject}
                onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Mensagem *</label>
              <Textarea
                placeholder="Descreva sua dúvida ou solicitação..."
                rows={5}
                value={contactForm.message}
                onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                required
              />
            </div>

            <Button 
              type="submit" 
              disabled={sending}
              className="w-full md:w-auto"
            >
              <Send className="h-4 w-4 mr-2" />
              {sending ? 'Enviando...' : 'Enviar Mensagem'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-auto py-4 flex flex-col gap-2"
              onClick={() => window.open('https://wa.me/5534997992661', '_blank')}
            >
              <Phone className="h-6 w-6" />
              <span className="text-sm">WhatsApp</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto py-4 flex flex-col gap-2"
              onClick={() => window.open('mailto:contato@m3class.com.br', '_blank')}
            >
              <Mail className="h-6 w-6" />
              <span className="text-sm">E-mail</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto py-4 flex flex-col gap-2"
              onClick={() => {
                navigator.clipboard.writeText(subscriptionInfo.pixKey);
                toast({
                  title: "Chave PIX copiada!",
                  description: "Cole no seu app bancário."
                });
              }}
            >
              <CreditCard className="h-6 w-6" />
              <span className="text-sm">Copiar PIX</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};