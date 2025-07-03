import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  TrendingUp, 
  Calendar,
  FileText,
  Shield,
  Clock,
  CheckCircle,
  Plus,
  Search,
  Settings,
  Utensils,
  Package,
  Bus,
  UserPlus,
  Activity
} from 'lucide-react';
import { EnhancedEnrollmentModal } from '../EnhancedEnrollmentModal';
import { StudentSearchModal } from '../StudentSearchModal';
import { DocumentModal } from '../DocumentModal';
import { StudentListModal } from '../StudentListModal';
import { TeacherListModal } from '../TeacherListModal';
import { StaffListModal } from '../StaffListModal';
import { TaskDetailsModal } from '../TaskDetailsModal';
import { UserCreationModal } from '../UserCreationModal';
import { CanteenManagement } from '../CanteenManagement';
import { StockroomManagement } from '../StockroomManagement';
import { FleetManagement } from '../FleetManagement';
import { PerformanceMonitor } from '../PerformanceMonitor';

interface SecretaryDashboardProps {
  demoUser: {
    name: string;
    email: string;
    user_type: string;
  };
}

export const SecretaryDashboard: React.FC<SecretaryDashboardProps> = ({ demoUser }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [enrollmentModalOpen, setEnrollmentModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [documentModalOpen, setDocumentModalOpen] = useState(false);
  const [studentListModalOpen, setStudentListModalOpen] = useState(false);
  const [teacherListModalOpen, setTeacherListModalOpen] = useState(false);
  const [staffListModalOpen, setStaffListModalOpen] = useState(false);
  const [taskDetailsModalOpen, setTaskDetailsModalOpen] = useState(false);
  const [userCreationModalOpen, setUserCreationModalOpen] = useState(false);

  const secretaryStats = {
    totalStudents: 847,
    totalTeachers: 42,
    totalStaff: 15,
    pendingTasks: 8,
    todayEnrollments: 3,
    documentsIssued: 12
  };

  const recentActivities = [
    { id: 1, type: 'enrollment', description: 'Matrícula de Ana Silva - 6º Ano', time: '10 min atrás', status: 'completed' },
    { id: 2, type: 'document', description: 'Declaração emitida para João Santos', time: '30 min atrás', status: 'completed' },
    { id: 3, type: 'transfer', description: 'Transferência de Maria Costa aprovada', time: '1 hora atrás', status: 'completed' },
    { id: 4, type: 'update', description: 'Dados de Pedro Silva atualizados', time: '2 horas atrás', status: 'completed' }
  ];

  const pendingTasks = [
    { id: 1, task: 'Processar matrícula de Carlos Oliveira', priority: 'alta', deadline: 'Hoje' },
    { id: 2, task: 'Emitir declarações pendentes', priority: 'média', deadline: 'Amanhã' },
    { id: 3, task: 'Atualizar dados de contato dos pais', priority: 'baixa', deadline: 'Esta semana' },
    { id: 4, task: 'Organizar documentos do arquivo', priority: 'baixa', deadline: 'Próxima semana' }
  ];

  const quickActions = [
    { title: 'Nova Matrícula Completa', icon: <Plus className="h-5 w-5" />, action: 'enrollment', color: 'bg-blue-100 text-blue-600' },
    { title: 'Buscar Aluno', icon: <Search className="h-5 w-5" />, action: 'search', color: 'bg-green-100 text-green-600' },
    { title: 'Emitir Documento', icon: <FileText className="h-5 w-5" />, action: 'document', color: 'bg-purple-100 text-purple-600' },
    { title: 'Cadastrar Usuário', icon: <UserPlus className="h-5 w-5" />, action: 'create-user', color: 'bg-orange-100 text-orange-600' }
  ];

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'enrollment':
        setEnrollmentModalOpen(true);
        break;
      case 'search':
        setSearchModalOpen(true);
        break;
      case 'document':
        setDocumentModalOpen(true);
        break;
      case 'create-user':
        setUserCreationModalOpen(true);
        break;
      default:
        console.log('Ação rápida:', action);
    }
  };

  const handleCardClick = (cardType: string) => {
    switch (cardType) {
      case 'students':
        setStudentListModalOpen(true);
        break;
      case 'teachers':
        setTeacherListModalOpen(true);
        break;
      case 'staff':
        setStaffListModalOpen(true);
        break;
      case 'tasks':
        setTaskDetailsModalOpen(true);
        break;
      case 'documents':
        setDocumentModalOpen(true);
        break;
      case 'enrollments':
        setEnrollmentModalOpen(true);
        break;
      default:
        console.log('Card clicado:', cardType);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'alta': return 'bg-red-100 text-red-800';
      case 'média': return 'bg-yellow-100 text-yellow-800';
      case 'baixa': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <Shield className="h-8 w-8 text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Bem-vinda, {demoUser.name}!</h2>
              <p className="text-muted-foreground">Secretaria Escolar - Escola Municipal Santos Dumont</p>
              <p className="text-sm text-purple-600">Último acesso: Hoje às 07:30</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 bg-white/60 backdrop-blur-sm">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">Visão Geral</span>
            <span className="sm:hidden">Geral</span>
          </TabsTrigger>
          <TabsTrigger value="canteen" className="flex items-center gap-2">
            <Utensils className="h-4 w-4" />
            <span className="hidden sm:inline">Cantina</span>
            <span className="sm:hidden">Cantina</span>
          </TabsTrigger>
          <TabsTrigger value="stockroom" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            <span className="hidden sm:inline">Almoxarifado</span>
            <span className="sm:hidden">Almox</span>
          </TabsTrigger>
          <TabsTrigger value="fleet" className="flex items-center gap-2">
            <Bus className="h-4 w-4" />
            <span className="hidden sm:inline">Frota</span>
            <span className="sm:hidden">Frota</span>
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span className="hidden sm:inline">Performance</span>
            <span className="sm:hidden">Perf</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {quickActions.map((action) => (
                    <Button
                      key={action.action}
                      variant="outline"
                      className="h-20 flex flex-col gap-2 hover:bg-muted/50"
                      onClick={() => handleQuickAction(action.action)}
                    >
                      <div className={`p-2 rounded-lg ${action.color}`}>
                        {action.icon}
                      </div>
                      <span className="text-sm font-medium">{action.title}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleCardClick('students')}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total de Alunos</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{secretaryStats.totalStudents}</div>
                  <p className="text-xs text-muted-foreground">+{secretaryStats.todayEnrollments} hoje</p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleCardClick('teachers')}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Professores</CardTitle>
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{secretaryStats.totalTeachers}</div>
                  <p className="text-xs text-muted-foreground">Corpo docente ativo</p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleCardClick('staff')}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Funcionários</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{secretaryStats.totalStaff}</div>
                  <p className="text-xs text-muted-foreground">Equipe administrativa</p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleCardClick('tasks')}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tarefas Pendentes</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">{secretaryStats.pendingTasks}</div>
                  <p className="text-xs text-orange-600">Para concluir</p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleCardClick('documents')}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Documentos Hoje</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{secretaryStats.documentsIssued}</div>
                  <p className="text-xs text-green-600">Emitidos</p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleCardClick('enrollments')}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Matrículas Hoje</CardTitle>
                  <Plus className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{secretaryStats.todayEnrollments}</div>
                  <p className="text-xs text-blue-600">Processadas</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Atividades Recentes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="p-2 bg-green-100 rounded-lg">
                          {activity.type === 'enrollment' && <Plus className="h-4 w-4 text-green-600" />}
                          {activity.type === 'document' && <FileText className="h-4 w-4 text-blue-600" />}
                          {activity.type === 'transfer' && <Users className="h-4 w-4 text-purple-600" />}
                          {activity.type === 'update' && <Settings className="h-4 w-4 text-orange-600" />}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{activity.description}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {activity.status === 'completed' ? 'Concluído' : 'Pendente'}
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
                    {pendingTasks.map((task) => (
                      <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{task.task}</p>
                          <p className="text-xs text-muted-foreground">Prazo: {task.deadline}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                          <Button size="sm" variant="outline">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-purple-200 bg-purple-50">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-purple-900">
                      Painel da Secretaria - Gestão Administrativa
                    </p>
                    <p className="text-sm text-purple-700 mt-1">
                      Como secretária, você tem acesso completo para gerenciar matrículas, emitir documentos, 
                      cadastrar usuários e administrar os dados da escola. Use as abas acima para acessar os módulos de gestão.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="canteen">
          <CanteenManagement />
        </TabsContent>

        <TabsContent value="stockroom">
          <StockroomManagement />
        </TabsContent>

        <TabsContent value="fleet">
          <FleetManagement />
        </TabsContent>

        <TabsContent value="performance">
          <PerformanceMonitor />
        </TabsContent>
      </Tabs>

      <EnhancedEnrollmentModal open={enrollmentModalOpen} onOpenChange={setEnrollmentModalOpen} />
      <StudentSearchModal open={searchModalOpen} onOpenChange={setSearchModalOpen} />
      <DocumentModal open={documentModalOpen} onOpenChange={setDocumentModalOpen} />
      <StudentListModal open={studentListModalOpen} onOpenChange={setStudentListModalOpen} />
      <TeacherListModal open={teacherListModalOpen} onOpenChange={setTeacherListModalOpen} />
      <StaffListModal open={staffListModalOpen} onOpenChange={setStaffListModalOpen} />
      <TaskDetailsModal open={taskDetailsModalOpen} onOpenChange={setTaskDetailsModalOpen} />
      <UserCreationModal open={userCreationModalOpen} onOpenChange={setUserCreationModalOpen} />
    </div>
  );
};
