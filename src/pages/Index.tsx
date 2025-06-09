import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { DashboardCard } from "@/components/DashboardCard";
import { GradeInput } from "@/components/GradeInput";
import { AttendanceTracker } from "@/components/AttendanceTracker";
import { Calendar } from "@/components/Calendar";
import { UserProfileSwitcher } from "@/components/UserProfileSwitcher";
import { StudentManagement } from "@/components/StudentManagement";
import { ChildrenOverview } from "@/components/ChildrenOverview";
import { SchoolReports } from "@/components/SchoolReports";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Users, 
  Calendar as CalendarIcon, 
  TrendingUp, 
  ClipboardCheck,
  MessageSquare,
  BarChart3,
  FileText,
  School,
  Trophy,
  Clock,
  UserCheck,
  Settings,
  Building,
  GraduationCap,
  User,
  LogOut,
  Crown
} from "lucide-react";
import { SchoolDepartments } from "@/components/SchoolDepartments";
import { CalendarManager } from "@/components/CalendarManager";
import { EnrollmentSystem } from "@/components/EnrollmentSystem";
import { StaffManagement } from "@/components/StaffManagement";
import { TeacherManagement } from "@/components/TeacherManagement";
import { UserProfile } from "@/types/school";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<UserProfile>({
    id: "1",
    name: "Prof. Maria Silva",
    role: "professor",
    permissions: [],
    isActive: true
  });

  useEffect(() => {
    if (profile) {
      // Mapear o perfil do Supabase para o tipo local
      const mappedRole = profile.user_type === 'master' ? 'secretaria' : 
                        profile.user_type === 'school_admin' ? 'secretaria' :
                        profile.user_type;
      
      setCurrentUser({
        id: profile.id,
        name: profile.name,
        role: mappedRole,
        subRole: profile.user_type === 'master' ? 'diretor' : profile.secretaria_role,
        permissions: [],
        isActive: true
      });
    }
  }, [profile]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  // Se é usuário master, redirecionar para dashboard específico
  useEffect(() => {
    if (profile?.user_type === 'master') {
      navigate('/master');
    }
  }, [profile, navigate]);

  // Mock data
  const mockStudents = [
    { id: "1", name: "Ana Carolina Santos" },
    { id: "2", name: "Bruno Henrique Lima" },
    { id: "3", name: "Carlos Eduardo Silva" },
    { id: "4", name: "Daniela Souza Costa" },
    { id: "5", name: "Eduardo Ferreira" }
  ];

  const mockGrades = [
    { subject: "Matemática", grade: 8.5, trend: 2.1 },
    { subject: "Português", grade: 9.2, trend: -0.8 },
    { subject: "História", grade: 7.8, trend: 1.5 },
    { subject: "Geografia", grade: 8.9, trend: 0.3 }
  ];

  const mockCommunications = [
    {
      id: "1",
      title: "Reunião de Pais - 2º Bimestre",
      content: "Informamos que a reunião de pais do 2º bimestre será realizada no dia 20/06 às 19h.",
      date: "15/06/2024",
      type: "importante" as const
    },
    {
      id: "2", 
      title: "Festa Junina da Escola",
      content: "Venha participar da nossa festa junina! Dia 25/06 a partir das 18h no pátio da escola.",
      date: "10/06/2024",
      type: "evento" as const
    }
  ];

  const renderProfessorDashboard = () => (
    <div className="space-y-6">
      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total de Alunos"
          value="32"
          icon={Users}
          subtitle="3 turmas ativas"
          className="gradient-card"
        />
        <DashboardCard
          title="Frequência Média"
          value="94.5%"
          icon={UserCheck}
          trend={{ value: 2.3, isPositive: true }}
          className="gradient-card"
        />
        <DashboardCard
          title="Notas Lançadas"
          value="156"
          icon={ClipboardCheck}
          subtitle="Este mês"
          className="gradient-card"
        />
        <DashboardCard
          title="Média Geral"
          value="8.2"
          icon={TrendingUp}
          trend={{ value: 0.8, isPositive: true }}
          className="gradient-card"
        />
      </div>

      <Tabs defaultValue="notas" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="notas" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Lançar Notas
          </TabsTrigger>
          <TabsTrigger value="frequencia" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Frequência
          </TabsTrigger>
          <TabsTrigger value="calendario" className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" />
            Calendário
          </TabsTrigger>
          <TabsTrigger value="comunicados" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Comunicados
          </TabsTrigger>
        </TabsList>

        <TabsContent value="notas">
          <GradeInput
            students={mockStudents}
            subject="Matemática"
            onSave={(grades) => console.log("Notas salvas:", grades)}
          />
        </TabsContent>

        <TabsContent value="frequencia">
          <AttendanceTracker
            students={mockStudents}
            onSave={(attendance) => console.log("Frequência salva:", attendance)}
          />
        </TabsContent>

        <TabsContent value="calendario">
          <Calendar />
        </TabsContent>

        <TabsContent value="comunicados">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Enviar Comunicado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Funcionalidade de comunicados será implementada na próxima versão.
                </p>
                <Button disabled>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Novo Comunicado
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );

  const renderAlunoDashboard = () => (
    <div className="space-y-6">
      {/* Cards de Estatísticas do Aluno */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Média Geral"
          value="8.7"
          icon={Trophy}
          subtitle="Excelente desempenho!"
          className="gradient-card"
        />
        <DashboardCard
          title="Frequência"
          value="96%"
          icon={UserCheck}
          trend={{ value: 1.2, isPositive: true }}
          className="gradient-card"
        />
        <DashboardCard
          title="Disciplinas"
          value="8"
          icon={BookOpen}
          subtitle="Cursando atualmente"
          className="gradient-card"
        />
        <DashboardCard
          title="Tarefas Pendentes"
          value="3"
          icon={Clock}
          subtitle="Para entregar"
          className="gradient-card"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notas por Disciplina */}
        <Card className="gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Notas por Disciplina
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockGrades.map((subject, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <span className="font-medium">{subject.subject}</span>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={subject.grade >= 8 ? "default" : subject.grade >= 6 ? "secondary" : "destructive"}
                    className="text-lg font-bold px-3 py-1"
                  >
                    {subject.grade}
                  </Badge>
                  <span className={`text-xs ${subject.trend > 0 ? 'text-success' : 'text-destructive'}`}>
                    {subject.trend > 0 ? '+' : ''}{subject.trend}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Comunicados Recentes */}
        <Card className="gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Comunicados Recentes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockCommunications.map((communication) => (
              <div key={communication.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium">{communication.title}</h4>
                  <Badge variant={communication.type === "importante" ? "destructive" : "default"}>
                    {communication.type === "importante" ? "Importante" : "Evento"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{communication.content}</p>
                <span className="text-xs text-muted-foreground">{communication.date}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Calendário */}
      <Tabs defaultValue="calendario" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="calendario">Calendário</TabsTrigger>
          <TabsTrigger value="tarefas">Tarefas</TabsTrigger>
          <TabsTrigger value="historico">Histórico</TabsTrigger>
        </TabsList>

        <TabsContent value="calendario">
          <Calendar />
        </TabsContent>

        <TabsContent value="tarefas">
          <Card>
            <CardHeader>
              <CardTitle>Tarefas e Trabalhos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Funcionalidade em desenvolvimento.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="historico">
          <Card>
            <CardHeader>
              <CardTitle>Histórico Acadêmico</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Funcionalidade em desenvolvimento.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );

  const renderResponsavelDashboard = () => (
    <div className="space-y-6">
      {/* Cards de Estatísticas do Responsável */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Filhos Matriculados"
          value="2"
          icon={Users}
          subtitle="João (9º) e Maria (6º)"
          className="gradient-card"
        />
        <DashboardCard
          title="Média Familiar"
          value="8.95"
          icon={Trophy}
          trend={{ value: 0.5, isPositive: true }}
          className="gradient-card"
        />
        <DashboardCard
          title="Frequência Média"
          value="97%"
          icon={UserCheck}
          subtitle="Excelente frequência"
          className="gradient-card"
        />
        <DashboardCard
          title="Próximas Avaliações"
          value="4"
          icon={CalendarIcon}
          subtitle="Nesta semana"
          className="gradient-card"
        />
      </div>

      <ChildrenOverview />
    </div>
  );

  const renderSecretariaDashboard = () => {
    const hasHierarchyAccess = (requiredLevel: string) => {
      if (!currentUser.subRole) return false;
      
      const hierarchy = {
        diretor: 3,
        secretario_educacao: 2,
        secretaria_operacional: 1
      };
      
      const userLevel = hierarchy[currentUser.subRole as keyof typeof hierarchy] || 0;
      const requiredLevelValue = hierarchy[requiredLevel as keyof typeof hierarchy] || 0;
      
      return userLevel >= requiredLevelValue;
    };

    const getDashboardTitle = () => {
      switch (currentUser.subRole) {
        case "diretor":
          return "Dashboard Executivo - Diretor";
        case "secretario_educacao":
          return "Dashboard Pedagógico - Secretário de Educação";
        case "secretaria_operacional":
          return "Dashboard Operacional - Secretária";
        default:
          return "Dashboard da Secretaria";
      }
    };

    return (
      <div className="space-y-6">
        {/* Header personalizado por hierarquia */}
        <Card className="gradient-card">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-2">{getDashboardTitle()}</h2>
            <p className="text-muted-foreground">
              {currentUser.subRole === "diretor" && "Visão estratégica e executiva da instituição"}
              {currentUser.subRole === "secretario_educacao" && "Gestão pedagógica e acadêmica"}
              {currentUser.subRole === "secretaria_operacional" && "Operações do dia a dia e atendimento"}
            </p>
          </CardContent>
        </Card>

        {/* Cards de Estatísticas da Secretaria */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Total de Alunos"
            value="485"
            icon={Users}
            subtitle="Toda a escola"
            className="gradient-card"
          />
          <DashboardCard
            title="Professores Ativos"
            value="28"
            icon={GraduationCap}
            subtitle="18 turmas"
            className="gradient-card"
          />
          {hasHierarchyAccess("secretario_educacao") && (
            <DashboardCard
              title="Média Escolar"
              value="8.1"
              icon={BarChart3}
              trend={{ value: 0.3, isPositive: true }}
              className="gradient-card"
            />
          )}
          {hasHierarchyAccess("diretor") && (
            <DashboardCard
              title="Taxa de Aprovação"
              value="91.5%"
              icon={Trophy}
              subtitle="Acima da meta"
              className="gradient-card"
            />
          )}
        </div>

        <Tabs defaultValue="alunos" className="space-y-6">
          <TabsList className={`grid w-full ${hasHierarchyAccess("diretor") ? "grid-cols-6" : "grid-cols-5"}`}>
            <TabsTrigger value="alunos" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Gestão de Alunos
            </TabsTrigger>
            <TabsTrigger value="funcionarios" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Funcionários
            </TabsTrigger>
            <TabsTrigger value="professores" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Professores
            </TabsTrigger>
            <TabsTrigger value="matriculas" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Matrículas
            </TabsTrigger>
            {hasHierarchyAccess("secretario_educacao") && (
              <TabsTrigger value="relatorios" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Relatórios
              </TabsTrigger>
            )}
            <TabsTrigger value="calendario" className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              Calendário
            </TabsTrigger>
            {hasHierarchyAccess("diretor") && (
              <TabsTrigger value="configuracoes" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Configurações
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="alunos">
            <StudentManagement />
          </TabsContent>

          <TabsContent value="funcionarios">
            <StaffManagement />
          </TabsContent>

          <TabsContent value="professores">
            <TeacherManagement />
          </TabsContent>

          <TabsContent value="matriculas">
            <EnrollmentSystem />
          </TabsContent>

          {hasHierarchyAccess("secretario_educacao") && (
            <TabsContent value="relatorios">
              <SchoolReports />
            </TabsContent>
          )}

          <TabsContent value="calendario">
            <CalendarManager />
          </TabsContent>

          {hasHierarchyAccess("diretor") && (
            <TabsContent value="configuracoes">
              <SchoolDepartments />
            </TabsContent>
          )}
        </Tabs>
      </div>
    );
  };

  const renderDashboard = () => {
    switch (currentUser.role) {
      case "professor":
        return renderProfessorDashboard();
      case "aluno":
        return renderAlunoDashboard();
      case "responsavel":
        return renderResponsavelDashboard();
      case "secretaria":
        return renderSecretariaDashboard();
      default:
        return renderProfessorDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <Header 
        userRole={currentUser.role} 
        userName={currentUser.name}
        onMenuToggle={() => console.log("Menu toggle")}
      />
      
      <main className="container mx-auto p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                Bem-vindo ao EduDiário
              </h1>
              <p className="text-xl text-muted-foreground">
                Sua plataforma digital escolar completa
              </p>
              {profile && (
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {profile.name}
                  </Badge>
                  {profile.schools && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Building className="h-3 w-3" />
                      {profile.schools.name}
                    </Badge>
                  )}
                  {profile.user_type === 'master' && (
                    <Badge className="flex items-center gap-1 bg-gradient-to-r from-purple-500 to-pink-500">
                      <Crown className="h-3 w-3" />
                      Master
                    </Badge>
                  )}
                </div>
              )}
            </div>
            
            {/* Botões de ação */}
            <div className="flex items-center gap-4">
              {profile?.user_type === 'master' && (
                <Button 
                  onClick={() => navigate('/master')}
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <Crown className="h-4 w-4" />
                  Painel Master
                </Button>
              )}
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Usuário logado:</div>
              </div>
              <UserProfileSwitcher 
                currentUser={currentUser}
                onUserChange={setCurrentUser}
              />
              <Button 
                variant="outline" 
                onClick={handleSignOut}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Sair
              </Button>
            </div>
          </div>
        </div>

        {renderDashboard()}
      </main>
    </div>
  );
};

export default Index;
