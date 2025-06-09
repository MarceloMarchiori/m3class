
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  BookOpen, 
  Calendar, 
  MessageSquare,
  TrendingUp,
  Clock,
  Award,
  AlertCircle
} from "lucide-react";

interface Child {
  id: string;
  name: string;
  class: string;
  grade: string;
  average: number;
  attendance: number;
  nextExam?: string;
  pendingTasks: number;
  recentGrades: { subject: string; grade: number; date: string }[];
  alerts: string[];
}

const mockChildren: Child[] = [
  {
    id: "1",
    name: "João Santos",
    class: "9º A",
    grade: "9º Ano",
    average: 8.7,
    attendance: 96,
    nextExam: "Matemática - 15/06",
    pendingTasks: 2,
    recentGrades: [
      { subject: "Matemática", grade: 9.0, date: "10/06" },
      { subject: "Português", grade: 8.5, date: "08/06" },
      { subject: "História", grade: 8.8, date: "05/06" }
    ],
    alerts: ["Reunião de pais marcada para 20/06"]
  },
  {
    id: "2",
    name: "Maria Santos",
    class: "6º B",
    grade: "6º Ano",
    average: 9.2,
    attendance: 98,
    nextExam: "Ciências - 18/06",
    pendingTasks: 1,
    recentGrades: [
      { subject: "Ciências", grade: 9.5, date: "12/06" },
      { subject: "Matemática", grade: 9.0, date: "10/06" },
      { subject: "Arte", grade: 9.8, date: "07/06" }
    ],
    alerts: []
  }
];

export const ChildrenOverview = () => {
  const getGradeColor = (grade: number) => {
    if (grade >= 9) return "text-success";
    if (grade >= 7) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className="space-y-6">
      {mockChildren.map((child) => (
        <Card key={child.id} className="gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {child.name}
                <Badge variant="secondary">{child.class}</Badge>
              </div>
              <div className="flex gap-2">
                <Badge className="bg-success text-success-foreground">
                  Média: {child.average}
                </Badge>
                <Badge variant="outline">
                  Freq: {child.attendance}%
                </Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="notas" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="notas">Notas Recentes</TabsTrigger>
                <TabsTrigger value="calendario">Calendário</TabsTrigger>
                <TabsTrigger value="tarefas">Tarefas</TabsTrigger>
                <TabsTrigger value="comunicados">Comunicados</TabsTrigger>
              </TabsList>

              <TabsContent value="notas" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {child.recentGrades.map((grade, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{grade.subject}</span>
                        <Badge className={getGradeColor(grade.grade)}>
                          {grade.grade}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">{grade.date}</div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="calendario" className="space-y-4">
                <div className="space-y-3">
                  {child.nextExam && (
                    <div className="flex items-center gap-3 p-3 border rounded-lg bg-info/10">
                      <Calendar className="h-5 w-5 text-info" />
                      <div>
                        <div className="font-medium">Próxima Avaliação</div>
                        <div className="text-sm text-muted-foreground">{child.nextExam}</div>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">Reunião de Pais</div>
                      <div className="text-sm text-muted-foreground">20/06/2024 às 19h</div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="tarefas" className="space-y-4">
                <div className="flex items-center gap-3 p-4 border rounded-lg">
                  <Clock className="h-5 w-5 text-warning" />
                  <div className="flex-1">
                    <div className="font-medium">Tarefas Pendentes</div>
                    <div className="text-sm text-muted-foreground">
                      {child.pendingTasks} tarefa(s) para entregar
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Ver Todas</Button>
                </div>
              </TabsContent>

              <TabsContent value="comunicados" className="space-y-4">
                {child.alerts.length > 0 ? (
                  child.alerts.map((alert, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 border rounded-lg bg-warning/10">
                      <AlertCircle className="h-5 w-5 text-warning" />
                      <div className="font-medium">{alert}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    Nenhum comunicado pendente
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
