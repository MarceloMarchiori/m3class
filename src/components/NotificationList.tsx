import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, AlertTriangle, Info, DollarSign, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'absence' | 'grade' | 'general' | 'payment';
  is_read: boolean;
  data?: any;
  created_at: string;
}

interface NotificationListProps {
  userId?: string;
  userType?: string;
}

export const NotificationList: React.FC<NotificationListProps> = ({ 
  userId = 'demo-user',
  userType = 'responsavel'
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Mock data for demo
  const mockNotifications: Notification[] = [
    {
      id: '1',
      title: 'Falta Registrada',
      message: 'Seu filho(a) João faltou à aula no dia 08/01/2025',
      type: 'absence',
      is_read: false,
      data: { student_name: 'João Santos', date: '2025-01-08' },
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Nova Nota Disponível',
      message: 'Nova nota de Matemática foi registrada para Maria',
      type: 'grade',
      is_read: false,
      data: { student_name: 'Maria Santos', subject: 'Matemática', grade: 8.5 },
      created_at: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: '3',
      title: 'Reunião de Pais',
      message: 'Reunião de pais marcada para 15/01/2025 às 19:00',
      type: 'general',
      is_read: true,
      data: { date: '2025-01-15', time: '19:00' },
      created_at: new Date(Date.now() - 172800000).toISOString()
    }
  ];

  useEffect(() => {
    loadNotifications();
  }, [userId]);

  const loadNotifications = async () => {
    setLoading(true);
    try {
      // Para demo, usar dados mock
      if (userId === 'demo-user') {
        setNotifications(mockNotifications);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNotifications((data || []) as Notification[]);
    } catch (error) {
      console.error('Erro ao carregar notificações:', error);
      toast({
        title: "Erro ao carregar notificações",
        description: "Tente novamente mais tarde.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      // Para demo, apenas atualizar localmente
      if (userId === 'demo-user') {
        setNotifications(prev => 
          prev.map(n => n.id === notificationId ? { ...n, is_read: true } : n)
        );
        return;
      }

      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notificationId);

      if (error) throw error;

      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, is_read: true } : n)
      );
    } catch (error) {
      console.error('Erro ao marcar como lida:', error);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'absence':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'grade':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'payment':
        return <DollarSign className="h-5 w-5 text-blue-600" />;
      default:
        return <Info className="h-5 w-5 text-blue-600" />;
    }
  };

  const getNotificationColor = (type: string, isRead: boolean) => {
    const opacity = isRead ? '50' : '100';
    switch (type) {
      case 'absence':
        return `bg-red-${opacity} text-red-800`;
      case 'grade':
        return `bg-green-${opacity} text-green-800`;
      case 'payment':
        return `bg-blue-${opacity} text-blue-800`;
      default:
        return `bg-blue-${opacity} text-blue-800`;
    }
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notificações
          </div>
          {unreadCount > 0 && (
            <Badge variant="destructive">{unreadCount} não lidas</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {notifications.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>Nenhuma notificação encontrada</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border rounded-lg transition-all hover:shadow-md ${
                  notification.is_read ? 'opacity-70' : 'border-blue-200 bg-blue-50/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {new Date(notification.created_at).toLocaleString('pt-BR')}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 ml-2">
                        <Badge 
                          variant="outline" 
                          className={getNotificationColor(notification.type, notification.is_read)}
                        >
                          {notification.type === 'absence' ? 'Falta' :
                           notification.type === 'grade' ? 'Nota' :
                           notification.type === 'payment' ? 'Pagamento' : 'Geral'}
                        </Badge>
                        {!notification.is_read && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => markAsRead(notification.id)}
                            className="text-xs"
                          >
                            Marcar como lida
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};