
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  BookOpen, 
  Calendar, 
  TrendingUp, 
  Clock, 
  FileText, 
  MessageSquare, 
  User, 
  Baby,
  GraduationCap,
  Bell,
  Heart
} from 'lucide-react';

interface ParentDashboardProps {
  demoUser?: {
    name: string;
    email: string;
    user_type: string;
  };
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({ demoUser }) => {
  const [selectedChild, setSelectedChild] = useState('joao');

  const children = [
    {
      id: 'joao',
      name: 'João Santos',
      class: '5º Ano A',
      currentGrade: 8.5,
      attendance: 96.2,
      nextClass: 'Matemática - 08:00'
    },
    {
      id: 'maria',
      name: 'Maria Santos',
      class: '3º Ano B',
      currentGrade: 9.1,
      attendance: 98.5,
      nextClass: 'Português - 09:00'
    }
  ];

  const currentChild = children.find(child => child.id === selectedChild) || children[0];

  const recentMessages = [
    { id: 1, from: 'Prof. Ana Silva', subject: 'Reunião de Pais', date: '08/06', priority: 'alta' },
    { id: 2, from: 'Secretaria', subject: 'Entrega de Documentos', date: '07/06', priority: 'média' },
    { id: 3, from: 'Prof. Carlos', subject: 'Trabalho de Ciências', date: '06/06', priority: 'baixa' },
  ];

  const upcomingEvents = [
    { id: 1, event: 'Reunião de Pais', date: '15/06', time: '19:00' },
    { id: 2, event: 'Festa Junina', date: '25/06', time: '14:00' },
    { id: 3, event: 'Entrega de Boletim', date: '30/06', time: '08:00' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-pink-100 rounded-full">
              <Heart className="h-8 w-8 text-pink-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Olá, {demoUser?.name || 'Responsável'}!</h2>
              <p className="text-muted-foreground">Portal do Responsável - Acompanhe seus filhos</p>
              <p className="text-sm text-pink-600">Último acesso: Hoje às 18:30</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Children Selector */}
      <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Baby className="h-5 w-5" />
            Selecionar Filho
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {children.map((child) => (
              <Button
                key={child.id}
                variant={selectedChild === child.id ? 'default' : 'outline'}
                onClick={() => setSelectedChild(child.id)}
                className="h-auto p-4 justify-start"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <GraduationCap className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">{child.name}</p>
                    <p className="text-sm text-muted-foreground">{child.class}</p>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-green-100">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Média Atual</p>
                <p className="text-2xl font-bold text-green-600">{currentChild.currentGrade}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-blue-100">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Frequência</p>
                <p className="text-2xl font-bold text-blue-600">{currentChild.attendance}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-orange-100">
                <MessageSquare className="h-5 w-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Mensagens</p>
                <p className="text-2xl font-bold text-orange-600">{recentMessages.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-purple-100">
                <Bell className="h-5 w-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Eventos</p>
                <p className="text-2xl font-bold text-purple-600">{upcomingEvents.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Ações Rápidas - {currentChild.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="h-20 flex flex-col gap-2">
                  <BookOpen className="h-6 w-6" />
                  <span className="text-sm">Ver Notas</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Notas de {currentChild.name}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Matemática</span>
                      <Badge variant="default">8.5</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Prova do 2º Bimestre</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Português</span>
                      <Badge variant="default">9.0</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Trabalho de Literatura</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Calendar className="h-6 w-6" />
                  <span className="text-sm">Frequência</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Frequência de {currentChild.name}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600">{currentChild.attendance}%</div>
                    <p className="text-muted-foreground">Taxa de presença atual</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <span>Esta semana</span>
                      <Badge variant="default">100%</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <span>Semana passada</span>
                      <Badge variant="secondary">80%</Badge>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <MessageSquare className="h-6 w-6" />
                  <span className="text-sm">Mensagens</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Mensagens da Escola</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  {recentMessages.map((message) => (
                    <div key={message.id} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-medium text-sm">{message.subject}</p>
                        <Badge variant={
                          message.priority === 'alta' ? 'destructive' : 
                          message.priority === 'média' ? 'default' : 'secondary'
                        }>
                          {message.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">De: {message.from}</p>
                      <p className="text-xs text-muted-foreground">{message.date}</p>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Bell className="h-6 w-6" />
                  <span className="text-sm">Eventos</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Próximos Eventos</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="p-3 border rounded-lg">
                      <p className="font-medium">{event.event}</p>
                      <p className="text-sm text-muted-foreground">{event.date} às {event.time}</p>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Current Child Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Informações de {currentChild.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-muted-foreground">Turma</p>
                <p className="text-lg font-semibold">{currentChild.class}</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-muted-foreground">Próxima Aula</p>
                <p className="text-lg font-semibold">{currentChild.nextClass}</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="text-lg font-semibold text-green-600">Ativo</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Atividades Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50">
                <div className="p-2 bg-green-100 rounded-lg">
                  <BookOpen className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Prova de Matemática entregue</p>
                  <p className="text-xs text-muted-foreground">Nota: 8.5 - Hoje</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Trabalho de Ciências</p>
                  <p className="text-xs text-muted-foreground">Entregue - Ontem</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Calendar className="h-4 w-4 text-orange-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">100% de presença esta semana</p>
                  <p className="text-xs text-muted-foreground">Parabéns!</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
