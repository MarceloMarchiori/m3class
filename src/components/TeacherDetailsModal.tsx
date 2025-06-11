
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, BookOpen, Clock, Award } from 'lucide-react';

interface TeacherDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TeacherDetailsModal: React.FC<TeacherDetailsModalProps> = ({ open, onOpenChange }) => {
  const teachers = [
    { 
      name: 'Prof. Maria Silva', 
      subject: 'Matemática', 
      classes: ['5º A', '4º B'], 
      experience: '8 anos',
      status: 'Ativo',
      evaluation: 9.2
    },
    { 
      name: 'Prof. João Santos', 
      subject: 'Português', 
      classes: ['3º A', '3º B'], 
      experience: '12 anos',
      status: 'Ativo',
      evaluation: 9.5
    },
    { 
      name: 'Prof. Ana Costa', 
      subject: 'História', 
      classes: ['4º A', '5º A'], 
      experience: '5 anos',
      status: 'Ativo',
      evaluation: 8.8
    },
    { 
      name: 'Prof. Carlos Oliveira', 
      subject: 'Ciências', 
      classes: ['2º A', '1º B'], 
      experience: '15 anos',
      status: 'Licença',
      evaluation: 9.0
    },
  ];

  const subjectStats = [
    { subject: 'Matemática', teachers: 8, avgEvaluation: 9.1 },
    { subject: 'Português', teachers: 6, avgEvaluation: 9.3 },
    { subject: 'Ciências', teachers: 5, avgEvaluation: 8.9 },
    { subject: 'História', teachers: 4, avgEvaluation: 9.0 },
    { subject: 'Geografia', teachers: 4, avgEvaluation: 8.7 },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Detalhes dos Professores
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Estatísticas Gerais */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="text-2xl font-bold">42</p>
                  </div>
                  <GraduationCap className="h-6 w-6 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avaliação Média</p>
                    <p className="text-2xl font-bold text-green-600">9.1</p>
                  </div>
                  <Award className="h-6 w-6 text-green-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Em Atividade</p>
                    <p className="text-2xl font-bold text-purple-600">39</p>
                  </div>
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Disciplinas</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                  <BookOpen className="h-6 w-6 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lista de Professores */}
          <Card>
            <CardHeader>
              <CardTitle>Corpo Docente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {teachers.map((teacher, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <GraduationCap className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{teacher.name}</p>
                        <p className="text-sm text-muted-foreground">{teacher.subject}</p>
                        <p className="text-xs text-muted-foreground">
                          Turmas: {teacher.classes.join(', ')} • {teacher.experience}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-sm font-medium">Avaliação: {teacher.evaluation}</p>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <div 
                              key={i} 
                              className={`w-2 h-2 rounded-full ${
                                i < Math.floor(teacher.evaluation / 2) ? 'bg-yellow-400' : 'bg-gray-200'
                              }`} 
                            />
                          ))}
                        </div>
                      </div>
                      <Badge variant={teacher.status === 'Ativo' ? 'default' : 'secondary'}>
                        {teacher.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Estatísticas por Disciplina */}
          <Card>
            <CardHeader>
              <CardTitle>Distribuição por Disciplina</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {subjectStats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <BookOpen className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">{stat.subject}</p>
                        <p className="text-sm text-muted-foreground">{stat.teachers} professores</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">Média: {stat.avgEvaluation}</p>
                      <Badge variant="outline">{stat.teachers} prof.</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
