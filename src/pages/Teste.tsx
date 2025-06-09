import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, LogOut, Home, Users, BookOpen, Calendar, GraduationCap, UserCheck, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { TeacherDashboard } from '@/components/demo/TeacherDashboard';
import { StudentDashboard } from '@/components/demo/StudentDashboard';
import { DirectorDashboard } from '@/components/demo/DirectorDashboard';
import { SecretaryDashboard } from '@/components/demo/SecretaryDashboard';
import { ParentDashboard } from '@/components/demo/ParentDashboard';
import { ImpersonationBanner } from '@/components/ImpersonationBanner';
import { useImpersonation } from '@/contexts/ImpersonationContext';

const Teste = () => {
  const [activeTab, setActiveTab] = useState('teacher');
  const { signOut, profile } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isImpersonating, impersonatedUser } = useImpersonation();

  useEffect(() => {
    const mode = searchParams.get('mode');
    if (mode) {
      setActiveTab(mode);
    }
    
    // Handle impersonation from URL
    const impersonateId = searchParams.get('impersonate');
    const userType = searchParams.get('userType');
    const userName = searchParams.get('userName');
    
    if (impersonateId && userType && userName) {
      // Set appropriate tab based on user type
      switch (userType) {
        case 'school_admin':
        case 'secretaria':
          setActiveTab('secretary');
          break;
        case 'professor':
          setActiveTab('teacher');
          break;
        case 'aluno':
          setActiveTab('student');
          break;
        case 'responsavel':
          setActiveTab('parent');
          break;
        default:
          setActiveTab('secretary');
      }
    }
  }, [searchParams]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const goBack = () => {
    navigate('/');
  };

  const goToMaster = () => {
    navigate('/master');
  };

  const dashboardTabs = [
    {
      id: 'teacher',
      label: 'Professor',
      icon: <BookOpen className="h-4 w-4" />,
      component: <TeacherDashboard />
    },
    {
      id: 'student',
      label: 'Aluno',
      icon: <GraduationCap className="h-4 w-4" />,
      component: <StudentDashboard />
    },
    {
      id: 'secretary',
      label: 'Secretaria',
      icon: <Shield className="h-4 w-4" />,
      component: <SecretaryDashboard />
    },
    {
      id: 'director',
      label: 'Diretor',
      icon: <Users className="h-4 w-4" />,
      component: <DirectorDashboard />
    },
    {
      id: 'parent',
      label: 'Responsável',
      icon: <UserCheck className="h-4 w-4" />,
      component: <ParentDashboard />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={goBack} className="flex-shrink-0">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Início
              </Button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold">Dashboard Demo - EduDiário</h1>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {isImpersonating && impersonatedUser 
                    ? `Acessando como: ${impersonatedUser.name}`
                    : "Demonstração dos diferentes perfis do sistema"
                  }
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              {profile?.user_type === 'master' && (
                <Button variant="outline" onClick={goToMaster} className="w-full sm:w-auto">
                  <Home className="h-4 w-4 mr-2" />
                  Painel Master
                </Button>
              )}
              <Button variant="outline" onClick={handleSignOut} className="w-full sm:w-auto">
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-6">
        {/* Impersonation Banner */}
        <ImpersonationBanner />

        <Card className="shadow-lg border-0 bg-white/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Demonstração dos Dashboards</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 bg-muted/50">
                {dashboardTabs.map((tab) => (
                  <TabsTrigger 
                    key={tab.id} 
                    value={tab.id}
                    className="flex items-center gap-2 text-xs sm:text-sm"
                  >
                    {tab.icon}
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.label.slice(0, 4)}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {dashboardTabs.map((tab) => (
                <TabsContent key={tab.id} value={tab.id} className="mt-6">
                  {tab.component}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Teste;
