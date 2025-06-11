
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, GraduationCap, Mail, Phone, BookOpen } from 'lucide-react';

interface TeacherListModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TeacherListModal: React.FC<TeacherListModalProps> = ({ open, onOpenChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const mockTeachers = [
    {
      id: '1',
      name: 'Prof. Ana Carolina Silva',
      subjects: ['Matemática', 'Física'],
      classes: ['8º A', '9º B', '1º EM'],
      email: 'ana.silva@escola.com',
      phone: '(11) 98765-4321',
      experience: '8 anos',
      status: 'Ativo'
    },
    {
      id: '2',
      name: 'Prof. Bruno Santos',
      subjects: ['História', 'Geografia'],
      classes: ['6º A', '7º B'],
      email: 'bruno.santos@escola.com',
      phone: '(11) 99999-9999',
      experience: '12 anos',
      status: 'Ativo'
    },
    {
      id: '3',
      name: 'Prof. Carla Oliveira',
      subjects: ['Português', 'Literatura'],
      classes: ['5º A', '5º B', '6º C'],
      email: 'carla.oliveira@escola.com',
      phone: '(11) 88888-8888',
      experience: '15 anos',
      status: 'Ativo'
    },
    {
      id: '4',
      name: 'Prof. Daniel Costa',
      subjects: ['Educação Física'],
      classes: ['Todas as turmas'],
      email: 'daniel.costa@escola.com',
      phone: '(11) 77777-7777',
      experience: '6 anos',
      status: 'Ativo'
    }
  ].sort((a, b) => a.name.localeCompare(b.name));

  const filteredTeachers = mockTeachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
    teacher.classes.some(cls => cls.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Lista de Professores ({mockTeachers.length} professores)
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, matéria ou turma..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button>
              Exportar Lista
            </Button>
          </div>

          <div className="overflow-y-auto max-h-[50vh] space-y-3">
            {filteredTeachers.map((teacher) => (
              <Card key={teacher.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <GraduationCap className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="space-y-2">
                        <div>
                          <h4 className="font-semibold text-lg">{teacher.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {teacher.experience} de experiência
                          </p>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <BookOpen className="h-3 w-3" />
                            <span className="font-medium">Matérias:</span>
                            <div className="flex gap-1">
                              {teacher.subjects.map((subject, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {subject}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Mail className="h-3 w-3" />
                              {teacher.email}
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-3 w-3" />
                              {teacher.phone}
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <span className="font-medium">Turmas:</span> {teacher.classes.join(', ')}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="default">{teacher.status}</Badge>
                      <Button size="sm" variant="outline">
                        Ver Perfil
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTeachers.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Nenhum professor encontrado com esse termo de busca.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
