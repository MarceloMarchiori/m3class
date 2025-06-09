
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, BookOpen, Calendar, TrendingUp, MessageSquare, FileText, Clock } from 'lucide-react';

interface ParentDashboardProps {
  demoUser: {
    name: string;
    email: string;
    userType: string;
  };
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({ demoUser }) => {
  const childInfo = {
    name: 'Pedro Silva',
    class: '5º Ano A',
    currentGrade: 8.7,
    attendance: 95.8,
    nextClass: 'Matemática - 08:00'
  };

  const recentGrades = [
    { subject: 'Matemática', grade: 9.0, date: '05/06', type: 'Prova' },
    { subject: 'Português', grade: 8.5, date: '03/06', type: 'Redação' },
    { subject: 'História', grade: 8.8, date: '01/06', type: 'Trabalho' },
    { subject: 'Ciências', grade: 9.2, date: '30/05', type: 'Experimento' }
  ];

  const schoolCommunications = [
    { title: 'Reunião de Pais - 5º Ano', date: '15/06', time: '19:00', type: 'Reunião' },
    { title: 'Feira de Ciências', date: '20/06', time: '14:00', type: 'Evento' },
    { title: 'Entrega de Boletins', date: '25/06', time: '18:00', type: 'Administrativo' },
    { title: 'Festa Junina', date: '29/06', time: '18:30', type: 'Evento' }
  ];

  const weekSchedule = [
    { day: 'Segunda', subjects: ['Matemática', 'Português', 'História', 'Ed. Física'] },
    { day: 'Terça', subjects: ['Ciências', 'Geografia', 'Matemática', 'Inglês'] },
    { day: 'Quarta', subjects: ['Português', 'História', 'Artes', 'Ciências'] },
    { day: 'Quinta', subjects: ['Matemática', 'Geografia', 'Português', 'Ed. Física'] },
    { day: 'Sexta', subjects: ['Ciências', 'Inglês', 'História', 'Matemática'] }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Olá, {demoUser.name}</h2>
              <p className="text-muted-foreground">Acompanhe o progresso de {childInfo.name}</p>
              <p className="text-sm text-blue-600">{childInfo.class} - Próxima aula: {childInfo.nextClass}</p>
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
            <div className="text-2xl font-bold text-green-600">{childInfo.currentGrade}</div>
            <p className="text-xs text-green-600">Excelente desempenho!</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Frequência</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{childInfo.attendance}%</div>
            <p className="text-xs text-green-600">Muito boa!</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Turma</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{childInfo.class}</div>
            <p className="text-xs text-muted-foreground">Ensino Fundamental</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Comunicados</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{schoolCommunications.length}</div>
            <p className="text-xs text-orange-600">Não lidos</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Notas Recentes de {childInfo.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentGrades.map((grade, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{grade.subject}</p>
                    <p className="text-sm text-muted-foreground">{grade.type} - {grade.date}</p>
                  </div>
                  <Badge variant={grade.grade >= 9 ? 'default' : grade.grade >= 7 ? 'secondary' : 'destructive'}>
                    {grade.grade}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Comunicados da Escola
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {schoolCommunications.map((comm, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{comm.title}</p>
                    <p className="text-sm text-muted-foreground">{comm.date} às {comm.time}</p>
                  </div>
                  <Badge variant="outline">
                    {comm.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Horário Semanal de {childInfo.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {weekSchedule.map((day, index) => (
              <div key={index} className="space-y-2">
                <h4 className="font-medium text-center">{day.day}</h4>
                <div className="space-y-1">
                  {day.subjects.map((subject, subIndex) => (
                    <div key={subIndex} className="p-2 bg-muted/50 rounded text-center text-sm">
                      {subject}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col gap-2">
              <BookOpen className="h-6 w-6" />
              <span className="text-sm">Boletim</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Calendar className="h-6 w-6" />
              <span className="text-sm">Frequência</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <MessageSquare className="h-6 w-6" />
              <span className="text-sm">Mensagens</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <FileText className="h-6 w-6" />
              <span className="text-sm">Declarações</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
