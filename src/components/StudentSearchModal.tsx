
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, User, Calendar, Phone, Mail } from 'lucide-react';

interface StudentSearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const StudentSearchModal: React.FC<StudentSearchModalProps> = ({ open, onOpenChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const mockStudents = [
    {
      id: '1',
      name: 'João Silva Santos',
      grade: '5º Ano A',
      parentName: 'Maria Silva Santos',
      email: 'maria.silva@email.com',
      phone: '(11) 99999-9999',
      enrollmentDate: '2024-02-15',
      status: 'Ativo'
    },
    {
      id: '2',
      name: 'Ana Beatriz Costa',
      grade: '3º Ano B',
      parentName: 'Carlos Costa',
      email: 'carlos.costa@email.com',
      phone: '(11) 88888-8888',
      enrollmentDate: '2024-01-20',
      status: 'Ativo'
    }
  ];

  const handleSearch = () => {
    if (searchTerm.trim()) {
      const results = mockStudents.filter(student => 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.parentName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Buscar Aluno
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="search">Nome do aluno ou responsável</Label>
              <Input
                id="search"
                placeholder="Digite o nome para buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch} className="mt-6">
              <Search className="h-4 w-4 mr-2" />
              Buscar
            </Button>
          </div>

          {searchResults.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold">Resultados da busca:</h3>
              {searchResults.map((student) => (
                <Card key={student.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-semibold">{student.name}</h4>
                          <p className="text-sm text-muted-foreground">Turma: {student.grade}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {student.parentName}
                            </span>
                            <span className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {student.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {student.phone}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <Calendar className="h-3 w-3" />
                            Matrícula: {new Date(student.enrollmentDate).toLocaleDateString('pt-BR')}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="default">{student.status}</Badge>
                        <Button size="sm" variant="outline">
                          Ver Detalhes
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {searchTerm && searchResults.length === 0 && (
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
