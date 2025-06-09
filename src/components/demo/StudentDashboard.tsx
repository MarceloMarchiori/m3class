
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Calendar, TrendingUp, Clock, FileText, MessageSquare, User } from 'lucide-react';

interface StudentDashboardProps {
  demoUser: {
    name: string;
    email: string;
    userType: string;
  };
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ demoUser }) => {
  const studentStats = {
    currentGrade: 8.5,
    attendance: 96.2,
    pendingAssignments: 3,
    nextClass: 'Matemática - 08:00'
  };

  const todaySchedule = [
    { time: '08:00', subject: 'Matemática', teacher: 'Prof. Maria', room: 'Sala 12' },
    { time: '09:00', subject: 'Português', teacher: 'Prof. João', room: 'Sala 08' },
    { time: '10:10', subject: 'História', teacher: 'Prof. Ana', room: 'Sala 15' },
    { time: '14:00', subject: 'Ciências', teacher: 'Prof. Carlos', room: 'Lab 01' }
  ];

  const recentGrades = [
    { subject: 'Matemática', assignment: 'Prova de Geometria', grade: 9.0, date: '05/06' },
    { subject: 'Português', assignment: 'Redação', grade: 8.5, date: '03/06' },
    { subject: 'História', assignment: 'Trabalho em Grupo', grade: 8.8, date: '01/06' },
    { subject: 'Ciências', assignment: 'Experimento', grade: 9.2, date: '30/05' }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <User className="h-8 w-8 text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Olá, {demoUser.name}!</h2>
              <p className="text-muted-foreground">5º Ano A - Turma da Manhã</p>
              <p className="text-sm text-purple-600">Próxima aula: {studentStats.nextClass}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Média Atual</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{studentStats.currentGrade}</div>
            <p className="text-xs text-muted-foreground">Muito bom!</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Frequência</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{studentStats.attendance}%</div>
            <p className="text-xs text-green-600">Excelente!</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Atividades</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{studentStats.pendingAssignments}</div>
            <p className="text-xs text-orange-600">Para entregar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aulas Hoje</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todaySchedule.length}</div>
            <p className="text-xs text-muted-foreground">Matérias diferentes</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{schedule.time} - {schedule.subject}</p>
                    <p className="text-sm text-muted-foreground">{schedule.teacher}</p>
                    <p className="text-xs text-muted-foreground">{schedule.room}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Notas Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentGrades.map((grade, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{grade.subject}</p>
                    <p className="text-sm text-muted-foreground">{grade.assignment}</p>
                    <p className="text-xs text-muted-foreground">{grade.date}</p>
                  </div>
                  <Badge variant={grade.grade >= 9 ? 'default' : grade.grade >= 7 ? 'secondary' : 'destructive'}>
                    {grade.grade}
                  </Badge>
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
              <BookOpen className="h-6 w-6" />
              <span className="text-sm">Minhas Notas</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <FileText className="h-6 w-6" />
              <span className="text-sm">Atividades</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Calendar className="h-6 w-6" />
              <span className="text-sm">Calendário</span>
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
