
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  TrendingUp, 
  Calendar,
  MessageSquare,
  FileText,
  Settings,
  Building,
  Clock
} from 'lucide-react';

interface DirectorDashboardProps {
  demoUser: {
    name: string;
    email: string;
    userType: string;
  };
}

export const DirectorDashboard: React.FC<DirectorDashboardProps> = ({ demoUser }) => {
  const [newStudent, setNewStudent] = useState({ name: '', class: '', parent: '' });
  const [newTeacher, setNewTeacher] = useState({ name: '', subject: '', email: '' });
  const [newClass, setNewClass] = useState({ name: '', teacher: '', students: '' });
  const [newMessage, setNewMessage] = useState({ title: '', content: '', target: '' });

  const schoolStats = {
    totalStudents: 847,
    totalTeachers: 42,
    totalClasses: 28,
    averageGrade: 8.2,
    attendance: 94.5,
    pendingDocuments: 12
  };

  const recentActivities = [
    { type: 'enrollment', description: 'Nova matrícula: João Silva (3º Ano A)', time: '2 horas atrás' },
    { type: 'grade', description: 'Notas lançadas pela Prof. Maria (Matemática)', time: '4 horas atrás' },
    { type: 'attendance', description: 'Relatório de frequência semanal gerado', time: '1 dia atrás' },
    { type: 'message', description: 'Comunicado enviado para pais do 5º ano', time: '2 dias atrás' }
  ];

  const pendingTasks = [
    { task: 'Aprovar transferência de Ana Costa', priority: 'alta', deadline: 'Hoje' },
    { task: 'Revisar relatório trimestral', priority: 'média', deadline: 'Amanhã' },
    { task: 'Reunião com coordenadores', priority: 'alta', deadline: 'Sexta-feira' },
    { task: 'Análise do orçamento mensal', priority: 'baixa', deadline: 'Próxima semana' }
  ];

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Novo aluno:', newStudent);
    setNewStudent({ name: '', class: '', parent: '' });
  };

  const handleTeacherSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Novo professor:', newTeacher);
    setNewTeacher({ name: '', subject: '', email: '' });
  };

  const handleClassSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Nova turma:', newClass);
    setNewClass({ name: '', teacher: '', students: '' });
  };

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Novo comunicado:', newMessage);
    setNewMessage({ title: '', content: '', target: '' });
  };

  return (
    <div className="space-y-6">
      {/* Header com informações do diretor */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Building className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Bem-vindo, {demoUser.name}</h2>
              <p className="text-muted-foreground">Diretor(a) - Escola Municipal Santos Dumont</p>
              <p className="text-sm text-blue-600">Último acesso: Hoje às 08:30</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ações rápidas - Movido para o topo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Ações Rápidas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="h-20 flex flex-col gap-2">
                  <Users className="h-6 w-6" />
                  <span className="text-sm">Gerenciar Alunos</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Cadastrar Novo Aluno</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleStudentSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="student-name">Nome do Aluno</Label>
                    <Input
                      id="student-name"
                      value={newStudent.name}
                      onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                      placeholder="Nome completo"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student-class">Turma</Label>
                    <Select value={newStudent.class} onValueChange={(value) => setNewStudent({ ...newStudent, class: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a turma" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1a">1º Ano A</SelectItem>
                        <SelectItem value="1b">1º Ano B</SelectItem>
                        <SelectItem value="2a">2º Ano A</SelectItem>
                        <SelectItem value="3a">3º Ano A</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student-parent">Nome do Responsável</Label>
                    <Input
                      id="student-parent"
                      value={newStudent.parent}
                      onChange={(e) => setNewStudent({ ...newStudent, parent: e.target.value })}
                      placeholder="Nome do responsável"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">Cadastrar Aluno</Button>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <GraduationCap className="h-6 w-6" />
                  <span className="text-sm">Professores</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Cadastrar Novo Professor</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleTeacherSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="teacher-name">Nome do Professor</Label>
                    <Input
                      id="teacher-name"
                      value={newTeacher.name}
                      onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                      placeholder="Nome completo"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="teacher-subject">Matéria</Label>
                    <Select value={newTeacher.subject} onValueChange={(value) => setNewTeacher({ ...newTeacher, subject: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a matéria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="matematica">Matemática</SelectItem>
                        <SelectItem value="portugues">Português</SelectItem>
                        <SelectItem value="ciencias">Ciências</SelectItem>
                        <SelectItem value="historia">História</SelectItem>
                        <SelectItem value="geografia">Geografia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="teacher-email">Email</Label>
                    <Input
                      id="teacher-email"
                      type="email"
                      value={newTeacher.email}
                      onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                      placeholder="email@escola.com"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">Cadastrar Professor</Button>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <BookOpen className="h-6 w-6" />
                  <span className="text-sm">Turmas</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Criar Nova Turma</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleClassSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="class-name">Nome da Turma</Label>
                    <Input
                      id="class-name"
                      value={newClass.name}
                      onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                      placeholder="Ex: 5º Ano A"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="class-teacher">Professor Responsável</Label>
                    <Select value={newClass.teacher} onValueChange={(value) => setNewClass({ ...newClass, teacher: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o professor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="maria">Prof. Maria Silva</SelectItem>
                        <SelectItem value="joao">Prof. João Santos</SelectItem>
                        <SelectItem value="ana">Prof. Ana Costa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="class-students">Número de Alunos</Label>
                    <Input
                      id="class-students"
                      type="number"
                      value={newClass.students}
                      onChange={(e) => setNewClass({ ...newClass, students: e.target.value })}
                      placeholder="25"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">Criar Turma</Button>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <MessageSquare className="h-6 w-6" />
                  <span className="text-sm">Comunicados</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Enviar Comunicado</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleMessageSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="message-title">Título</Label>
                    <Input
                      id="message-title"
                      value={newMessage.title}
                      onChange={(e) => setNewMessage({ ...newMessage, title: e.target.value })}
                      placeholder="Título do comunicado"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message-target">Destinatário</Label>
                    <Select value={newMessage.target} onValueChange={(value) => setNewMessage({ ...newMessage, target: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o destinatário" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os Pais</SelectItem>
                        <SelectItem value="teachers">Professores</SelectItem>
                        <SelectItem value="class">Turma Específica</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message-content">Conteúdo</Label>
                    <Textarea
                      id="message-content"
                      value={newMessage.content}
                      onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                      placeholder="Digite o conteúdo do comunicado..."
                      rows={4}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">Enviar Comunicado</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Alunos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{schoolStats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">+12 novos este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Professores</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{schoolStats.totalTeachers}</div>
            <p className="text-xs text-muted-foreground">Corpo docente ativo</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Turmas Ativas</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{schoolStats.totalClasses}</div>
            <p className="text-xs text-muted-foreground">Educação Infantil ao 9º ano</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Média Geral</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{schoolStats.averageGrade}</div>
            <p className="text-xs text-green-600">+0.3 pontos vs. trimestre anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Frequência</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{schoolStats.attendance}%</div>
            <p className="text-xs text-green-600">Acima da meta (90%)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendências</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{schoolStats.pendingDocuments}</div>
            <p className="text-xs text-orange-600">Documentos para análise</p>
          </CardContent>
        </Card>
      </div>

      {/* Dashboard principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Atividades recentes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Atividades Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50">
                  <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                    {activity.type === 'enrollment' && <Users className="h-4 w-4 text-blue-600" />}
                    {activity.type === 'grade' && <BookOpen className="h-4 w-4 text-green-600" />}
                    {activity.type === 'attendance' && <Calendar className="h-4 w-4 text-purple-600" />}
                    {activity.type === 'message' && <MessageSquare className="h-4 w-4 text-orange-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tarefas pendentes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Tarefas Pendentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingTasks.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.task}</p>
                    <p className="text-xs text-muted-foreground">Prazo: {item.deadline}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={
                        item.priority === 'alta' ? 'destructive' : 
                        item.priority === 'média' ? 'default' : 'secondary'
                      }
                      className="text-xs"
                    >
                      {item.priority}
                    </Badge>
                    <Button variant="outline" size="sm">
                      Ver
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
