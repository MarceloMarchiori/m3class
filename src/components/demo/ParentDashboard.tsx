import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Calendar, 
  TrendingUp,
  MessageSquare,
  Bell,
  BookOpen,
  GraduationCap,
  Award,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { NotificationSystem } from '../NotificationSystem';

export const ParentDashboard = () => {
  const [selectedChild, setSelectedChild] = useState('all');

  const metrics = [
    {
      title: "Filhos Cadastrados",
      value: "2",
      change: "João e Maria",
      trend: "neutral",
      icon: <Users className="h-5 w-5 text-blue-600" />,
      color: "bg-blue-100"
    },
    {
      title: "Frequência Média",
      value: "94%",
      change: "+2% este mês",
      trend: "up",
      icon: <Calendar className="h-5 w-5 text-green-600" />,
      color: "bg-green-100"
    },
    {
      title: "Média Geral",
      value: "8.5",
      change: "Bom desempenho",
      trend: "up",
      icon: <Award className="h-5 w-5 text-purple-600" />,
      color: "bg-purple-100"
    },
    {
      title: "Notificações",
      value: "3",
      change: "1 nova hoje",
      trend: "neutral",
      icon: <Bell className="h-5 w-5 text-orange-600" />,
      color: "bg-orange-100"
    }
  ];

  const children = [
    {
      id: 1,
      name: "João Silva",
      class: "8º A",
      school: "Escola Municipal Centro",
      attendance: 96,
      average: 8.7,
      status: "excellent"
    },
    {
      id: 2,
      name: "Maria Silva",
      class: "6º B", 
      school: "Escola Municipal Centro",
      attendance: 92,
      average: 8.3,
      status: "good"
    }
  ];

  const recentEvents = [
    { id: 1, type: "absence", child: "João Silva", event: "Falta registrada", date: "Hoje, 14:30", severity: "warning" },
    { id: 2, type: "grade", child: "Maria Silva", event: "Nova nota: Matemática (9.0)", date: "Ontem, 16:20", severity: "success" },
    { id: 3, type: "message", child: "João Silva", event: "Recado da professora", date: "Ontem, 09:15", severity: "info" },
    { id: 4, type: "attendance", child: "Maria Silva", event: "100% de presença esta semana", date: "2 dias atrás", severity: "success" },
  ];

  const upcomingEvents = [
    { id: 1, title: "Reunião de Pais - 8º A", date: "15/12/2024", time: "19:00", type: "meeting" },
    { id: 2, title: "Prova de Matemática - João", date: "18/12/2024", time: "08:00", type: "exam" },
    { id: 3, title: "Feira de Ciências", date: "20/12/2024", time: "14:00", type: "event" },
    { id: 4, title: "Entrega de Boletins", date: "22/12/2024", time: "18:00", type: "meeting" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'attention': return 'bg-yellow-100 text-yellow-800';
      case 'concern': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'absence': return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'grade': return <Award className="h-4 w-4 text-green-500" />;
      case 'message': return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case 'attendance': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'meeting': return <Users className="h-4 w-4 text-purple-500" />;
      case 'exam': return <BookOpen className="h-4 w-4 text-red-500" />;
      case 'event': return <Calendar className="h-4 w-4 text-blue-500" />;
      default: return <Calendar className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index} className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${metric.color}`}>
                  {metric.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">{metric.title}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <p className="text-xs text-muted-foreground">{metric.change}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 bg-white/60 backdrop-blur-sm">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">Visão Geral</span>
            <span className="sm:hidden">Geral</span>
          </TabsTrigger>
          <TabsTrigger value="children" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            <span className="hidden sm:inline">Filhos</span>
            <span className="sm:hidden">Filhos</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notificações</span>
            <span className="sm:hidden">Notif</span>
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Eventos</span>
            <span className="sm:hidden">Eventos</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Atividade Recente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentEvents.map((event) => (
                    <div key={event.id} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      {getEventIcon(event.type)}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{event.event}</p>
                        <p className="text-xs text-muted-foreground">
                          {event.child} • {event.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Próximos Eventos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        {getEventTypeIcon(event.type)}
                        <div>
                          <p className="font-medium text-sm">{event.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {event.date} às {event.time}
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Ver
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="children">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {children.map((child) => (
              <Card key={child.id} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    {child.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {child.class} - {child.school}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Frequência:</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-2 bg-green-500 rounded-full" 
                            style={{ width: `${child.attendance}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{child.attendance}%</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Média Geral:</span>
                      <span className="text-lg font-bold text-blue-600">{child.average}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Status:</span>
                      <Badge className={getStatusColor(child.status)}>
                        {child.status === 'excellent' ? 'Excelente' : 
                         child.status === 'good' ? 'Bom' : 
                         child.status === 'attention' ? 'Atenção' : 'Preocupante'}
                      </Badge>
                    </div>
                    
                    <Button className="w-full mt-4" variant="outline">
                      Ver Detalhes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationSystem />
        </TabsContent>

        <TabsContent value="events">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Calendário de Eventos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors gap-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        {getEventTypeIcon(event.type)}
                      </div>
                      <div>
                        <h3 className="font-semibold">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {event.date} às {event.time}
                        </p>
                        <p className="text-xs text-muted-foreground capitalize">
                          Tipo: {event.type === 'meeting' ? 'Reunião' : 
                                 event.type === 'exam' ? 'Prova' : 'Evento'}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Lembrete
                      </Button>
                      <Button size="sm">
                        Detalhes
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
