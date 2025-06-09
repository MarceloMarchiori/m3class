
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Teacher, AcademicFormation } from "@/types/school";
import { GraduationCap, Award, BookOpen, Star, Plus, Trash2 } from "lucide-react";

interface TeacherFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (teacher: Teacher) => void;
  teacher?: Teacher | null;
}

export const TeacherFormModal = ({ isOpen, onClose, onSave, teacher }: TeacherFormModalProps) => {
  const [formData, setFormData] = useState<Teacher>({
    id: "",
    personalData: {
      fullName: "",
      cpf: "",
      rg: "",
      birthDate: new Date(),
      address: {
        street: "",
        number: "",
        complement: "",
        neighborhood: "",
        city: "",
        state: "",
        zipCode: ""
      },
      contacts: [
        { type: "celular", value: "", isPrimary: true },
        { type: "email", value: "", isPrimary: true }
      ]
    },
    professionalData: {
      position: "Professor",
      department: "Pedagogico",
      salary: 0,
      workload: 40,
      hireDate: new Date(),
      contractType: "clt",
      status: "ativo"
    },
    documents: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    academicFormation: [],
    authorizedSubjects: [],
    professionalRegistry: "",
    performance: {
      averageGrade: 0,
      studentFeedback: 0,
      punctuality: 0,
      lastEvaluation: new Date(),
      observations: ""
    },
    specializations: []
  });

  useEffect(() => {
    if (teacher) {
      setFormData(teacher);
    } else {
      // Reset form
      setFormData({
        id: "",
        personalData: {
          fullName: "",
          cpf: "",
          rg: "",
          birthDate: new Date(),
          address: {
            street: "",
            number: "",
            complement: "",
            neighborhood: "",
            city: "",
            state: "",
            zipCode: ""
          },
          contacts: [
            { type: "celular", value: "", isPrimary: true },
            { type: "email", value: "", isPrimary: true }
          ]
        },
        professionalData: {
          position: "Professor",
          department: "Pedagogico",
          salary: 0,
          workload: 40,
          hireDate: new Date(),
          contractType: "clt",
          status: "ativo"
        },
        documents: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        academicFormation: [],
        authorizedSubjects: [],
        professionalRegistry: "",
        performance: {
          averageGrade: 0,
          studentFeedback: 0,
          punctuality: 0,
          lastEvaluation: new Date(),
          observations: ""
        },
        specializations: []
      });
    }
  }, [teacher, isOpen]);

  const addAcademicFormation = () => {
    const newFormation: AcademicFormation = {
      id: Date.now().toString(),
      degree: "graduacao",
      course: "",
      institution: "",
      completionYear: new Date().getFullYear(),
      document: {
        id: Date.now().toString(),
        type: "diploma",
        name: "",
        url: "",
        uploadDate: new Date()
      }
    };
    setFormData(prev => ({
      ...prev,
      academicFormation: [...prev.academicFormation, newFormation]
    }));
  };

  const removeAcademicFormation = (index: number) => {
    setFormData(prev => ({
      ...prev,
      academicFormation: prev.academicFormation.filter((_, i) => i !== index)
    }));
  };

  const updateAcademicFormation = (index: number, field: keyof AcademicFormation, value: any) => {
    setFormData(prev => ({
      ...prev,
      academicFormation: prev.academicFormation.map((formation, i) => 
        i === index ? { ...formation, [field]: value } : formation
      )
    }));
  };

  const addSubject = () => {
    const subject = prompt("Digite o nome da matéria:");
    if (subject && !formData.authorizedSubjects.includes(subject)) {
      setFormData(prev => ({
        ...prev,
        authorizedSubjects: [...prev.authorizedSubjects, subject]
      }));
    }
  };

  const removeSubject = (index: number) => {
    setFormData(prev => ({
      ...prev,
      authorizedSubjects: prev.authorizedSubjects.filter((_, i) => i !== index)
    }));
  };

  const addSpecialization = () => {
    const specialization = prompt("Digite a especialização:");
    if (specialization && !formData.specializations.includes(specialization)) {
      setFormData(prev => ({
        ...prev,
        specializations: [...prev.specializations, specialization]
      }));
    }
  };

  const removeSpecialization = (index: number) => {
    setFormData(prev => ({
      ...prev,
      specializations: prev.specializations.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      updatedAt: new Date()
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            {teacher ? "Editar Professor" : "Novo Professor"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="basic" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Dados Básicos</TabsTrigger>
              <TabsTrigger value="academic">Formação</TabsTrigger>
              <TabsTrigger value="subjects">Matérias</TabsTrigger>
              <TabsTrigger value="performance">Avaliação</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Nome Completo *</Label>
                  <Input
                    id="fullName"
                    value={formData.personalData.fullName}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      personalData: { ...prev.personalData, fullName: e.target.value }
                    }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="professionalRegistry">Registro Profissional</Label>
                  <Input
                    id="professionalRegistry"
                    value={formData.professionalRegistry}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      professionalRegistry: e.target.value
                    }))}
                    placeholder="Ex: CREF 12345-SP"
                  />
                </div>
                <div>
                  <Label htmlFor="cpf">CPF *</Label>
                  <Input
                    id="cpf"
                    value={formData.personalData.cpf}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      personalData: { ...prev.personalData, cpf: e.target.value }
                    }))}
                    placeholder="000.000.000-00"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="salary">Salário (R$)</Label>
                  <Input
                    id="salary"
                    type="number"
                    value={formData.professionalData.salary}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      professionalData: { ...prev.professionalData, salary: Number(e.target.value) }
                    }))}
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <Label htmlFor="workload">Carga Horária (h/semana) *</Label>
                  <Input
                    id="workload"
                    type="number"
                    value={formData.professionalData.workload}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      professionalData: { ...prev.professionalData, workload: Number(e.target.value) }
                    }))}
                    min="1"
                    max="44"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="hireDate">Data de Contratação *</Label>
                  <Input
                    id="hireDate"
                    type="date"
                    value={formData.professionalData.hireDate.toISOString().split('T')[0]}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      professionalData: { ...prev.professionalData, hireDate: new Date(e.target.value) }
                    }))}
                    required
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="academic" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Formação Acadêmica
                    </span>
                    <Button type="button" onClick={addAcademicFormation} size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Adicionar
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formData.academicFormation.map((formation, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-medium">Formação {index + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAcademicFormation(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <Label>Grau *</Label>
                          <select
                            value={formation.degree}
                            onChange={(e) => updateAcademicFormation(index, "degree", e.target.value)}
                            className="w-full px-3 py-2 border rounded-md bg-background"
                            required
                          >
                            <option value="graduacao">Graduação</option>
                            <option value="pos_graduacao">Pós-graduação</option>
                            <option value="mestrado">Mestrado</option>
                            <option value="doutorado">Doutorado</option>
                          </select>
                        </div>
                        <div>
                          <Label>Curso *</Label>
                          <Input
                            value={formation.course}
                            onChange={(e) => updateAcademicFormation(index, "course", e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label>Instituição *</Label>
                          <Input
                            value={formation.institution}
                            onChange={(e) => updateAcademicFormation(index, "institution", e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label>Ano de Conclusão *</Label>
                          <Input
                            type="number"
                            value={formation.completionYear}
                            onChange={(e) => updateAcademicFormation(index, "completionYear", Number(e.target.value))}
                            min="1950"
                            max={new Date().getFullYear()}
                            required
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                  {formData.academicFormation.length === 0 && (
                    <p className="text-muted-foreground text-center py-4">
                      Nenhuma formação acadêmica cadastrada.
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Especializações</span>
                    <Button type="button" onClick={addSpecialization} size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Adicionar
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {formData.specializations.map((spec, index) => (
                      <div key={index} className="flex items-center gap-1 bg-muted px-2 py-1 rounded">
                        <span className="text-sm">{spec}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSpecialization(index)}
                          className="h-auto p-0 w-4 h-4"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  {formData.specializations.length === 0 && (
                    <p className="text-muted-foreground text-center py-4">
                      Nenhuma especialização cadastrada.
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="subjects" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Matérias Autorizadas
                    </span>
                    <Button type="button" onClick={addSubject} size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Adicionar Matéria
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {formData.authorizedSubjects.map((subject, index) => (
                      <div key={index} className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded">
                        <span>{subject}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSubject(index)}
                          className="h-auto p-0 w-4 h-4"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  {formData.authorizedSubjects.length === 0 && (
                    <p className="text-muted-foreground text-center py-4">
                      Nenhuma matéria autorizada.
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Avaliação de Desempenho
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="averageGrade">Média Geral (0-10)</Label>
                      <Input
                        id="averageGrade"
                        type="number"
                        value={formData.performance.averageGrade}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          performance: { ...prev.performance, averageGrade: Number(e.target.value) }
                        }))}
                        min="0"
                        max="10"
                        step="0.1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="studentFeedback">Feedback dos Alunos (0-10)</Label>
                      <Input
                        id="studentFeedback"
                        type="number"
                        value={formData.performance.studentFeedback}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          performance: { ...prev.performance, studentFeedback: Number(e.target.value) }
                        }))}
                        min="0"
                        max="10"
                        step="0.1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="punctuality">Pontualidade (0-10)</Label>
                      <Input
                        id="punctuality"
                        type="number"
                        value={formData.performance.punctuality}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          performance: { ...prev.performance, punctuality: Number(e.target.value) }
                        }))}
                        min="0"
                        max="10"
                        step="0.1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="lastEvaluation">Data da Última Avaliação</Label>
                    <Input
                      id="lastEvaluation"
                      type="date"
                      value={formData.performance.lastEvaluation.toISOString().split('T')[0]}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        performance: { ...prev.performance, lastEvaluation: new Date(e.target.value) }
                      }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="observations">Observações</Label>
                    <Textarea
                      id="observations"
                      value={formData.performance.observations}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        performance: { ...prev.performance, observations: e.target.value }
                      }))}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {teacher ? "Salvar Alterações" : "Cadastrar Professor"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
