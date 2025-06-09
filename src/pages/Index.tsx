
import { useState } from "react";
import { Header } from "@/components/Header";
import { DashboardCard } from "@/components/DashboardCard";
import { GradeInput } from "@/components/GradeInput";
import { AttendanceTracker } from "@/components/AttendanceTracker";
import { Calendar } from "@/components/Calendar";
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
  UserCheck
} from "lucide-react";

const Index = () => {
  const [userRole] = useState<"professor" | "aluno" | "responsavel" | "secretaria">("professor");
  const [userName] = useState("Prof. Maria Silva");

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
          title="Faltas"
          value="3"
          icon={Clock}
          subtitle="No bimestre"
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
      <Calendar />
    </div>
  );

  const renderDashboard = () => {
    switch (userRole) {
      case "professor":
        return renderProfessorDashboard();
      case "aluno":
        return renderAlunoDashboard();
      case "responsavel":
        return renderAlunoDashboard(); // Similar ao aluno, mas com perspectiva de responsável
      case "secretaria":
        return renderProfessorDashboard(); // Por enquanto igual ao professor
      default:
        return renderProfessorDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <Header 
        userRole={userRole} 
        userName={userName}
        onMenuToggle={() => console.log("Menu toggle")}
      />
      
      <main className="container mx-auto p-6">
        {/* Welcome Section */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
            Bem-vindo ao EduDiário
          </h1>
          <p className="text-xl text-muted-foreground">
            Sua plataforma digital escolar completa
          </p>
        </div>

        {renderDashboard()}
      </main>
    </div>
  );
};

export default Index;
