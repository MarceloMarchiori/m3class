import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Users, 
  Calendar, 
  Clock, 
  TrendingUp, 
  Award,
  MessageSquare,
  FileText,
  CheckCircle,
  UserCheck,
  Bell
} from 'lucide-react';
import { AttendanceManager } from '../AttendanceManager';
import { NotificationSystem } from '../NotificationSystem';

interface TeacherDashboardProps {
  demoUser?: {
    name: string;
    email: string;
    user_type: string;
  };
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ demoUser }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const metrics = [
    {
      title: "Turmas Ativas",
      value: "8",
      change: "+2 este mês",
      trend: "up",
      icon: <Users className="h-5 w-5 text-blue-600" />,
      color: "bg-blue-100"
    },
    {
      title: "Alunos Total",
      value: "245",
      change: "+12 novos",
      trend: "up", 
      icon: <BookOpen className="h-5 w-5 text-green-600" />,
      color: "bg-green-100"
    },
    {
      title: "Aulas Esta Semana",
      value: "24",
      change: "3 hoje",
      trend: "neutral",
      icon: <Calendar className="h-5 w-5 text-purple-600" />,
      color: "bg-purple-100"
    },
    {
      title: "Taxa de Presença",
      value: "92%",
      change: "+3% vs mês passado",
      trend: "up",
      icon: <UserCheck className="h-5 w-5 text-orange-600" />,
      color: "bg-orange-100"
    }
  ];

  const recentClasses = [
    { id: 1, subject: "Matemática", class: "8º A", time: "08:00", status: "Em andamento", students: 28 },
    { id: 2, subject: "Física", class: "9º B", time: "09:30", status: "Próxima", students: 25 },
    { id: 3, subject: "Matemática", class: "7º C", time: "11:00", status: "Agendada", students: 30 },
    { id: 4, subject: "Física", class: "8º B", time: "14:00", status: "Agendada", students: 27 },
  ];

  const pendingTasks = [
    { id: 1, task: "Corrigir provas de Matemática - 8º A", deadline: "Hoje", priority: "high" },
    { id: 2, task: "Preparar material para aula de Física", deadline: "Amanhã", priority: "medium" },
    { id: 3, task: "Enviar notas do bimestre", deadline: "Esta semana", priority: "high" },
    { id: 4, task: "Reunião com coordenação", deadline: "Sexta-feira", priority: "low" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Em andamento': return 'bg-green-100 text-green-800';
      case 'Próxima': return 'bg-blue-100 text-blue-800';
      case 'Agendada': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      {demoUser && (
        <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Bem-vindo, {demoUser.name}!</h2>
                <p className="text-muted-foreground">Professor - Matemática e Física</p>
                <p className="text-sm text-blue-600">Último acesso: Hoje às 07:45</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

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

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 bg-white/60 backdrop-blur-sm">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">Visão Geral</span>
            <span className="sm:hidden">Geral</span>
          </TabsTrigger>
          <TabsTrigger value="attendance" className="flex items-center gap-2">
            <UserCheck className="h-4 w-4" />
            <span className="hidden sm:inline">Frequência</span>
            <span className="sm:hidden">Frequência</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notificações</span>
            <span className="sm:hidden">Notif</span>
          </TabsTrigger>
          <TabsTrigger value="classes" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Aulas</span>
            <span className="sm:hidden">Aulas</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Classes Today */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Aulas de Hoje
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentClasses.map((classItem) => (
                    <div key={classItem.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <BookOpen className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{classItem.subject} - {classItem.class}</p>
                          <p className="text-sm text-muted-foreground">
                            {classItem.time} • {classItem.students} alunos
                          </p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(classItem.status)}>
                        {classItem.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Pending Tasks */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Tarefas Pendentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingTasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-100 rounded-lg">
                          <Clock className="h-4 w-4 text-orange-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{task.task}</p>
                          <p className="text-xs text-muted-foreground">{task.deadline}</p>
                        </div>
                      </div>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Média' : 'Baixa'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="attendance">
          <AttendanceManager />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationSystem />
        </TabsContent>

        <TabsContent value="classes">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Todas as Aulas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentClasses.map((classItem) => (
                  <div key={classItem.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors gap-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <BookOpen className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{classItem.subject}</h3>
                        <p className="text-sm text-muted-foreground">
                          Turma: {classItem.class} • {classItem.students} alunos
                        </p>
                        <p className="text-xs text-muted-foreground">Horário: {classItem.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(classItem.status)}>
                        {classItem.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Gerenciar
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
