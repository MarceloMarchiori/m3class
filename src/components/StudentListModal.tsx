
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, User, Phone, Mail, MapPin } from 'lucide-react';

interface StudentListModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const StudentListModal: React.FC<StudentListModalProps> = ({ open, onOpenChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const mockStudents = [
    {
      id: '1',
      name: 'Ana Beatriz Costa',
      grade: '3º Ano A',
      age: 8,
      parentName: 'Carlos Costa',
      email: 'carlos.costa@email.com',
      phone: '(11) 98765-4321',
      address: 'Rua das Flores, 123',
      status: 'Ativo'
    },
    {
      id: '2',
      name: 'Bruno Silva Santos',
      grade: '5º Ano B',
      age: 10,
      parentName: 'Maria Silva Santos',
      email: 'maria.silva@email.com',
      phone: '(11) 99999-9999',
      address: 'Av. Principal, 456',
      status: 'Ativo'
    },
    {
      id: '3',
      name: 'Carolina Oliveira',
      grade: '2º Ano A',
      age: 7,
      parentName: 'João Oliveira',
      email: 'joao.oliveira@email.com',
      phone: '(11) 88888-8888',
      address: 'Rua do Sol, 789',
      status: 'Ativo'
    },
    {
      id: '4',
      name: 'Daniel Souza',
      grade: '4º Ano C',
      age: 9,
      parentName: 'Fernanda Souza',
      email: 'fernanda.souza@email.com',
      phone: '(11) 77777-7777',
      address: 'Rua da Lua, 321',
      status: 'Ativo'
    }
  ].sort((a, b) => a.name.localeCompare(b.name));

  const filteredStudents = mockStudents.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.parentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Lista de Alunos ({mockStudents.length} alunos)
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, turma ou responsável..."
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
            {filteredStudents.map((student) => (
              <Card key={student.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="space-y-2">
                        <div>
                          <h4 className="font-semibold text-lg">{student.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {student.grade} • {student.age} anos
                          </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <User className="h-3 w-3" />
                            Responsável: {student.parentName}
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="h-3 w-3" />
                            {student.email}
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-3 w-3" />
                            {student.phone}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-3 w-3" />
                            {student.address}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="default">{student.status}</Badge>
                      <Button size="sm" variant="outline">
                        Ver Perfil
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Nenhum aluno encontrado com esse termo de busca.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
