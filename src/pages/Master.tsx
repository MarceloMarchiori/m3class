
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, LogOut, TestTube } from 'lucide-react';
import { MasterDashboard } from '@/components/MasterDashboard';

const Master = () => {
  const { signOut, profile } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const goBack = () => {
    navigate('/');
  };

  const goToTest = () => {
    navigate('/teste');
  };

  // Verificar se o usuário é realmente master
  if (!profile || profile.user_type !== 'master') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="text-xl sm:text-2xl font-bold text-destructive mb-4">Acesso Negado</h1>
          <p className="text-sm sm:text-base text-muted-foreground mb-4">Você não tem permissão para acessar esta área.</p>
          <Button onClick={goBack} variant="outline" className="w-full sm:w-auto">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header do Master - Responsive */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={goBack} className="flex-shrink-0">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold">Painel Master</h1>
                <p className="text-xs sm:text-sm text-muted-foreground">Dashboard Comercial - {profile.name}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <Button variant="outline" onClick={goToTest} className="w-full sm:w-auto">
                <TestTube className="h-4 w-4 mr-2" />
                Página Teste
              </Button>
              <Button variant="outline" onClick={handleSignOut} className="w-full sm:w-auto">
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <MasterDashboard />
    </div>
  );
};

export default Master;
