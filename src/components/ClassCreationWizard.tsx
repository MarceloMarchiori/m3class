
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, Check, Users, GraduationCap, Calendar } from 'lucide-react';

interface Teacher {
  id: string;
  name: string;
  subjects: string[];
}

interface ClassData {
  name: string;
  grade: string;
  year: string;
  shift: string;
  teacherId: string;
  maxStudents: number;
  subjects: string[];
}

interface ClassCreationWizardProps {
  onComplete: (classData: ClassData) => void;
  onCancel: () => void;
}

export const ClassCreationWizard: React.FC<ClassCreationWizardProps> = ({ onComplete, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [classData, setClassData] = useState<ClassData>({
    name: '',
    grade: '',
    year: new Date().getFullYear().toString(),
    shift: '',
    teacherId: '',
    maxStudents: 30,
    subjects: []
  });

  // Mock data - em produção viria do banco
  const teachers: Teacher[] = [
    { id: '1', name: 'Maria Silva', subjects: ['Matemática', 'Física'] },
    { id: '2', name: 'João Santos', subjects: ['Português', 'Literatura'] },
    { id: '3', name: 'Ana Costa', subjects: ['História', 'Geografia'] },
  ];

  const availableSubjects = ['Matemática', 'Português', 'História', 'Geografia', 'Ciências', 'Física', 'Química', 'Biologia'];

  const steps = [
    { number: 1, title: 'Informações Básicas', icon: Users },
    { number: 2, title: 'Professor Responsável', icon: GraduationCap },
    { number: 3, title: 'Matérias e Horários', icon: Calendar },
  ];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(classData);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleSubject = (subject: string) => {
    setClassData({
      ...classData,
      subjects: classData.subjects.includes(subject)
        ? classData.subjects.filter(s => s !== subject)
        : [...classData.subjects, subject]
    });
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return classData.name && classData.grade && classData.shift;
      case 2:
        return classData.teacherId;
      case 3:
        return classData.subjects.length > 0;
      default:
        return false;
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto w-full pb-2">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center gap-2 min-w-fit">
              <div className={`
                flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium
                ${currentStep >= step.number 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
                }
              `}>
                {currentStep > step.number ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <step.icon className="h-4 w-4" />
                )}
              </div>
              <span className="text-sm font-medium hidden sm:inline">{step.title}</span>
              {index < steps.length - 1 && (
                <div className="w-8 sm:w-12 h-px bg-border mx-2" />
              )}
            </div>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {steps[currentStep - 1].title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Etapa 1: Informações Básicas */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome da Turma</Label>
                  <Input
                    id="name"
                    value={classData.name}
                    onChange={(e) => setClassData({ ...classData, name: e.target.value })}
                    placeholder="Ex: 5º Ano A"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grade">Série/Ano</Label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={classData.grade}
                    onChange={(e) => setClassData({ ...classData, grade: e.target.value })}
                  >
                    <option value="">Selecione</option>
                    <option value="1">1º Ano</option>
                    <option value="2">2º Ano</option>
                    <option value="3">3º Ano</option>
                    <option value="4">4º Ano</option>
                    <option value="5">5º Ano</option>
                    <option value="6">6º Ano</option>
                    <option value="7">7º Ano</option>
                    <option value="8">8º Ano</option>
                    <option value="9">9º Ano</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="year">Ano Letivo</Label>
                  <Input
                    id="year"
                    type="number"
                    value={classData.year}
                    onChange={(e) => setClassData({ ...classData, year: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shift">Turno</Label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={classData.shift}
                    onChange={(e) => setClassData({ ...classData, shift: e.target.value })}
                  >
                    <option value="">Selecione</option>
                    <option value="matutino">Matutino</option>
                    <option value="vespertino">Vespertino</option>
                    <option value="noturno">Noturno</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxStudents">Número Máximo de Alunos</Label>
                <Input
                  id="maxStudents"
                  type="number"
                  value={classData.maxStudents}
                  onChange={(e) => setClassData({ ...classData, maxStudents: parseInt(e.target.value) })}
                  min="1"
                  max="50"
                />
              </div>
            </div>
          )}

          {/* Etapa 2: Professor Responsável */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Selecione o professor responsável pela turma
              </p>
              <div className="grid grid-cols-1 gap-3">
                {teachers.map((teacher) => (
                  <Card 
                    key={teacher.id}
                    className={`p-4 cursor-pointer transition-colors ${
                      classData.teacherId === teacher.id 
                        ? 'border-primary bg-primary/5' 
                        : 'hover:bg-muted/50'
                    }`}
                    onClick={() => setClassData({ ...classData, teacherId: teacher.id })}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h3 className="font-medium">{teacher.name}</h3>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {teacher.subjects.map((subject) => (
                            <Badge key={subject} variant="outline" className="text-xs">
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      {classData.teacherId === teacher.id && (
                        <Check className="h-5 w-5 text-primary" />
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Etapa 3: Matérias */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Selecione as matérias que serão ministradas nesta turma
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {availableSubjects.map((subject) => (
                  <Card
                    key={subject}
                    className={`p-3 cursor-pointer transition-colors ${
                      classData.subjects.includes(subject)
                        ? 'border-primary bg-primary/5'
                        : 'hover:bg-muted/50'
                    }`}
                    onClick={() => toggleSubject(subject)}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium">{subject}</span>
                      {classData.subjects.includes(subject) && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </div>
                  </Card>
                ))}
              </div>
              {classData.subjects.length > 0 && (
                <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm font-medium mb-2">Matérias selecionadas:</p>
                  <div className="flex flex-wrap gap-1">
                    {classData.subjects.map((subject) => (
                      <Badge key={subject} variant="default">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-3 pt-6 border-t">
            <Button
              variant="outline"
              onClick={currentStep === 1 ? onCancel : handleBack}
              className="w-full sm:w-auto"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {currentStep === 1 ? 'Cancelar' : 'Voltar'}
            </Button>
            <Button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="w-full sm:w-auto"
            >
              {currentStep === 3 ? 'Criar Turma' : 'Próximo'}
              {currentStep < 3 && <ArrowRight className="h-4 w-4 ml-2" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
