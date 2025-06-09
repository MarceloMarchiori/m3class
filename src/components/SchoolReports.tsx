
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  FileText,
  Download,
  Calendar,
  School,
  Award
} from "lucide-react";

const mockSchoolStats = {
  totalStudents: 485,
  totalTeachers: 28,
  totalClasses: 18,
  averageGrade: 8.1,
  attendanceRate: 94.2,
  approvalRate: 91.5
};

const mockClassPerformance = [
  { class: "9º A", students: 32, average: 8.5, attendance: 95.2 },
  { class: "9º B", students: 30, average: 8.1, attendance: 93.8 },
  { class: "8º A", students: 28, average: 8.7, attendance: 96.1 },
  { class: "8º B", students: 29, average: 7.9, attendance: 92.4 },
  { class: "7º A", students: 31, average: 8.3, attendance: 94.7 }
];

const mockSubjectPerformance = [
  { subject: "Matemática", average: 7.8, teachers: 4 },
  { subject: "Português", average: 8.4, teachers: 4 },
  { subject: "História", average: 8.1, teachers: 2 },
  { subject: "Geografia", average: 8.3, teachers: 2 },
  { subject: "Ciências", average: 8.0, teachers: 3 },
  { subject: "Inglês", average: 7.9, teachers: 2 }
];

export const SchoolReports = () => {
  const getPerformanceColor = (value: number, type: "grade" | "attendance") => {
    if (type === "grade") {
      if (value >= 8.5) return "text-success";
      if (value >= 7.0) return "text-warning";
      return "text-destructive";
    } else {
      if (value >= 95) return "text-success";
      if (value >= 90) return "text-warning";
      return "text-destructive";
    }
  };

  return (
    <div className="space-y-6">
      {/* Estatísticas Gerais */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <div className="text-2xl font-bold">{mockSchoolStats.totalStudents}</div>
                <div className="text-sm text-muted-foreground">Alunos</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <School className="h-8 w-8 text-primary" />
              <div>
                <div className="text-2xl font-bold">{mockSchoolStats.totalTeachers}</div>
                <div className="text-sm text-muted-foreground">Professores</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-primary" />
              <div>
                <div className="text-2xl font-bold">{mockSchoolStats.totalClasses}</div>
                <div className="text-sm text-muted-foreground">Turmas</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Award className="h-8 w-8 text-success" />
              <div>
                <div className="text-2xl font-bold">{mockSchoolStats.averageGrade}</div>
                <div className="text-sm text-muted-foreground">Média Geral</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-success" />
              <div>
                <div className="text-2xl font-bold">{mockSchoolStats.attendanceRate}%</div>
                <div className="text-sm text-muted-foreground">Frequência</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-success" />
              <div>
                <div className="text-2xl font-bold">{mockSchoolStats.approvalRate}%</div>
                <div className="text-sm text-muted-foreground">Aprovação</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Relatórios Detalhados */}
      <Card className="gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Relatórios Acadêmicos
            </div>
            <Button className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Exportar Relatório
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="turmas" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="turmas">Desempenho por Turma</TabsTrigger>
              <TabsTrigger value="disciplinas">Desempenho por Disciplina</TabsTrigger>
            </TabsList>

            <TabsContent value="turmas" className="space-y-4">
              <div className="space-y-3">
                {mockClassPerformance.map((classData, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <School className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{classData.class}</div>
                        <div className="text-sm text-muted-foreground">{classData.students} alunos</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className={`text-lg font-bold ${getPerformanceColor(classData.average, "grade")}`}>
                          {classData.average}
                        </div>
                        <div className="text-xs text-muted-foreground">Média</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-lg font-bold ${getPerformanceColor(classData.attendance, "attendance")}`}>
                          {classData.attendance}%
                        </div>
                        <div className="text-xs text-muted-foreground">Frequência</div>
                      </div>
                      <Button variant="outline" size="sm">
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="disciplinas" className="space-y-4">
              <div className="space-y-3">
                {mockSubjectPerformance.map((subject, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                        <BarChart3 className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <div className="font-medium">{subject.subject}</div>
                        <div className="text-sm text-muted-foreground">{subject.teachers} professor(es)</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className={`text-lg font-bold ${getPerformanceColor(subject.average, "grade")}`}>
                          {subject.average}
                        </div>
                        <div className="text-xs text-muted-foreground">Média</div>
                      </div>
                      <Button variant="outline" size="sm">
                        Ver Relatório
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
