
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageSquare, 
  Send, 
  Plus, 
  Mail, 
  AlertTriangle,
  Megaphone,
  HeadphonesIcon
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const MessagingSystem = () => {
  const [messages, setMessages] = useState([]);
  const [schools, setSchools] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const [newMessage, setNewMessage] = useState({
    to_school_id: '',
    subject: '',
    content: '',
    message_type: 'general'
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
        .order('name');

      if (schoolsError) throw schoolsError;

      // Buscar mensagens
      const { data: messagesData, error: messagesError } = await supabase
        .from('messages')
        .select(`
          *,
          schools (
            id,
            name,
            email
          )
        `)
        .order('sent_at', { ascending: false });

      if (messagesError) throw messagesError;

      setSchools(schoolsData || []);
      setMessages(messagesData || []);
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

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const messageData = {
        ...newMessage,
        to_school_id: newMessage.to_school_id || null, // null = mensagem para todas as escolas
        from_user_id: (await supabase.auth.getUser()).data.user?.id
      };

      const { error } = await supabase
        .from('messages')
        .insert([messageData]);

      if (error) throw error;

      await fetchData();
      setIsDialogOpen(false);
      setNewMessage({
        to_school_id: '',
        subject: '',
        content: '',
        message_type: 'general'
      });

      toast({
        title: "Mensagem enviada!",
        description: "A mensagem foi enviada com sucesso",
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Erro ao enviar mensagem",
        description: "Não foi possível enviar a mensagem",
        variant: "destructive",
      });
    }
  };

  const getMessageTypeIcon = (type: string) => {
    switch (type) {
      case 'payment_reminder':
        return <AlertTriangle className="h-4 w-4" />;
      case 'announcement':
        return <Megaphone className="h-4 w-4" />;
      case 'support':
        return <HeadphonesIcon className="h-4 w-4" />;
      default:
        return <Mail className="h-4 w-4" />;
    }
  };

  const getMessageTypeLabel = (type: string) => {
    const labels = {
      general: 'Geral',
      payment_reminder: 'Lembrete de Pagamento',
      announcement: 'Anúncio',
      support: 'Suporte'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getMessageTypeBadgeVariant = (type: string) => {
    const variants: Record<string, "default" | "destructive" | "outline" | "secondary"> = {
      general: 'outline',
      payment_reminder: 'destructive',
      announcement: 'default',
      support: 'secondary'
    };
    return variants[type] || 'outline';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Sistema de Comunicação
            </CardTitle>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Mensagem
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Enviar Nova Mensagem</DialogTitle>
                </DialogHeader>
                <form onSubmit={sendMessage} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="recipient">Destinatário</Label>
                    <Select 
                      value={newMessage.to_school_id} 
                      onValueChange={(value) => setNewMessage({ ...newMessage, to_school_id: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o destinatário" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Todas as Escolas</SelectItem>
                        {schools.map((school: any) => (
                          <SelectItem key={school.id} value={school.id}>
                            {school.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo de Mensagem</Label>
                    <Select 
                      value={newMessage.message_type} 
                      onValueChange={(value) => setNewMessage({ ...newMessage, message_type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">Geral</SelectItem>
                        <SelectItem value="payment_reminder">Lembrete de Pagamento</SelectItem>
                        <SelectItem value="announcement">Anúncio</SelectItem>
                        <SelectItem value="support">Suporte</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Assunto</Label>
                    <Input
                      id="subject"
                      value={newMessage.subject}
                      onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
                      placeholder="Digite o assunto da mensagem"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="content">Conteúdo</Label>
                    <Textarea
                      id="content"
                      value={newMessage.content}
                      onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                      placeholder="Digite o conteúdo da mensagem"
                      rows={6}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Enviar Mensagem
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">Todas</TabsTrigger>
              <TabsTrigger value="general">Gerais</TabsTrigger>
              <TabsTrigger value="payment_reminder">Pagamentos</TabsTrigger>
              <TabsTrigger value="announcement">Anúncios</TabsTrigger>
              <TabsTrigger value="support">Suporte</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="space-y-4">
                {messages.map((message: any) => (
                  <div key={message.id} className="p-4 border rounded-lg hover:bg-muted/50">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getMessageTypeIcon(message.message_type)}
                        <h3 className="font-semibold">{message.subject}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getMessageTypeBadgeVariant(message.message_type)}>
                          {getMessageTypeLabel(message.message_type)}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(message.sent_at), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Para: {message.schools?.name || 'Todas as Escolas'}
                    </p>
                    <p className="text-sm">{message.content}</p>
                  </div>
                ))}
                {messages.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Nenhuma mensagem enviada ainda.</p>
                  </div>
                )}
              </div>
            </TabsContent>

            {['general', 'payment_reminder', 'announcement', 'support'].map(type => (
              <TabsContent key={type} value={type}>
                <div className="space-y-4">
                  {messages
                    .filter((message: any) => message.message_type === type)
                    .map((message: any) => (
                      <div key={message.id} className="p-4 border rounded-lg hover:bg-muted/50">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {getMessageTypeIcon(message.message_type)}
                            <h3 className="font-semibold">{message.subject}</h3>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {format(new Date(message.sent_at), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Para: {message.schools?.name || 'Todas as Escolas'}
                        </p>
                        <p className="text-sm">{message.content}</p>
                      </div>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
