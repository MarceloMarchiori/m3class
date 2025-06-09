
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  GraduationCap, 
  UserPlus, 
  Search, 
  Calendar,
  FileText,
  TrendingUp,
  Users,
  AlertCircle
} from "lucide-react";
import { Enrollment } from "@/types/school";

interface Student {
  id: string;
  name: string;
  currentGrade: string;
  currentClass: string;
  enrollments: Enrollment[];
}

const mockStudents: Student[] = [
  {
    id: "1",
    name: "Ana Carolina Santos",
    currentGrade: "9º Ano",
    currentClass: "9º A",
    enrollments: [
      {
        id: "1",
        studentId: "1",
        academicYear: 2024,
        grade: "9º Ano",
        class: "9º A",
        enrollmentNumber: "2024901",
        status: "ativa",
        enrollmentDate: new Date("2024-02-01"),
        previousEnrollments: ["2023801"]
      }
    ]
  },
  {
    id: "2", 
    name: "Bruno Henrique Lima",
    currentGrade: "9º Ano",
    currentClass: "9º A",
    enrollments: [
      {
        id: "2",
        studentId: "2",
        academicYear: 2024,
        grade: "9º Ano",
        class: "9º A",
        enrollmentNumber: "2024902",
        status: "ativa",
        enrollmentDate: new Date("2024-02-01"),
        previousEnrollments: ["2023802"]
      }
    ]
  }
];

const generateEnrollmentNumber = (year: number, grade: string) => {
  const gradeCode = grade.includes("6º") ? "6" :
                   grade.includes("7º") ? "7" :
                   grade.includes("8º") ? "8" :
                   grade.includes("9º") ? "9" :
                   grade.includes("1º") ? "1" :
                   grade.includes("2º") ? "2" :
                   grade.includes("3º") ? "3" : "0";
  
  const sequential = Math.floor(Math.random() * 99) + 1;
  return `${year}${gradeCode}${sequential.toString().padStart(2, '0')}`;
};

export const EnrollmentSystem = () => {
  const [students] = useState<Student[]>(mockStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("todos");

  const currentYear = new Date().getFullYear();
  const activeEnrollments = students.flatMap(s => s.enrollments.filter(e => e.status === "ativa"));
  const enrollmentsByGrade = activeEnrollments.reduce((acc, enrollment) => {
    acc[enrollment.grade] = (acc[enrollment.grade] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === "todos" || student.currentGrade === selectedGrade;
    return matchesSearch && matchesGrade;
  });

  const grades = ["todos", "6º Ano", "7º Ano", "8º Ano", "9º Ano", "1º Ano EM", "2º Ano EM", "3º Ano EM"];

  const handleRenewEnrollment = (studentId: string) => {
    console.log(`Renovando matrícula para aluno ${studentId}`);
    // Lógica para renovar matrícula
  };

  const handleTransferStudent = (studentId: string) => {
    console.log(`Transferindo aluno ${studentId}`);
    // Lógica para transferir aluno
  };

  return (
    <div className="space-y-6">
      <Card className="gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Sistema de Matrícula Automática
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Estatísticas gerais */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{activeEnrollments.length}</div>
                <div className="text-sm text-muted-foreground">Matrículas Ativas {currentYear}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-success">485</div>
                <div className="text-sm text-muted-foreground">Vagas Totais</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-warning">23</div>
                <div className="text-sm text-muted-foreground">Lista de Espera</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-destructive">8</div>
                <div className="text-sm text-muted-foreground">Pendências</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="matriculas" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="matriculas">Matrículas Ativas</TabsTrigger>
              <TabsTrigger value="renovacao">Renovação Anual</TabsTrigger>
              <TabsTrigger value="historico">Histórico</TabsTrigger>
              <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
            </TabsList>

            <TabsContent value="matriculas" className="space-y-4">
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
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="px-3 py-2 border rounded-md bg-background"
                >
                  {grades.map(grade => (
                    <option key={grade} value={grade}>
                      {grade === "todos" ? "Todas as séries" : grade}
                    </option>
                  ))}
                </select>
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Nova Matrícula
                </Button>
              </div>

              {/* Estatísticas por série */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Matrículas por Série - {currentYear}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(enrollmentsByGrade).map(([grade, count]) => (
                      <div key={grade} className="text-center p-3 border rounded-lg">
                        <div className="text-lg font-bold">{count}</div>
                        <div className="text-sm text-muted-foreground">{grade}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Lista de alunos */}
              <Card>
                <CardHeader>
                  <CardTitle>Alunos Matriculados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredStudents.map((student) => {
                      const currentEnrollment = student.enrollments.find(e => e.status === "ativa");
                      return (
                        <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <GraduationCap className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium">{student.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {student.currentClass} - {student.currentGrade}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <div className="text-center">
                              <div className="text-sm font-medium">{currentEnrollment?.enrollmentNumber}</div>
                              <div className="text-xs text-muted-foreground">Nº Matrícula</div>
                            </div>
                            <div className="text-center">
                              <div className="text-sm font-medium">
                                {currentEnrollment?.enrollmentDate.toLocaleDateString()}
                              </div>
                              <div className="text-xs text-muted-foreground">Data Matrícula</div>
                            </div>
                            <Badge variant="default">
                              {currentEnrollment?.status}
                            </Badge>
                            <Button variant="outline" size="sm">
                              Ver Histórico
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="renovacao">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Renovação Anual de Matrículas - {currentYear + 1}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-warning/10 border border-warning rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
                      <div>
                        <div className="font-medium text-warning">Período de Renovação</div>
                        <div className="text-sm text-muted-foreground">
                          As renovações para {currentYear + 1} devem ser confirmadas até 30/11/{currentYear}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {students.map(student => (
                      <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <div className="text-sm text-muted-foreground">
                              Atual: {student.currentGrade} → Próximo: {student.currentGrade === "9º Ano" ? "1º Ano EM" : "Próxima série"}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">
                            Novo nº: {generateEnrollmentNumber(currentYear + 1, "1º Ano EM")}
                          </Badge>
                          <Button size="sm" onClick={() => handleRenewEnrollment(student.id)}>
                            Renovar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="historico">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Histórico de Matrículas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Funcionalidade de histórico completo será implementada na próxima fase.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="relatorios">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Relatórios de Matrícula
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="h-20 flex flex-col gap-2">
                      <Users className="h-6 w-6" />
                      <span>Relatório de Matrículas Ativas</span>
                    </Button>
                    
                    <Button variant="outline" className="h-20 flex flex-col gap-2">
                      <FileText className="h-6 w-6" />
                      <span>Comprovantes de Matrícula</span>
                    </Button>
                    
                    <Button variant="outline" className="h-20 flex flex-col gap-2">
                      <TrendingUp className="h-6 w-6" />
                      <span>Estatísticas de Evasão</span>
                    </Button>
                    
                    <Button variant="outline" className="h-20 flex flex-col gap-2">
                      <Calendar className="h-6 w-6" />
                      <span>Renovações Pendentes</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
