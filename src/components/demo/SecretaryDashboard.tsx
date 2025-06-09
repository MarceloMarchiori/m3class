
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Users, Calendar, Clock, Building, Phone, Mail } from 'lucide-react';

interface SecretaryDashboardProps {
  demoUser: {
    name: string;
    email: string;
    userType: string;
  };
}

export const SecretaryDashboard: React.FC<SecretaryDashboardProps> = ({ demoUser }) => {
  const stats = {
    pendingEnrollments: 15,
    documentsToProcess: 23,
    todayAppointments: 8,
    phoneCallsToday: 12
  };

  const pendingTasks = [
    { task: 'Processar matrícula de João Silva', priority: 'alta', deadline: 'Hoje' },
    { task: 'Emitir declaração para Maria Santos', priority: 'média', deadline: 'Amanhã' },
    { task: 'Organizar arquivo de transferências', priority: 'baixa', deadline: 'Sexta-feira' },
    { task: 'Atualizar dados no sistema', priority: 'média', deadline: 'Segunda-feira' }
  ];

  const todayAppointments = [
    { time: '09:00', person: 'Ana Costa (Mãe)', reason: 'Matrícula novo aluno', type: 'enrollment' },
    { time: '10:30', person: 'Carlos Silva (Pai)', reason: 'Declaração escolar', type: 'document' },
    { time: '14:00', person: 'Diretor Municipal', reason: 'Relatório mensal', type: 'meeting' },
    { time: '15:30', person: 'Empresa Transporte', reason: 'Renovação contrato', type: 'business' }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-100 rounded-full">
              <Building className="h-8 w-8 text-orange-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Bom dia, {demoUser.name}</h2>
              <p className="text-muted-foreground">Secretária Escolar</p>
              <p className="text-sm text-orange-600">Você tem {stats.todayAppointments} agendamentos hoje</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Matrículas Pendentes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.pendingEnrollments}</div>
            <p className="text-xs text-muted-foreground">Para processar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documentos</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.documentsToProcess}</div>
            <p className="text-xs text-muted-foreground">Aguardando processamento</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Agendamentos</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.todayAppointments}</div>
            <p className="text-xs text-muted-foreground">Para hoje</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ligações</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.phoneCallsToday}</div>
            <p className="text-xs text-muted-foreground">Hoje</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Agendamentos de Hoje
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todayAppointments.map((appointment, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{appointment.time} - {appointment.person}</p>
                    <p className="text-sm text-muted-foreground">{appointment.reason}</p>
                  </div>
                  <Badge variant="outline">
                    {appointment.type === 'enrollment' && 'Matrícula'}
                    {appointment.type === 'document' && 'Documento'}
                    {appointment.type === 'meeting' && 'Reunião'}
                    {appointment.type === 'business' && 'Negócio'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Tarefas Pendentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingTasks.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.task}</p>
                    <p className="text-xs text-muted-foreground">Prazo: {item.deadline}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={
                        item.priority === 'alta' ? 'destructive' : 
                        item.priority === 'média' ? 'default' : 'secondary'
                      }
                      className="text-xs"
                    >
                      {item.priority}
                    </Badge>
                    <Button variant="outline" size="sm">
                      Ver
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col gap-2">
              <Users className="h-6 w-6" />
              <span className="text-sm">Nova Matrícula</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <FileText className="h-6 w-6" />
              <span className="text-sm">Declarações</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Calendar className="h-6 w-6" />
              <span className="text-sm">Agendamentos</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Mail className="h-6 w-6" />
              <span className="text-sm">Comunicados</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
