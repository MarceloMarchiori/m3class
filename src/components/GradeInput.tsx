
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BaseStudent {
  id: string;
  name: string;
}

interface StudentWithGrade extends BaseStudent {
  grade?: number;
  observation?: string;
}

interface GradeInputProps {
  students: BaseStudent[];
  subject: string;
  onSave: (grades: StudentWithGrade[]) => void;
}

export const GradeInput = ({ students, subject, onSave }: GradeInputProps) => {
  const [grades, setGrades] = useState<StudentWithGrade[]>(
    students.map(student => ({ ...student }))
  );
  const [currentAssignment, setCurrentAssignment] = useState("");
  const { toast } = useToast();

  const updateGrade = (studentId: string, grade: number) => {
    setGrades(prev => prev.map(student => 
      student.id === studentId ? { ...student, grade } : student
    ));
  };

  const updateObservation = (studentId: string, observation: string) => {
    setGrades(prev => prev.map(student => 
      student.id === studentId ? { ...student, observation } : student
    ));
  };

  const handleSave = () => {
    onSave(grades);
    toast({
      title: "Notas salvas com sucesso!",
      description: `As notas de ${subject} foram atualizadas.`,
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Lançamento de Notas - {subject}
        </CardTitle>
        <div className="flex gap-4">
          <div className="flex-1">
            <Label htmlFor="assignment">Atividade/Avaliação</Label>
            <Input
              id="assignment"
              placeholder="Ex: Prova Bimestral, Trabalho em Grupo..."
              value={currentAssignment}
              onChange={(e) => setCurrentAssignment(e.target.value)}
            />
          </div>
          <div className="w-32">
            <Label htmlFor="type">Tipo</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="prova">Prova</SelectItem>
                <SelectItem value="trabalho">Trabalho</SelectItem>
                <SelectItem value="exercicio">Exercício</SelectItem>
                <SelectItem value="projeto">Projeto</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {grades.map((student) => (
          <div key={student.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex-1">
              <div className="font-medium">{student.name}</div>
            </div>
            <div className="w-20">
              <Input
                type="number"
                placeholder="Nota"
                min="0"
                max="10"
                step="0.1"
                value={student.grade || ""}
                onChange={(e) => updateGrade(student.id, parseFloat(e.target.value))}
                className="text-center"
              />
            </div>
            <div className="w-64">
              <Textarea
                placeholder="Observação (opcional)"
                value={student.observation || ""}
                onChange={(e) => updateObservation(student.id, e.target.value)}
                className="min-h-[60px]"
              />
            </div>
          </div>
        ))}
        
        <div className="flex justify-end pt-4">
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Salvar Notas
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
