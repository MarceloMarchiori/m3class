
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { UserPlus, User, GraduationCap, Shield } from 'lucide-react';

interface UserCreationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const UserCreationModal: React.FC<UserCreationModalProps> = ({ open, onOpenChange }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('student');
  
  const [studentData, setStudentData] = useState({
    name: '',
    birthDate: '',
    parentName: '',
    email: '',
    phone: '',
    address: '',
    grade: ''
  });

  const [teacherData, setTeacherData] = useState({
    name: '',
    email: '',
    phone: '',
    subjects: '',
    experience: '',
    qualification: ''
  });

  const [staffData, setStaffData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    startDate: ''
  });

  const handleCreateStudent = () => {
    toast({
      title: "Aluno cadastrado com sucesso!",
      description: `${studentData.name} foi adicionado à turma ${studentData.grade}`,
    });
    
    setStudentData({
      name: '',
      birthDate: '',
      parentName: '',
      email: '',
      phone: '',
      address: '',
      grade: ''
    });
    
    onOpenChange(false);
  };

  const handleCreateTeacher = () => {
    toast({
      title: "Professor cadastrado com sucesso!",
      description: `${teacherData.name} foi adicionado ao corpo docente`,
    });
    
    setTeacherData({
      name: '',
      email: '',
      phone: '',
      subjects: '',
      experience: '',
      qualification: ''
    });
    
    onOpenChange(false);
  };

  const handleCreateStaff = () => {
    toast({
      title: "Funcionário cadastrado com sucesso!",
      description: `${staffData.name} foi adicionado como ${staffData.position}`,
    });
    
    setStaffData({
      name: '',
      email: '',
      phone: '',
      position: '',
      department: '',
      startDate: ''
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Cadastrar Novo Usuário
          </DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="student" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Aluno
            </TabsTrigger>
            <TabsTrigger value="teacher" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Professor
            </TabsTrigger>
            <TabsTrigger value="staff" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Funcionário
            </TabsTrigger>
          </TabsList>

          <TabsContent value="student" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="studentName">Nome do Aluno</Label>
                <Input
                  id="studentName"
                  value={studentData.name}
                  onChange={(e) => setStudentData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="birthDate">Data de Nascimento</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={studentData.birthDate}
                  onChange={(e) => setStudentData(prev => ({ ...prev, birthDate: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="parentName">Nome do Responsável</Label>
                <Input
                  id="parentName"
                  value={studentData.parentName}
                  onChange={(e) => setStudentData(prev => ({ ...prev, parentName: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={studentData.email}
                  onChange={(e) => setStudentData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={studentData.phone}
                  onChange={(e) => setStudentData(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="grade">Turma</Label>
                <Select value={studentData.grade} onValueChange={(value) => setStudentData(prev => ({ ...prev, grade: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a turma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1ano-a">1º Ano A</SelectItem>
                    <SelectItem value="2ano-a">2º Ano A</SelectItem>
                    <SelectItem value="3ano-a">3º Ano A</SelectItem>
                    <SelectItem value="4ano-a">4º Ano A</SelectItem>
                    <SelectItem value="5ano-a">5º Ano A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="address">Endereço</Label>
              <Input
                id="address"
                value={studentData.address}
                onChange={(e) => setStudentData(prev => ({ ...prev, address: e.target.value }))}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateStudent}>
                Cadastrar Aluno
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="teacher" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="teacherName">Nome do Professor</Label>
                <Input
                  id="teacherName"
                  value={teacherData.name}
                  onChange={(e) => setTeacherData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="teacherEmail">Email</Label>
                <Input
                  id="teacherEmail"
                  type="email"
                  value={teacherData.email}
                  onChange={(e) => setTeacherData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="teacherPhone">Telefone</Label>
                <Input
                  id="teacherPhone"
                  value={teacherData.phone}
                  onChange={(e) => setTeacherData(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="subjects">Matérias (separadas por vírgula)</Label>
                <Input
                  id="subjects"
                  placeholder="Ex: Matemática, Física"
                  value={teacherData.subjects}
                  onChange={(e) => setTeacherData(prev => ({ ...prev, subjects: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="experience">Experiência</Label>
                <Input
                  id="experience"
                  placeholder="Ex: 5 anos"
                  value={teacherData.experience}
                  onChange={(e) => setTeacherData(prev => ({ ...prev, experience: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="qualification">Qualificação</Label>
                <Input
                  id="qualification"
                  placeholder="Ex: Licenciatura em Matemática"
                  value={teacherData.qualification}
                  onChange={(e) => setTeacherData(prev => ({ ...prev, qualification: e.target.value }))}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateTeacher}>
                Cadastrar Professor
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="staff" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="staffName">Nome do Funcionário</Label>
                <Input
                  id="staffName"
                  value={staffData.name}
                  onChange={(e) => setStaffData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="staffEmail">Email</Label>
                <Input
                  id="staffEmail"
                  type="email"
                  value={staffData.email}
                  onChange={(e) => setStaffData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="staffPhone">Telefone</Label>
                <Input
                  id="staffPhone"
                  value={staffData.phone}
                  onChange={(e) => setStaffData(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="position">Cargo</Label>
                <Select value={staffData.position} onValueChange={(value) => setStaffData(prev => ({ ...prev, position: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o cargo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="secretaria">Secretária</SelectItem>
                    <SelectItem value="coordenador">Coordenador</SelectItem>
                    <SelectItem value="auxiliar-limpeza">Auxiliar de Limpeza</SelectItem>
                    <SelectItem value="porteiro">Porteiro</SelectItem>
                    <SelectItem value="merendeira">Merendeira</SelectItem>
                    <SelectItem value="seguranca">Segurança</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="department">Departamento</Label>
                <Select value={staffData.department} onValueChange={(value) => setStaffData(prev => ({ ...prev, department: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="secretaria">Secretaria</SelectItem>
                    <SelectItem value="coordenacao">Coordenação</SelectItem>
                    <SelectItem value="servicos-gerais">Serviços Gerais</SelectItem>
                    <SelectItem value="seguranca">Segurança</SelectItem>
                    <SelectItem value="cantina">Cantina</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="startDate">Data de Início</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={staffData.startDate}
                  onChange={(e) => setStaffData(prev => ({ ...prev, startDate: e.target.value }))}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateStaff}>
                Cadastrar Funcionário
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
