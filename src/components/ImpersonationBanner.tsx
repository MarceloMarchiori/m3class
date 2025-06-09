
import React from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LogOut, Crown, User } from 'lucide-react';
import { useImpersonation } from '@/contexts/ImpersonationContext';
import { useNavigate } from 'react-router-dom';

export const ImpersonationBanner = () => {
  const { isImpersonating, impersonatedUser, stopImpersonation } = useImpersonation();
  const navigate = useNavigate();

  if (!isImpersonating || !impersonatedUser) return null;

  const handleStopImpersonation = () => {
    stopImpersonation();
    navigate('/master');
  };

  return (
    <Alert className="bg-gradient-to-r from-amber-500 to-orange-500 border-orange-600 text-white mb-4">
      <Crown className="h-4 w-4" />
      <AlertDescription className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span className="font-medium">
            Modo Master: Você está acessando como {impersonatedUser.name} ({impersonatedUser.email})
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleStopImpersonation}
          className="bg-white/20 border-white/30 text-white hover:bg-white/30"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sair da Impersonificação
        </Button>
      </AlertDescription>
    </Alert>
  );
};
