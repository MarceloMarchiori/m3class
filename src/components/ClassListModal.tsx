
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, BookOpen, Users, Clock, Calendar } from 'lucide-react';

interface ClassListModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ClassListModal: React.FC<ClassListModalProps> = ({ open, onOpenChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const mockClasses = [
    {
      id: '1',
      name: '8º Ano A',
      subject: 'Matemática',
      students: 28,
      schedule: 'Segunda e Quarta - 08:00',
      nextClass: '2025-01-13 08:00',
      status: 'Ativa',
      room: 'Sala 201'
    },
    {
      id: '2',
      name: '9º Ano B',
      subject: 'Física',
      students: 25,
      schedule: 'Terça e Quinta - 09:30',
      nextClass: '2025-01-14 09:30',
      status: 'Ativa',
      room: 'Laboratório'
    },
    {
      id: '3',
      name: '7º Ano C',
      subject: 'Matemática',
      students: 30,
      schedule: 'Segunda e Sexta - 11:00',
      nextClass: '2025-01-13 11:00',
      status: 'Ativa',
      room: 'Sala 105'
    },
    {
      id: '4',
      name: '8º Ano B',
      subject: 'Física',
      students: 27,
      schedule: 'Quarta e Sexta - 14:00',
      nextClass: '2025-01-15 14:00',
      status: 'Ativa',
      room: 'Laboratório'
    },
    {
      id: '5',
      name: '6º Ano A',
      subject: 'Matemática',
      students: 32,
      schedule: 'Terça e Quinta - 15:30',
      nextClass: '2025-01-14 15:30',
      status: 'Ativa',
      room: 'Sala 103'
    }
  ];

  const filteredClasses = mockClasses.filter(cls =>
    cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.room.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Minhas Turmas ({mockClasses.length} turmas ativas)
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por turma, matéria ou sala..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button>
              Exportar Relatório
            </Button>
          </div>

          <div className="overflow-y-auto max-h-[50vh] space-y-3">
            {filteredClasses.map((cls) => (
              <Card key={cls.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <BookOpen className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="space-y-2">
                        <div>
                          <h4 className="font-semibold text-lg">{cls.name} - {cls.subject}</h4>
                          <p className="text-sm text-muted-foreground">
                            Sala: {cls.room}
                          </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Users className="h-3 w-3" />
                            {cls.students} alunos matriculados
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-3 w-3" />
                            {cls.schedule}
                          </div>
                          <div className="flex items-center gap-2 col-span-2">
                            <Calendar className="h-3 w-3" />
                            Próxima aula: {new Date(cls.nextClass).toLocaleString('pt-BR')}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="default">{cls.status}</Badge>
                      <div className="flex flex-col gap-1">
                        <Button size="sm" variant="outline">
                          Ver Alunos
                        </Button>
                        <Button size="sm">
                          Fazer Chamada
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredClasses.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Nenhuma turma encontrada com esse termo de busca.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
