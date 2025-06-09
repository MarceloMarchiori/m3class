
import { useState } from "react";
import { User, Bell, LogOut, Menu, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  userRole: "professor" | "aluno" | "responsavel" | "secretaria";
  userName: string;
  onMenuToggle?: () => void;
}

export const Header = ({ userRole, userName, onMenuToggle }: HeaderProps) => {
  const [notifications] = useState(3); // Mock notification count

  const getRoleDisplayName = (role: string) => {
    const roles = {
      professor: "Professor",
      aluno: "Aluno",
      responsavel: "Responsável", 
      secretaria: "Secretaria"
    };
    return roles[role as keyof typeof roles];
  };

  const getRoleColor = (role: string) => {
    const colors = {
      professor: "bg-blue-100 text-blue-800",
      aluno: "bg-green-100 text-green-800",
      responsavel: "bg-purple-100 text-purple-800",
      secretaria: "bg-orange-100 text-orange-800"
    };
    return colors[role as keyof typeof colors];
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo e Menu Mobile */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuToggle}
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              EduDiário
            </span>
          </div>
        </div>

        {/* Ações do Usuário */}
        <div className="flex items-center gap-3">
          {/* Notificações */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                {notifications}
              </Badge>
            )}
          </Button>

          {/* Menu do Usuário */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 h-auto p-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {userName.split(' ').map(n => n[0]).join('').substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:flex flex-col items-start">
                  <span className="text-sm font-medium">{userName}</span>
                  <Badge variant="secondary" className={`text-xs ${getRoleColor(userRole)}`}>
                    {getRoleDisplayName(userRole)}
                  </Badge>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Perfil
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
