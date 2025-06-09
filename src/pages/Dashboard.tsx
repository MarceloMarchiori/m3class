
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

const Dashboard = () => {
  const { profile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirecionar master users para /master
    if (profile?.user_type === 'master') {
      navigate('/master');
      return;
    }
  }, [profile, navigate]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  // Se for master, não renderizar a página Dashboard
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

  // Dados mock para o AttendanceTracker
  const mockStudents = [
    { id: '1', name: 'João Silva' },
    { id: '2', name: 'Maria Santos' },
    { id: '3', name: 'Pedro Costa' },
    { id: '4', name: 'Ana Oliveira' }
  ];

  const handleAttendanceSave = (attendance: any) => {
    console.log('Frequência salva:', attendance);
  };

  // Função para navegar para as páginas
  const handleCardClick = (path: string) => {
    navigate(path);
  };

  const getDashboardCards = () => {
    switch (profile?.user_type) {
      case 'school_admin':
        return [
          {
            title: "Gestão de Usuários",
            value: "126",
            description: "Gerencie professores, alunos e responsáveis",
            icon: Users,
            path: "/users"
          },
          {
            title: "Gestão Escolar",
            value: "8",
            description: "Departamentos, turmas e estrutura",
            icon: Building,
            path: "/school"
          },
          {
            title: "Relatórios",
            value: "24",
            description: "Relatórios acadêmicos e administrativos",
            icon: FileText,
            path: "/reports"
          },
          {
            title: "Configurações",
            value: "12",
            description: "Configurações da escola",
            icon: Settings,
            path: "/settings"
          }
        ];
      
      case 'professor':
        return [
          {
            title: "Minhas Turmas",
            value: "3",
            description: "Gerencie suas turmas e disciplinas",
            icon: Users,
            path: "/classes"
          },
          {
            title: "Diário de Classe",
            value: "85",
            description: "Registre notas e frequência",
            icon: BookOpen,
            path: "/gradebook"
          },
          {
            title: "Calendário",
            value: "12",
            description: "Suas aulas e compromissos",
            icon: CalendarIcon,
            path: "/calendar"
          },
          {
            title: "Planejamento",
            value: "7",
            description: "Planos de aula e atividades",
            icon: ClipboardList,
            path: "/planning"
          }
        ];
      
      case 'responsavel':
        return [
          {
            title: "Meus Filhos",
            value: "2",
            description: "Acompanhe o desempenho acadêmico",
            icon: Users,
            path: "/children"
          },
          {
            title: "Calendário Escolar",
            value: "5",
            description: "Eventos e atividades da escola",
            icon: CalendarIcon,
            path: "/calendar"
          },
          {
            title: "Comunicados",
            value: "3",
            description: "Mensagens da escola",
            icon: ClipboardList,
            path: "/communications"
          }
        ];
      
      case 'aluno':
        return [
          {
            title: "Minhas Notas",
            value: "8.5",
            description: "Visualize suas notas e desempenho",
            icon: GraduationCap,
            path: "/grades"
          },
          {
            title: "Horário",
            value: "6",
            description: "Sua grade de horários",
            icon: CalendarIcon,
            path: "/schedule"
          },
          {
            title: "Atividades",
            value: "4",
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
      <Header 
        userRole={profile?.user_type as "professor" | "aluno" | "responsavel" | "secretaria"} 
        userName={profile?.name || 'Usuário'} 
      />
      
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
            <div key={index} onClick={() => handleCardClick(card.path)} className="cursor-pointer">
              <DashboardCard {...card} />
            </div>
          ))}
        </div>

        {/* Content específico por tipo de usuário */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {profile?.user_type === 'responsavel' && <ChildrenOverview />}
            {profile?.user_type === 'professor' && (
              <AttendanceTracker 
                students={mockStudents}
                onSave={handleAttendanceSave}
                date={new Date().toLocaleDateString('pt-BR')}
              />
            )}
            {profile?.user_type === 'school_admin' && (
              <AttendanceTracker 
                students={mockStudents}
                onSave={handleAttendanceSave}
                date={new Date().toLocaleDateString('pt-BR')}
              />
            )}
          </div>
          
          <div className="lg:col-span-1">
            <Calendar />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
