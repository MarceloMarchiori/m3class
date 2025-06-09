import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Users, Calendar, Clock, Building, Phone, Mail } from 'lucide-react';

interface SecretaryDashboardProps {
  demoUser: {
    name: string;
    email: string;
    userType: string;
  };
}

export const SecretaryDashboard: React.FC<SecretaryDashboardProps> = ({ demoUser }) => {
  const [studentName, setStudentName] = useState('');
  const [parentName, setParentName] = useState('');
  const [declarationType, setDeclarationType] = useState('');
  const [appointmentPerson, setAppointmentPerson] = useState('');
  const [appointmentReason, setAppointmentReason] = useState('');
  const [messageContent, setMessageContent] = useState('');

  const stats = {
    pendingEnrollments: 15,
    documentsToProcess: 23,
    todayAppointments: 8,
    phoneCallsToday: 12
  };

  const pendingTasks = [
    { task: 'Processar matrícula de João Silva', priority: 'alta', deadline: 'Hoje' },
    { task: 'Emitir declaração para Maria Santos', priority: 'média', deadline: 'Amanhã' },
    { task: 'Organizar arquivo de transferências', priority: 'baixa', deadline: 'Sexta-feira' },
    { task: 'Atualizar dados no sistema', priority: 'média', deadline: 'Segunda-feira' }
  ];

  const todayAppointments = [
    { time: '09:00', person: 'Ana Costa (Mãe)', reason: 'Matrícula novo aluno', type: 'enrollment' },
    { time: '10:30', person: 'Carlos Silva (Pai)', reason: 'Declaração escolar', type: 'document' },
    { time: '14:00', person: 'Diretor Municipal', reason: 'Relatório mensal', type: 'meeting' },
    { time: '15:30', person: 'Empresa Transporte', reason: 'Renovação contrato', type: 'business' }
  ];

  const handleEnrollmentSubmit = () => {
    console.log('Nova matrícula:', { studentName, parentName });
    setStudentName('');
    setParentName('');
  };

  const handleDeclarationSubmit = () => {
    console.log('Declaração gerada:', { type: declarationType, student: studentName });
    setDeclarationType('');
    setStudentName('');
  };

  const handleAppointmentSubmit = () => {
    console.log('Agendamento criado:', { person: appointmentPerson, reason: appointmentReason });
    setAppointmentPerson('');
    setAppointmentReason('');
  };

  const handleMessageSubmit = () => {
    console.log('Comunicado enviado:', messageContent);
    setMessageContent('');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-100 rounded-full">
              <Building className="h-8 w-8 text-orange-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Bom dia, {demoUser.name}</h2>
              <p className="text-muted-foreground">Secretária Escolar</p>
              <p className="text-sm text-orange-600">Você tem {stats.todayAppointments} agendamentos hoje</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ações Rápidas - Movido para o topo */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="h-20 flex flex-col gap-2">
                  <Users className="h-6 w-6" />
                  <span className="text-sm">Nova Matrícula</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Nova Matrícula</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="student-name">Nome do Aluno</Label>
                    <Input
                      id="student-name"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="Digite o nome completo"
                    />
                  </div>
                  <div>
                    <Label htmlFor="parent-name">Nome do Responsável</Label>
                    <Input
                      id="parent-name"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      placeholder="Digite o nome do responsável"
                    />
                  </div>
                  <div>
                    <Label htmlFor="birth-date">Data de Nascimento</Label>
                    <Input
                      id="birth-date"
                      type="date"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Endereço</Label>
                    <Textarea
                      id="address"
                      placeholder="Digite o endereço completo"
                      rows={2}
                    />
                  </div>
                  <Button onClick={handleEnrollmentSubmit} className="w-full">
                    Processar Matrícula
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <FileText className="h-6 w-6" />
                  <span className="text-sm">Declarações</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Emitir Declaração</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="declaration-student">Nome do Aluno</Label>
                    <Input
                      id="declaration-student"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="Digite o nome do aluno"
                    />
                  </div>
                  <div>
                    <Label htmlFor="declaration-type">Tipo de Declaração</Label>
                    <select 
                      className="w-full p-2 border rounded-md"
                      value={declarationType}
                      onChange={(e) => setDeclarationType(e.target.value)}
                    >
                      <option value="">Selecione o tipo</option>
                      <option value="matricula">Declaração de Matrícula</option>
                      <option value="frequencia">Declaração de Frequência</option>
                      <option value="transferencia">Declaração de Transferência</option>
                      <option value="conclusao">Declaração de Conclusão</option>
                    </select>
                  </div>
                  <Button onClick={handleDeclarationSubmit} className="w-full">
                    Gerar Declaração
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Calendar className="h-6 w-6" />
                  <span className="text-sm">Agendamentos</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Novo Agendamento</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="appointment-person">Nome da Pessoa</Label>
                    <Input
                      id="appointment-person"
                      value={appointmentPerson}
                      onChange={(e) => setAppointmentPerson(e.target.value)}
                      placeholder="Digite o nome"
                    />
                  </div>
                  <div>
                    <Label htmlFor="appointment-reason">Motivo</Label>
                    <Input
                      id="appointment-reason"
                      value={appointmentReason}
                      onChange={(e) => setAppointmentReason(e.target.value)}
                      placeholder="Motivo do agendamento"
                    />
                  </div>
                  <div>
                    <Label htmlFor="appointment-date">Data</Label>
                    <Input
                      id="appointment-date"
                      type="datetime-local"
                    />
                  </div>
                  <Button onClick={handleAppointmentSubmit} className="w-full">
                    Agendar
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Mail className="h-6 w-6" />
                  <span className="text-sm">Comunicados</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Enviar Comunicado</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="message-title">Título</Label>
                    <Input
                      id="message-title"
                      placeholder="Título do comunicado"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message-content">Mensagem</Label>
                    <Textarea
                      id="message-content"
                      value={messageContent}
                      onChange={(e) => setMessageContent(e.target.value)}
                      placeholder="Digite a mensagem..."
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label htmlFor="message-target">Destinatários</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option value="all">Todos os pais</option>
                      <option value="class">Turma específica</option>
                      <option value="teachers">Professores</option>
                    </select>
                  </div>
                  <Button onClick={handleMessageSubmit} className="w-full">
                    Enviar Comunicado
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Resto do conteúdo permanece igual */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Matrículas Pendentes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.pendingEnrollments}</div>
            <p className="text-xs text-muted-foreground">Para processar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documentos</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.documentsToProcess}</div>
            <p className="text-xs text-muted-foreground">Aguardando processamento</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Agendamentos</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.todayAppointments}</div>
            <p className="text-xs text-muted-foreground">Para hoje</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ligações</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.phoneCallsToday}</div>
            <p className="text-xs text-muted-foreground">Hoje</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Agendamentos de Hoje
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todayAppointments.map((appointment, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{appointment.time} - {appointment.person}</p>
                    <p className="text-sm text-muted-foreground">{appointment.reason}</p>
                  </div>
                  <Badge variant="outline">
                    {appointment.type === 'enrollment' && 'Matrícula'}
                    {appointment.type === 'document' && 'Documento'}
                    {appointment.type === 'meeting' && 'Reunião'}
                    {appointment.type === 'business' && 'Negócio'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

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

      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col gap-2">
              <Users className="h-6 w-6" />
              <span className="text-sm">Nova Matrícula</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <FileText className="h-6 w-6" />
              <span className="text-sm">Declarações</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Calendar className="h-6 w-6" />
              <span className="text-sm">Agendamentos</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Mail className="h-6 w-6" />
              <span className="text-sm">Comunicados</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
