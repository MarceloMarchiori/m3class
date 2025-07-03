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
  Building,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  Utensils,
  Package,
  Bus,
  Settings
} from 'lucide-react';
import { StudentDetailsModal } from '../StudentDetailsModal';
import { TeacherDetailsModal } from '../TeacherDetailsModal';
import { ClassDetailsModal } from '../ClassDetailsModal';
import { CanteenManagement } from '../CanteenManagement';
import { StockroomManagement } from '../StockroomManagement';
import { FleetManagement } from '../FleetManagement';
import { CommercialContact } from '../CommercialContact';

interface DirectorDashboardProps {
  demoUser: {
    name: string;
    email: string;
    user_type: string;
  };
}

export const DirectorDashboard: React.FC<DirectorDashboardProps> = ({ demoUser }) => {
  const [studentModalOpen, setStudentModalOpen] = useState(false);
  const [teacherModalOpen, setTeacherModalOpen] = useState(false);
  const [classModalOpen, setClassModalOpen] = useState(false);

  const schoolStats = {
    totalStudents: 847,
    totalTeachers: 42,
    totalClasses: 28,
    averageGrade: 8.2,
    attendance: 94.5,
    pendingApprovals: 12
  };

  const pendingApprovals = [
    { id: '1', type: 'enrollment', description: 'Matrícula de João Silva (3º Ano A)', priority: 'alta', date: 'Hoje' },
    { id: '2', type: 'transfer', description: 'Transferência de Maria Santos', priority: 'média', date: 'Ontem' },
    { id: '3', type: 'document', description: 'Declaração de Ana Costa', priority: 'baixa', date: '2 dias atrás' },
    { id: '4', type: 'grade', description: 'Correção de nota - Pedro Oliveira', priority: 'alta', date: 'Hoje' },
  ];

  const recentActivities = [
    { type: 'approval', description: 'Aprovada matrícula de Lucas Santos', time: '1 hora atrás', status: 'approved' },
    { type: 'meeting', description: 'Reunião com coordenadores realizada', time: '2 horas atrás', status: 'completed' },
    { type: 'report', description: 'Relatório mensal enviado à secretaria', time: '4 horas atrás', status: 'completed' },
    { type: 'inspection', description: 'Inspeção da merenda escolar', time: '1 dia atrás', status: 'completed' }
  ];

  const handleApprove = (id: string) => {
    console.log('Aprovado item:', id);
  };

  const handleReject = (id: string) => {
    console.log('Rejeitado item:', id);
  };

  const handleView = (id: string) => {
    console.log('Visualizar item:', id);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Building className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">Bem-vindo, {demoUser.name}</h2>
              <p className="text-sm sm:text-base text-muted-foreground">Diretor(a) - Escola Municipal Santos Dumont</p>
              <p className="text-xs sm:text-sm text-blue-600">Último acesso: Hoje às 08:30</p>
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
          <TabsTrigger value="commercial" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Comercial</span>
            <span className="sm:hidden">Comercial</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="space-y-6">
            {/* Clickable Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
              <Card 
                className="cursor-pointer hover:shadow-lg transition-shadow" 
                onClick={() => setStudentModalOpen(true)}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium">Total de Alunos</CardTitle>
                  <Users className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg sm:text-2xl font-bold">{schoolStats.totalStudents}</div>
                  <p className="text-xs text-muted-foreground">+12 novos este mês</p>
                  <p className="text-xs text-blue-600 mt-1">Clique para ver detalhes</p>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer hover:shadow-lg transition-shadow" 
                onClick={() => setTeacherModalOpen(true)}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium">Professores</CardTitle>
                  <GraduationCap className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg sm:text-2xl font-bold">{schoolStats.totalTeachers}</div>
                  <p className="text-xs text-muted-foreground">Corpo docente ativo</p>
                  <p className="text-xs text-green-600 mt-1">Clique para ver detalhes</p>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer hover:shadow-lg transition-shadow" 
                onClick={() => setClassModalOpen(true)}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium">Turmas Ativas</CardTitle>
                  <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg sm:text-2xl font-bold">{schoolStats.totalClasses}</div>
                  <p className="text-xs text-muted-foreground">Educação Infantil ao 9º ano</p>
                  <p className="text-xs text-purple-600 mt-1">Clique para ver detalhes</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium">Média Geral</CardTitle>
                  <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg sm:text-2xl font-bold">{schoolStats.averageGrade}</div>
                  <p className="text-xs text-green-600">+0.3 pontos vs. trimestre anterior</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium">Frequência</CardTitle>
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg sm:text-2xl font-bold">{schoolStats.attendance}%</div>
                  <p className="text-xs text-green-600">Acima da meta (90%)</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium">Pendências</CardTitle>
                  <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg sm:text-2xl font-bold">{schoolStats.pendingApprovals}</div>
                  <p className="text-xs text-orange-600">Aguardando aprovação</p>
                </CardContent>
              </Card>
            </div>

            {/* Main Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Pending Approvals */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                    <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                    Aprovações Pendentes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 sm:space-y-4">
                    {pendingApprovals.map((item) => (
                      <Card key={item.id} className="p-3 sm:p-4">
                        <div className="flex flex-col gap-3">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                            <div className="flex-1">
                              <p className="text-xs sm:text-sm font-medium">{item.description}</p>
                              <p className="text-xs text-muted-foreground">{item.date}</p>
                            </div>
                            <Badge 
                              variant={
                                item.priority === 'alta' ? 'destructive' : 
                                item.priority === 'média' ? 'default' : 'secondary'
                              }
                              className="text-xs w-fit"
                            >
                              {item.priority}
                            </Badge>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleView(item.id)}
                              className="flex-1 text-xs"
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              Ver
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleApprove(item.id)}
                              className="flex-1 text-xs"
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Aprovar
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
                    Atividades Recentes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 sm:space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50">
                        <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                          {activity.type === 'approval' && <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />}
                          {activity.type === 'meeting' && <Users className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />}
                          {activity.type === 'report' && <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />}
                          {activity.type === 'inspection' && <Building className="h-3 w-3 sm:h-4 sm:w-4 text-orange-600" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-xs sm:text-sm font-medium">{activity.description}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Information Notice */}
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Building className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">
                      Painel do Diretor - Visualização e Aprovações
                    </p>
                    <p className="text-xs sm:text-sm text-blue-700 mt-1">
                      Como diretor, você pode visualizar dados da escola, aprovar solicitações e acessar os módulos de gestão. 
                      Para cadastros de novos usuários, turmas e matérias, contacte a secretaria da escola.
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

        <TabsContent value="commercial">
          <CommercialContact 
            schoolId="demo-school"
            userEmail={demoUser?.email || 'admin@escola.com'}
            userName={demoUser?.name || 'Administrador Demo'}
          />
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <StudentDetailsModal open={studentModalOpen} onOpenChange={setStudentModalOpen} />
      <TeacherDetailsModal open={teacherModalOpen} onOpenChange={setTeacherModalOpen} />
      <ClassDetailsModal open={classModalOpen} onOpenChange={setClassModalOpen} />
    </div>
  );
};
