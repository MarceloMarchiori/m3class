
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Shield, Mail, Phone, Briefcase } from 'lucide-react';

interface StaffListModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const StaffListModal: React.FC<StaffListModalProps> = ({ open, onOpenChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const mockStaff = [
    {
      id: '1',
      name: 'Maria Santos',
      position: 'Secretária Escolar',
      department: 'Secretaria',
      email: 'maria.santos@escola.com',
      phone: '(11) 98765-4321',
      experience: '5 anos',
      status: 'Ativo'
    },
    {
      id: '2',
      name: 'João Silva',
      position: 'Coordenador Pedagógico',
      department: 'Coordenação',
      email: 'joao.silva@escola.com',
      phone: '(11) 99999-9999',
      experience: '10 anos',
      status: 'Ativo'
    },
    {
      id: '3',
      name: 'Ana Costa',
      position: 'Auxiliar de Limpeza',
      department: 'Serviços Gerais',
      email: 'ana.costa@escola.com',
      phone: '(11) 88888-8888',
      experience: '3 anos',
      status: 'Ativo'
    },
    {
      id: '4',
      name: 'Carlos Oliveira',
      position: 'Porteiro',
      department: 'Segurança',
      email: 'carlos.oliveira@escola.com',
      phone: '(11) 77777-7777',
      experience: '7 anos',
      status: 'Ativo'
    },
    {
      id: '5',
      name: 'Fernanda Lima',
      position: 'Merendeira',
      department: 'Cantina',
      email: 'fernanda.lima@escola.com',
      phone: '(11) 66666-6666',
      experience: '4 anos',
      status: 'Ativo'
    }
  ].sort((a, b) => a.name.localeCompare(b.name));

  const filteredStaff = mockStaff.filter(staff =>
    staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Lista de Funcionários ({mockStaff.length} funcionários)
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, cargo ou departamento..."
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
            {filteredStaff.map((staff) => (
              <Card key={staff.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Shield className="h-5 w-5 text-purple-600" />
                      </div>
                      <div className="space-y-2">
                        <div>
                          <h4 className="font-semibold text-lg">{staff.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {staff.position} • {staff.experience} de experiência
                          </p>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Briefcase className="h-3 w-3" />
                            <span className="font-medium">Departamento:</span>
                            <Badge variant="secondary" className="text-xs">
                              {staff.department}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Mail className="h-3 w-3" />
                              {staff.email}
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-3 w-3" />
                              {staff.phone}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="default">{staff.status}</Badge>
                      <Button size="sm" variant="outline">
                        Ver Perfil
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredStaff.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Nenhum funcionário encontrado com esse termo de busca.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
