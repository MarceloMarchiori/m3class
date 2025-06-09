
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ImpersonationContextType {
  impersonatedUser: any | null;
  setImpersonatedUser: (user: any | null) => void;
  isImpersonating: boolean;
  stopImpersonation: () => void;
}

const ImpersonationContext = createContext<ImpersonationContextType | undefined>(undefined);

export function ImpersonationProvider({ children }: { children: ReactNode }) {
  const [impersonatedUser, setImpersonatedUser] = useState<any | null>(null);

  const isImpersonating = impersonatedUser !== null;

  const stopImpersonation = () => {
    setImpersonatedUser(null);
  };

  const value = {
    impersonatedUser,
    setImpersonatedUser,
    isImpersonating,
    stopImpersonation,
  };

  return (
    <ImpersonationContext.Provider value={value}>
      {children}
    </ImpersonationContext.Provider>
  );
}

export function useImpersonation() {
  const context = useContext(ImpersonationContext);
  if (context === undefined) {
    throw new Error('useImpersonation must be used within an ImpersonationProvider');
  }
  return context;
}
