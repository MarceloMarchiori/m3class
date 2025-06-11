
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, TrendingUp, Calendar, GraduationCap } from 'lucide-react';

interface StudentDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const StudentDetailsModal: React.FC<StudentDetailsModalProps> = ({ open, onOpenChange }) => {
  const studentsByGrade = [
    { grade: '1º Ano A', count: 28, capacity: 30 },
    { grade: '1º Ano B', count: 26, capacity: 30 },
    { grade: '2º Ano A', count: 29, capacity: 30 },
    { grade: '3º Ano A', count: 27, capacity: 30 },
    { grade: '4º Ano A', count: 25, capacity: 30 },
    { grade: '5º Ano A', count: 30, capacity: 30 },
  ];

  const recentEnrollments = [
    { name: 'João Silva', grade: '3º Ano A', date: '2025-01-08' },
    { name: 'Maria Santos', grade: '1º Ano B', date: '2025-01-09' },
    { name: 'Pedro Costa', grade: '4º Ano A', date: '2025-01-10' },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Detalhes dos Alunos
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Resumo Geral */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total de Alunos</p>
                    <p className="text-2xl font-bold">847</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Matrículas Este Mês</p>
                    <p className="text-2xl font-bold text-green-600">12</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Taxa de Ocupação</p>
                    <p className="text-2xl font-bold text-purple-600">94%</p>
                  </div>
                  <GraduationCap className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alunos por Turma */}
          <Card>
            <CardHeader>
              <CardTitle>Distribuição por Turma</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {studentsByGrade.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <GraduationCap className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{item.grade}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.count} de {item.capacity} vagas
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(item.count / item.capacity) * 100}%` }}
                        />
                      </div>
                      <Badge variant={item.count === item.capacity ? "destructive" : "default"}>
                        {Math.round((item.count / item.capacity) * 100)}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Matrículas Recentes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Matrículas Recentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentEnrollments.map((enrollment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{enrollment.name}</p>
                      <p className="text-sm text-muted-foreground">Turma: {enrollment.grade}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {new Date(enrollment.date).toLocaleDateString('pt-BR')}
                      </p>
                      <Badge variant="secondary">Nova</Badge>
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
