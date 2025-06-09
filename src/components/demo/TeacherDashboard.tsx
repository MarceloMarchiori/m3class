
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Users, 
  Calendar,
  ClipboardCheck,
  TrendingUp,
  MessageSquare,
  FileText,
  Clock,
  GraduationCap
} from 'lucide-react';

interface TeacherDashboardProps {
  demoUser: {
    name: string;
    email: string;
    userType: string;
  };
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ demoUser }) => {
  const teacherStats = {
    totalClasses: 5,
    totalStudents: 127,
    averageGrade: 7.8,
    attendanceRate: 92.3,
    pendingGrades: 8,
    nextClass: '3º Ano A - Matemática'
  };

  const todaySchedule = [
    { time: '08:00 - 08:50', class: '3º Ano A', subject: 'Matemática', room: 'Sala 12' },
    { time: '09:00 - 09:50', class: '3º Ano B', subject: 'Matemática', room: 'Sala 08' },
    { time: '10:10 - 11:00', class: '4º Ano A', subject: 'Matemática', room: 'Sala 15' },
    { time: '14:00 - 14:50', class: '5º Ano A', subject: 'Matemática', room: 'Sala 20' },
    { time: '15:00 - 15:50', class: '5º Ano B', subject: 'Matemática', room: 'Sala 18' }
  ];

  const recentActivities = [
    { action: 'Notas lançadas', description: '3º Ano A - Avaliação de Geometria', time: '1 hora atrás' },
    { action: 'Frequência registrada', description: '4º Ano A - Aula do dia 09/06', time: '2 horas atrás' },
    { action: 'Material enviado', description: 'Lista de exercícios para 5º Ano B', time: '1 dia atrás' },
    { action: 'Comunicado', description: 'Reunião de pais agendada para 15/06', time: '2 dias atrás' }
  ];

  const pendingTasks = [
    { task: 'Corrigir provas do 3º Ano B', deadline: 'Hoje', priority: 'alta' },
    { task: 'Preparar material para aula de frações', deadline: 'Amanhã', priority: 'média' },
    { task: 'Avaliar trabalhos em grupo', deadline: 'Sexta-feira', priority: 'média' },
    { task: 'Reunião pedagógica', deadline: 'Segunda-feira', priority: 'baixa' }
  ];

  return (
    <div className="space-y-6">
      {/* Header com informações do professor */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-full">
              <GraduationCap className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Olá, Prof. {demoUser.name}</h2>
              <p className="text-muted-foreground">Professor(a) de Matemática</p>
              <p className="text-sm text-green-600">Próxima aula: {teacherStats.nextClass} às 08:00</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Turmas</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teacherStats.totalClasses}</div>
            <p className="text-xs text-muted-foreground">3º ao 5º ano</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Alunos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teacherStats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">Todas as turmas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Média das Turmas</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teacherStats.averageGrade}</div>
            <p className="text-xs text-green-600">Acima da meta (7.0)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Frequência Média</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teacherStats.attendanceRate}%</div>
            <p className="text-xs text-green-600">Boa frequência</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notas Pendentes</CardTitle>
            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teacherStats.pendingGrades}</div>
            <p className="text-xs text-orange-600">Aguardando lançamento</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aulas Hoje</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todaySchedule.length}</div>
            <p className="text-xs text-muted-foreground">Horário completo</p>
          </CardContent>
        </Card>
      </div>

      {/* Dashboard principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Horário de hoje */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Horário de Hoje
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todaySchedule.map((schedule, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                  <div>
                    <p className="font-medium">{schedule.time}</p>
                    <p className="text-sm text-muted-foreground">{schedule.class} - {schedule.subject}</p>
                    <p className="text-xs text-muted-foreground">{schedule.room}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Detalhes
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tarefas pendentes */}
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

      {/* Atividades recentes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Atividades Recentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50">
                <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                  <BookOpen className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ações rápidas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Ações Rápidas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col gap-2">
              <ClipboardCheck className="h-6 w-6" />
              <span className="text-sm">Lançar Notas</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Calendar className="h-6 w-6" />
              <span className="text-sm">Registrar Frequência</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <FileText className="h-6 w-6" />
              <span className="text-sm">Material de Aula</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <MessageSquare className="h-6 w-6" />
              <span className="text-sm">Comunicados</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
