
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, FileText, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { usePWAInstall } from '@/hooks/usePWAInstall';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isInstallable, installPWA } = usePWAInstall();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await signIn(email, password);
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Erro no login",
        description: error.message || "Erro ao fazer login",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInstallPWA = async () => {
    console.log('PWA: Botão de instalação clicado');
    const installed = await installPWA();
    if (installed) {
      toast({
        title: "App Instalado!",
        description: "M3Class foi instalado com sucesso na sua área de trabalho.",
      });
    }
  };

  console.log('PWA: isInstallable =', isInstallable);

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23dbeafe;stop-opacity:1" /><stop offset="50%" style="stop-color:%23ffffff;stop-opacity:1" /><stop offset="100%" style="stop-color:%23faf5ff;stop-opacity:1" /></linearGradient></defs><rect width="100%" height="100%" fill="url(%23bg)"/></svg>')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay para melhor contraste */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10"></div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-white p-2 rounded-2xl shadow-lg border border-gray-200">
              <img 
                src="/lovable-uploads/e11bcea5-685a-4d4b-baa7-f826bb022fb2.png" 
                alt="M3 Software Logo" 
                className="h-16 w-16 object-contain"
              />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            M3Class
          </h1>
          <p className="text-gray-700">Sistema de Gestão Escolar</p>
        </div>

        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Acesso ao Sistema
            </CardTitle>
            <CardDescription>
              Entre com suas credenciais para continuar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-lg transition-all duration-300 transform hover:scale-105" 
                disabled={loading}
              >
                <LogIn className="h-4 w-4 mr-2" />
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/documentacao">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2 border-2 border-gradient bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 hover:from-blue-600/20 hover:via-purple-600/20 hover:to-pink-600/20 text-purple-700 hover:text-purple-800 shadow-md transition-all duration-300 transform hover:scale-105"
              >
                <FileText className="h-4 w-4" />
                Documentação do Sistema
              </Button>
            </Link>
            
            {/* PWA Install Button - Sempre visível para debug */}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleInstallPWA}
              className="flex items-center gap-2 border-2 bg-gradient-to-r from-green-600/10 via-blue-600/10 to-purple-600/10 hover:from-green-600/20 hover:via-blue-600/20 hover:to-purple-600/20 text-green-700 hover:text-green-800 shadow-md transition-all duration-300 transform hover:scale-105"
            >
              <Download className="h-4 w-4" />
              📱 Instalar App
            </Button>
          </div>
          
          <div className="text-sm text-gray-600">
            © 2025 M3Class - Gestão Escolar
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
