
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  GraduationCap, 
  Plus, 
  Search, 
  Edit,
  Trash2,
  BookOpen,
  Award,
  Star,
  User,
  Phone,
  Mail
} from "lucide-react";
import { Teacher } from "@/types/school";
import { TeacherFormModal } from "./TeacherFormModal";

const mockTeachers: Teacher[] = [
  {
    id: "1",
    personalData: {
      fullName: "Prof. Carlos Eduardo Silva",
      cpf: "111.222.333-44",
      rg: "11.222.333-4",
      birthDate: new Date("1980-05-15"),
      address: {
        street: "Rua dos Professores",
        number: "789",
        neighborhood: "Jardim Educação",
        city: "São Paulo",
        state: "SP",
        zipCode: "03456-789"
      },
      contacts: [
        { type: "celular", value: "(11) 99876-5432", isPrimary: true },
        { type: "email", value: "carlos.silva@escola.com", isPrimary: true }
      ]
    },
    professionalData: {
      position: "Professor",
      department: "Pedagogico",
      salary: 5500,
      workload: 40,
      hireDate: new Date("2018-02-01"),
      contractType: "clt",
      status: "ativo"
    },
    documents: [],
    createdAt: new Date("2018-02-01"),
    updatedAt: new Date(),
    academicFormation: [
      {
        id: "1",
        degree: "graduacao",
        course: "Licenciatura em Matemática",
        institution: "USP",
        completionYear: 2005,
        document: {
          id: "1",
          type: "diploma",
          name: "Diploma de Graduação",
          url: "",
          uploadDate: new Date()
        }
      },
      {
        id: "2",
        degree: "pos_graduacao",
        course: "Especialização em Educação Matemática",
        institution: "PUC-SP",
        completionYear: 2008,
        document: {
          id: "2",
          type: "certificado",
          name: "Certificado de Especialização",
          url: "",
          uploadDate: new Date()
        }
      }
    ],
    authorizedSubjects: ["Matemática", "Física", "Geometria"],
    professionalRegistry: "CREF 12345-SP",
    performance: {
      averageGrade: 8.7,
      studentFeedback: 9.1,
      punctuality: 9.5,
      lastEvaluation: new Date("2024-03-01"),
      observations: "Excelente desempenho com alunos do ensino médio."
    },
    specializations: ["Educação Inclusiva", "Tecnologia Educacional"]
  }
];

export const TeacherManagement = () => {
  const [teachers, setTeachers] = useState<Teacher[]>(mockTeachers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);

  const getPerformanceColor = (score: number) => {
    if (score >= 9) return "bg-green-100 text-green-800";
    if (score >= 7) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const getPerformanceLabel = (score: number) => {
    if (score >= 9) return "Excelente";
    if (score >= 7) return "Bom";
    return "Regular";
  };

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.personalData.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.authorizedSubjects.some(subject => 
                           subject.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    const matchesSubject = selectedSubject === "all" || 
                          teacher.authorizedSubjects.includes(selectedSubject);
    return matchesSearch && matchesSubject;
  });

  const allSubjects = Array.from(new Set(teachers.flatMap(teacher => teacher.authorizedSubjects)));

  const handleSave = (teacherData: Teacher) => {
    if (editingTeacher) {
      setTeachers(prev => prev.map(teacher => 
        teacher.id === editingTeacher.id ? { ...teacherData, id: editingTeacher.id } : teacher
      ));
    } else {
      setTeachers(prev => [...prev, { ...teacherData, id: Date.now().toString() }]);
    }
    setIsModalOpen(false);
    setEditingTeacher(null);
  };

  const handleEdit = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setTeachers(prev => prev.filter(teacher => teacher.id !== id));
  };

  return (
    <div className="space-y-6">
      <Card className="gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Gestão de Professores
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filtros e Busca */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar professor ou matéria..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background"
            >
              <option value="all">Todas as Matérias</option>
              {allSubjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
            
            <Button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Novo Professor
            </Button>
          </div>

          {/* Lista de Professores */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTeachers.map((teacher) => (
              <Card key={teacher.id} className="hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <GraduationCap className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{teacher.personalData.fullName}</h3>
                        <p className="text-sm text-muted-foreground">{teacher.professionalRegistry}</p>
                      </div>
                    </div>
                    <Badge className={`${getPerformanceColor(teacher.performance.averageGrade)}`}>
                      {getPerformanceLabel(teacher.performance.averageGrade)}
                    </Badge>
                  </div>
                  
                  {/* Formação Acadêmica */}
                  <div className="space-y-2 mb-4">
                    <h4 className="text-sm font-medium flex items-center gap-1">
                      <Award className="h-4 w-4" />
                      Formação
                    </h4>
                    {teacher.academicFormation.map((formation, index) => (
                      <div key={index} className="text-xs text-muted-foreground">
                        {formation.degree === "graduacao" ? "Graduação" : 
                         formation.degree === "pos_graduacao" ? "Pós-graduação" :
                         formation.degree === "mestrado" ? "Mestrado" : "Doutorado"} em {formation.course}
                      </div>
                    ))}
                  </div>

                  {/* Matérias */}
                  <div className="space-y-2 mb-4">
                    <h4 className="text-sm font-medium flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      Matérias
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {teacher.authorizedSubjects.map((subject, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Performance */}
                  <div className="space-y-2 mb-4">
                    <h4 className="text-sm font-medium flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      Avaliação
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>Média Geral: {teacher.performance.averageGrade}</div>
                      <div>Feedback: {teacher.performance.studentFeedback}</div>
                      <div>Pontualidade: {teacher.performance.punctuality}</div>
                      <div className="col-span-2 text-muted-foreground truncate">
                        {teacher.performance.observations}
                      </div>
                    </div>
                  </div>

                  {/* Contatos */}
                  <div className="space-y-1 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <Phone className="h-3 w-3" />
                      <span>{teacher.personalData.contacts.find(c => c.type === "celular")?.value}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-3 w-3" />
                      <span className="truncate">{teacher.personalData.contacts.find(c => c.type === "email")?.value}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(teacher)}
                      className="flex-1"
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(teacher.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTeachers.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Nenhum professor encontrado.
            </div>
          )}
        </CardContent>
      </Card>

      <TeacherFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTeacher(null);
        }}
        onSave={handleSave}
        teacher={editingTeacher}
      />
    </div>
  );
};
