
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, BookOpen, Users, CheckCircle, AlertCircle } from 'lucide-react';

interface LessonDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LessonDetailsModal: React.FC<LessonDetailsModalProps> = ({ open, onOpenChange }) => {
  const mockLessons = [
    {
      id: '1',
      subject: 'Matemática',
      class: '8º A',
      time: '08:00 - 08:45',
      date: '2025-01-13',
      topic: 'Equações do 2º grau',
      room: 'Sala 201',
      students: 28,
      attendance: 26,
      status: 'Agendada'
    },
    {
      id: '2',
      subject: 'Física',
      class: '9º B',
      time: '09:30 - 10:15',
      date: '2025-01-13',
      topic: 'Leis de Newton',
      room: 'Laboratório',
      students: 25,
      attendance: 25,
      status: 'Em andamento'
    },
    {
      id: '3',
      subject: 'Matemática',
      class: '7º C',
      time: '11:00 - 11:45',
      date: '2025-01-13',
      topic: 'Frações equivalentes',
      room: 'Sala 105',
      students: 30,
      attendance: 28,
      status: 'Agendada'
    },
    {
      id: '4',
      subject: 'Física',
      class: '8º B',
      time: '14:00 - 14:45',
      date: '2025-01-13',
      topic: 'Movimento uniforme',
      room: 'Laboratório',
      students: 27,
      attendance: null,
      status: 'Agendada'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Em andamento': return 'bg-green-100 text-green-800';
      case 'Concluída': return 'bg-blue-100 text-blue-800';
      case 'Agendada': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelada': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Em andamento': return <Clock className="h-4 w-4" />;
      case 'Concluída': return <CheckCircle className="h-4 w-4" />;
      case 'Agendada': return <Calendar className="h-4 w-4" />;
      case 'Cancelada': return <AlertCircle className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const calculateAttendanceRate = (attendance: number | null, total: number) => {
    if (attendance === null) return null;
    return Math.round((attendance / total) * 100);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Aulas de Hoje ({mockLessons.length} aulas programadas)
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {mockLessons.filter(l => l.status === 'Em andamento').length}
                </div>
                <div className="text-sm text-green-700">Em Andamento</div>
              </CardContent>
            </Card>
            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {mockLessons.filter(l => l.status === 'Agendada').length}
                </div>
                <div className="text-sm text-yellow-700">Agendadas</div>
              </CardContent>
            </Card>
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {mockLessons.filter(l => l.status === 'Concluída').length}
                </div>
                <div className="text-sm text-blue-700">Concluídas</div>
              </CardContent>
            </Card>
          </div>

          <div className="overflow-y-auto max-h-[50vh] space-y-3">
            {mockLessons.map((lesson) => {
              const attendanceRate = calculateAttendanceRate(lesson.attendance, lesson.students);
              
              return (
                <Card key={lesson.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <BookOpen className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="space-y-2 flex-1">
                          <div>
                            <h4 className="font-semibold text-lg">
                              {lesson.subject} - {lesson.class}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {lesson.topic}
                            </p>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {lesson.time}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {lesson.room}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {lesson.students} alunos
                            </div>
                            {lesson.attendance !== null && (
                              <div className="flex items-center gap-1">
                                <CheckCircle className="h-3 w-3" />
                                {lesson.attendance}/{lesson.students} presentes ({attendanceRate}%)
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Badge className={getStatusColor(lesson.status)}>
                              <div className="flex items-center gap-1">
                                {getStatusIcon(lesson.status)}
                                {lesson.status}
                              </div>
                            </Badge>
                            {attendanceRate !== null && attendanceRate < 80 && (
                              <Badge variant="destructive">
                                Baixa frequência
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        {lesson.status === 'Agendada' && (
                          <>
                            <Button size="sm" variant="outline">
                              Fazer Chamada
                            </Button>
                            <Button size="sm">
                              Iniciar Aula
                            </Button>
                          </>
                        )}
                        {lesson.status === 'Em andamento' && (
                          <Button size="sm" variant="destructive">
                            Finalizar Aula
                          </Button>
                        )}
                        {lesson.status === 'Concluída' && (
                          <Button size="sm" variant="outline">
                            Ver Relatório
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
