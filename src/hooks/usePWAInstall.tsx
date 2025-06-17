
import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export const usePWAInstall = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    console.log('PWA: Inicializando hook PWA...');
    
    // Check if app is already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isInWebAppiOS = (window.navigator as any).standalone === true;
    const installed = isStandalone || isInWebAppiOS;
    
    console.log('PWA: App já instalado?', installed);
    setIsInstalled(installed);

    // Para teste: sempre mostrar o botão se não estiver instalado
    if (!installed) {
      console.log('PWA: Habilitando botão para teste');
      setIsInstallable(true);
    }

    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      console.log('PWA: beforeinstallprompt event disparado');
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      console.log('PWA: App foi instalado');
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const installPWA = async () => {
    console.log('PWA: Tentando instalar app...');
    
    if (!deferredPrompt) {
      console.log('PWA: Sem prompt disponível, mostrando instruções');
      // Se não há prompt nativo, mostrar instruções
      alert('Para instalar o app:\n\n' +
            'Chrome/Edge: Menu > Instalar M3Class\n' +
            'Firefox: Menu > Adicionar à tela inicial\n' +
            'Safari: Compartilhar > Adicionar à tela inicial');
      return false;
    }

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      console.log(`PWA: Resposta do usuário: ${outcome}`);
      
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      
      setDeferredPrompt(null);
      setIsInstallable(false);
      
      return outcome === 'accepted';
    } catch (error) {
      console.error('PWA: Erro durante instalação:', error);
      return false;
    }
  };

  // Para debug: sempre retornar que é instalável se não estiver instalado
  return {
    isInstallable: !isInstalled,
    isInstalled,
    installPWA
  };
};
