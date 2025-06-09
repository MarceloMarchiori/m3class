
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GraduationCap, Download } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  
  const { signIn, user, profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Detectar se PWA pode ser instalado
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Verificar se já está instalado
    if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
      setShowInstallButton(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // Redirecionar se já logado
  useEffect(() => {
    if (user && profile) {
      if (profile.user_type === 'master') {
        navigate('/master');
      } else {
        navigate('/dashboard');
      }
    }
  }, [user, profile, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await signIn(email, password);
      if (error) {
        toast({
          title: "Erro no login",
          description: error.message || "Credenciais inválidas",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro no login",
        description: "Ocorreu um erro inesperado",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInstallPWA = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      toast({
        title: "App instalado!",
        description: "O EduDiário foi instalado em seu dispositivo",
      });
    }
    
    setDeferredPrompt(null);
    setShowInstallButton(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo e Título */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl">
              <GraduationCap className="h-12 w-12 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              EduDiário
            </h1>
            <p className="text-gray-600 mt-2">Sistema de Gestão Escolar</p>
          </div>
        </div>

        {/* Formulário de Login */}
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Fazer Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11"
                />
              </div>
              <Button
                type="submit"
                className="w-full h-11 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                disabled={loading}
              >
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Botão de Instalação PWA */}
        {showInstallButton && (
          <Card className="shadow-lg border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="text-center space-y-3">
                <div className="flex justify-center">
                  <Download className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-800">Instalar EduDiário</h3>
                  <p className="text-sm text-green-700 mt-1">
                    Adicione o app à sua tela inicial para acesso rápido
                  </p>
                </div>
                <Button
                  onClick={handleInstallPWA}
                  variant="outline"
                  className="w-full border-green-300 text-green-700 hover:bg-green-100"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Instalar App
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Rodapé */}
        <div className="text-center text-sm text-gray-500">
          <p>Acesso restrito a usuários autorizados</p>
          <p className="mt-1">© 2024 EduDiário - Gestão Escolar</p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
