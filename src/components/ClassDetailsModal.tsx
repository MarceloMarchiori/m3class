
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Users, Clock, Calendar } from 'lucide-react';

interface ClassDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ClassDetailsModal: React.FC<ClassDetailsModalProps> = ({ open, onOpenChange }) => {
  const classes = [
    { 
      name: '1º Ano A', 
      students: 28, 
      capacity: 30, 
      teacher: 'Prof. Ana Silva',
      subjects: ['Português', 'Matemática', 'Ciências'],
      schedule: 'Manhã (07:30 - 11:30)',
      status: 'Ativa'
    },
    { 
      name: '1º Ano B', 
      students: 26, 
      capacity: 30, 
      teacher: 'Prof. Carlos Santos',
      subjects: ['Português', 'Matemática', 'Ciências'],
      schedule: 'Tarde (13:00 - 17:00)',
      status: 'Ativa'
    },
    { 
      name: '2º Ano A', 
      students: 29, 
      capacity: 30, 
      teacher: 'Prof. Maria Costa',
      subjects: ['Português', 'Matemática', 'História', 'Geografia'],
      schedule: 'Manhã (07:30 - 11:30)',
      status: 'Ativa'
    },
    { 
      name: '3º Ano A', 
      students: 27, 
      capacity: 30, 
      teacher: 'Prof. João Oliveira',
      subjects: ['Português', 'Matemática', 'História', 'Geografia', 'Ciências'],
      schedule: 'Tarde (13:00 - 17:00)',
      status: 'Ativa'
    },
  ];

  const scheduleStats = [
    { period: 'Manhã (07:30 - 11:30)', classes: 14, students: 392 },
    { period: 'Tarde (13:00 - 17:00)', classes: 12, students: 336 },
    { period: 'Integral', classes: 2, students: 119 },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Detalhes das Turmas
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Resumo por Período */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {scheduleStats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.period}</p>
                      <p className="text-lg font-bold">{stat.classes} turmas</p>
                      <p className="text-xs text-muted-foreground">{stat.students} alunos</p>
                    </div>
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Lista de Turmas */}
          <Card>
            <CardHeader>
              <CardTitle>Turmas Ativas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {classes.map((classItem, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-purple-100 rounded-lg">
                          <BookOpen className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{classItem.name}</h3>
                          <p className="text-sm text-muted-foreground">{classItem.teacher}</p>
                        </div>
                      </div>
                      <Badge variant="default">{classItem.status}</Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">
                          {classItem.students}/{classItem.capacity} alunos
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-green-600" />
                        <span className="text-sm">{classItem.schedule}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-purple-600" />
                        <span className="text-sm">{classItem.subjects.length} disciplinas</span>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Disciplinas:</p>
                      <div className="flex flex-wrap gap-1">
                        {classItem.subjects.map((subject, subIndex) => (
                          <Badge key={subIndex} variant="secondary" className="text-xs">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(classItem.students / classItem.capacity) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Ocupação: {Math.round((classItem.students / classItem.capacity) * 100)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Estatísticas Gerais */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total de Turmas</p>
                    <p className="text-2xl font-bold">28</p>
                  </div>
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Média por Turma</p>
                    <p className="text-2xl font-bold">30</p>
                  </div>
                  <Users className="h-6 w-6 text-green-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Taxa Ocupação</p>
                    <p className="text-2xl font-bold text-purple-600">94%</p>
                  </div>
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Vagas Livres</p>
                    <p className="text-2xl font-bold text-orange-600">57</p>
                  </div>
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
