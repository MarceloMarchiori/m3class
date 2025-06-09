import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { DashboardCard } from '@/components/DashboardCard';
import { Calendar } from '@/components/Calendar';
import { ChildrenOverview } from '@/components/ChildrenOverview';
import { AttendanceTracker } from '@/components/AttendanceTracker';
import { 
  Users, 
  BookOpen, 
  Calendar as CalendarIcon, 
  ClipboardList,
  GraduationCap,
  Building,
  FileText,
  Settings
} from 'lucide-react';

const Index = () => {
  const { profile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Se é master, não renderizar nada - deixa o AuthContext redirecionar
    if (profile?.user_type === 'master') {
      return;
    }
  }, [profile]);

  // Loading state melhorado
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">
            {profile?.user_type === 'master' ? 'Redirecionando para o painel Master...' : 'Carregando...'}
          </p>
        </div>
      </div>
    );
  }

  // Se for master, não renderizar a página Index
  if (profile?.user_type === 'master') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Redirecionando para o painel Master...</p>
        </div>
      </div>
    );
  }

  // Resto do código da página Index permanece igual
  const getDashboardCards = () => {
    switch (profile?.user_type) {
      case 'school_admin':
        return [
          {
            title: "Gestão de Usuários",
            description: "Gerencie professores, alunos e responsáveis",
            icon: Users,
            path: "/users"
          },
          {
            title: "Gestão Escolar",
            description: "Departamentos, turmas e estrutura",
            icon: Building,
            path: "/school"
          },
          {
            title: "Relatórios",
            description: "Relatórios acadêmicos e administrativos",
            icon: FileText,
            path: "/reports"
          },
          {
            title: "Configurações",
            description: "Configurações da escola",
            icon: Settings,
            path: "/settings"
          }
        ];
      
      case 'professor':
        return [
          {
            title: "Minhas Turmas",
            description: "Gerencie suas turmas e disciplinas",
            icon: Users,
            path: "/classes"
          },
          {
            title: "Diário de Classe",
            description: "Registre notas e frequência",
            icon: BookOpen,
            path: "/gradebook"
          },
          {
            title: "Calendário",
            description: "Suas aulas e compromissos",
            icon: CalendarIcon,
            path: "/calendar"
          },
          {
            title: "Planejamento",
            description: "Planos de aula e atividades",
            icon: ClipboardList,
            path: "/planning"
          }
        ];
      
      case 'responsavel':
        return [
          {
            title: "Meus Filhos",
            description: "Acompanhe o desempenho acadêmico",
            icon: Users,
            path: "/children"
          },
          {
            title: "Calendário Escolar",
            description: "Eventos e atividades da escola",
            icon: CalendarIcon,
            path: "/calendar"
          },
          {
            title: "Comunicados",
            description: "Mensagens da escola",
            icon: ClipboardList,
            path: "/communications"
          }
        ];
      
      case 'aluno':
        return [
          {
            title: "Minhas Notas",
            description: "Visualize suas notas e desempenho",
            icon: GraduationCap,
            path: "/grades"
          },
          {
            title: "Horário",
            description: "Sua grade de horários",
            icon: CalendarIcon,
            path: "/schedule"
          },
          {
            title: "Atividades",
            description: "Tarefas e trabalhos",
            icon: ClipboardList,
            path: "/assignments"
          }
        ];
      
      default:
        return [];
    }
  };

  const cards = getDashboardCards();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Bem-vindo ao EduDiário, {profile?.name}!
          </h1>
          <p className="text-muted-foreground">
            Gerencie sua escola de forma eficiente e organizada.
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {cards.map((card, index) => (
            <DashboardCard key={index} {...card} />
          ))}
        </div>

        {/* Content específico por tipo de usuário */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {profile?.user_type === 'responsavel' && <ChildrenOverview />}
            {profile?.user_type === 'professor' && <AttendanceTracker />}
            {profile?.user_type === 'school_admin' && <AttendanceTracker />}
          </div>
          
          <div className="lg:col-span-1">
            <Calendar />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
