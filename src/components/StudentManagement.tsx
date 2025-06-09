
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter,
  GraduationCap,
  BookOpen,
  Calendar,
  FileText
} from "lucide-react";

interface Student {
  id: string;
  name: string;
  class: string;
  grade: string;
  status: "ativo" | "inativo" | "transferido";
  average: number;
  attendance: number;
}

const mockStudents: Student[] = [
  { id: "1", name: "Ana Carolina Santos", class: "9º A", grade: "9º Ano", status: "ativo", average: 8.5, attendance: 95 },
  { id: "2", name: "Bruno Henrique Lima", class: "9º A", grade: "9º Ano", status: "ativo", average: 7.2, attendance: 88 },
  { id: "3", name: "Carlos Eduardo Silva", class: "8º B", grade: "8º Ano", status: "ativo", average: 9.1, attendance: 97 },
  { id: "4", name: "Daniela Souza Costa", class: "9º A", grade: "9º Ano", status: "transferido", average: 6.8, attendance: 82 },
  { id: "5", name: "Eduardo Ferreira", class: "8º B", grade: "8º Ano", status: "ativo", average: 8.9, attendance: 91 }
];

export const StudentManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("todos");

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === "todos" || student.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ativo": return "bg-success text-success-foreground";
      case "inativo": return "bg-warning text-warning-foreground";
      case "transferido": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const classes = ["todos", "9º A", "9º B", "8º A", "8º B"];

  return (
    <div className="space-y-6">
      <Card className="gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Gestão de Alunos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar aluno..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background"
            >
              {classes.map(cls => (
                <option key={cls} value={cls}>
                  {cls === "todos" ? "Todas as turmas" : cls}
                </option>
              ))}
            </select>
            <Button className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Novo Aluno
            </Button>
          </div>

          <div className="space-y-4">
            {filteredStudents.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{student.name}</div>
                    <div className="text-sm text-muted-foreground">{student.class} - {student.grade}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-sm font-medium">{student.average}</div>
                    <div className="text-xs text-muted-foreground">Média</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium">{student.attendance}%</div>
                    <div className="text-xs text-muted-foreground">Freq.</div>
                  </div>
                  <Badge className={getStatusColor(student.status)}>
                    {student.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    Ver Detalhes
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
