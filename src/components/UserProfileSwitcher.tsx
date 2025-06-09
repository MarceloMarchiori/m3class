
import { useState } from "react";
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
import { User, Users, GraduationCap, Building } from "lucide-react";

interface UserProfile {
  id: string;
  name: string;
  role: "professor" | "aluno" | "responsavel" | "secretaria";
  avatar?: string;
}

interface UserProfileSwitcherProps {
  currentUser: UserProfile;
  onUserChange: (user: UserProfile) => void;
}

const mockUsers: UserProfile[] = [
  { id: "1", name: "Prof. Maria Silva", role: "professor" },
  { id: "2", name: "João Santos", role: "aluno" },
  { id: "3", name: "Ana Costa (Mãe)", role: "responsavel" },
  { id: "4", name: "Carlos Admin", role: "secretaria" }
];

export const UserProfileSwitcher = ({ currentUser, onUserChange }: UserProfileSwitcherProps) => {
  const getRoleDisplayName = (role: string) => {
    const roles = {
      professor: "Professor",
      aluno: "Aluno",
      responsavel: "Responsável", 
      secretaria: "Secretaria"
    };
    return roles[role as keyof typeof roles];
  };

  const getRoleIcon = (role: string) => {
    const icons = {
      professor: GraduationCap,
      aluno: User,
      responsavel: Users,
      secretaria: Building
    };
    return icons[role as keyof typeof icons];
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 h-auto p-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={currentUser.avatar || "/placeholder.svg"} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {currentUser.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium">{currentUser.name}</span>
            <Badge variant="secondary" className={`text-xs ${getRoleColor(currentUser.role)}`}>
              {getRoleDisplayName(currentUser.role)}
            </Badge>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {mockUsers.map((user) => {
          const Icon = getRoleIcon(user.role);
          return (
            <DropdownMenuItem
              key={user.id}
              onClick={() => onUserChange(user)}
              className={user.id === currentUser.id ? "bg-muted" : ""}
            >
              <Icon className="mr-2 h-4 w-4" />
              <div className="flex flex-col">
                <span className="font-medium">{user.name}</span>
                <span className="text-xs text-muted-foreground">
                  {getRoleDisplayName(user.role)}
                </span>
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
