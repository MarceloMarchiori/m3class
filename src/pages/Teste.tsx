
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Users, Building, Crown, GraduationCap, BookOpen, Calendar, FileText, MessageSquare, User, LogOut } from 'lucide-react';
import { DirectorDashboard } from '@/components/demo/DirectorDashboard';
import { TeacherDashboard } from '@/components/demo/TeacherDashboard';
import { StudentDashboard } from '@/components/demo/StudentDashboard';
import { SecretaryDashboard } from '@/components/demo/SecretaryDashboard';
import { ParentDashboard } from '@/components/demo/ParentDashboard';

const Teste = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedUserType, setSelectedUserType] = useState('school_admin');
  const [demoUser, setDemoUser] = useState({
    name: 'Usuário Demo',
    email: 'demo@escola.com',
    userType: 'school_admin'
  });

  useEffect(() => {
    // Verificar se há parâmetros de impersonação
    const impersonateId = searchParams.get('impersonate');
    const userType = searchParams.get('userType');
    const userName = searchParams.get('userName');

    if (impersonateId && userType && userName) {
      setSelectedUserType(userType);
      setDemoUser({
        name: decodeURIComponent(userName),
        email: 'demo@escola.com',
        userType: userType
      });
    }
  }, [searchParams]);

  const userTypes = [
    { value: 'school_admin', label: 'Diretor', icon: Crown, description: 'Gestão completa da escola' },
    { value: 'professor', label: 'Professor', icon: GraduationCap, description: 'Ensino e avaliação' },
    { value: 'aluno', label: 'Aluno', icon: BookOpen, description: 'Aprendizado e atividades' },
    { value: 'secretaria', label: 'Secretaria', icon: FileText, description: 'Administração escolar' },
    { value: 'responsavel', label: 'Responsável', icon: User, description: 'Acompanhamento do filho' }
  ];

  const getCurrentUserTypeInfo = () => {
    return userTypes.find(type => type.value === selectedUserType) || userTypes[0];
  };

  const handleUserTypeChange = (newUserType: string) => {
    setSelectedUserType(newUserType);
    const userTypeInfo = userTypes.find(type => type.value === newUserType);
    setDemoUser({
      name: `${userTypeInfo?.label} Demo`,
      email: 'demo@escola.com',
      userType: newUserType
    });
  };

  const renderDashboard = () => {
    switch (selectedUserType) {
      case 'school_admin':
        return <DirectorDashboard demoUser={demoUser} />;
      case 'professor':
        return <TeacherDashboard demoUser={demoUser} />;
      case 'aluno':
        return <StudentDashboard demoUser={demoUser} />;
      case 'secretaria':
        return <SecretaryDashboard demoUser={demoUser} />;
      case 'responsavel':
        return <ParentDashboard demoUser={demoUser} />;
      default:
        return <DirectorDashboard demoUser={demoUser} />;
    }
  };

  const isImpersonating = searchParams.get('impersonate');
  const currentUserInfo = getCurrentUserTypeInfo();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header do Demo */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={() => navigate('/')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl">
                  <currentUserInfo.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Dashboard Demo - Escola Municipal Santos Dumont</h1>
                  <p className="text-sm text-muted-foreground">
                    {isImpersonating ? 
                      `Visualizando como: ${demoUser.name} (${currentUserInfo.label})` : 
                      `Demonstração das funcionalidades por tipo de usuário`
                    }
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {!isImpersonating && (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Tipo de Usuário:</span>
                  <Select value={selectedUserType} onValueChange={handleUserTypeChange}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {userTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            <type.icon className="h-4 w-4" />
                            {type.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              {isImpersonating && (
                <Button variant="outline" onClick={() => navigate('/master')}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Voltar ao Master
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Info Card sobre o tipo de usuário atual */}
      {!isImpersonating && (
        <div className="container mx-auto px-6 py-4">
          <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl">
                  <currentUserInfo.icon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{currentUserInfo.label}</h3>
                  <p className="text-muted-foreground">{currentUserInfo.description}</p>
                  <p className="text-sm text-blue-600 mt-1">
                    Esta é uma demonstração das funcionalidades disponíveis para este tipo de usuário.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Dashboard Content */}
      <div className="container mx-auto px-6 pb-6">
        {renderDashboard()}
      </div>
    </div>
  );
};

export default Teste;
