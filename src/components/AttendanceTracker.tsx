
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BaseStudent {
  id: string;
  name: string;
}

interface StudentWithAttendance extends BaseStudent {
  status: "presente" | "ausente" | "atrasado" | null;
}

interface AttendanceTrackerProps {
  students: BaseStudent[];
  onSave: (attendance: StudentWithAttendance[]) => void;
  date?: string;
}

export const AttendanceTracker = ({ students, onSave, date = new Date().toLocaleDateString() }: AttendanceTrackerProps) => {
  const [attendance, setAttendance] = useState<StudentWithAttendance[]>(
    students.map(student => ({ ...student, status: null }))
  );
  const { toast } = useToast();

  const updateAttendance = (studentId: string, status: "presente" | "ausente" | "atrasado") => {
    setAttendance(prev => prev.map(student => 
      student.id === studentId ? { ...student, status } : student
    ));
  };

  const handleSave = () => {
    onSave(attendance);
    toast({
      title: "Frequência salva com sucesso!",
      description: `A frequência do dia ${date} foi registrada.`,
    });
  };

  const getStatusBadge = (status: StudentWithAttendance["status"]) => {
    switch (status) {
      case "presente":
        return <Badge className="bg-success text-success-foreground">Presente</Badge>;
      case "ausente":
        return <Badge variant="destructive">Ausente</Badge>;
      case "atrasado":
        return <Badge className="bg-warning text-warning-foreground">Atrasado</Badge>;
      default:
        return <Badge variant="outline">Não marcado</Badge>;
    }
  };

  const getStats = () => {
    const presente = attendance.filter(s => s.status === "presente").length;
    const ausente = attendance.filter(s => s.status === "ausente").length;
    const atrasado = attendance.filter(s => s.status === "atrasado").length;
    const total = attendance.length;
    
    return { presente, ausente, atrasado, total };
  };

  const stats = getStats();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Controle de Frequência - {date}</span>
          <div className="flex gap-2 text-sm">
            <span className="text-success">✓ {stats.presente}</span>
            <span className="text-destructive">✗ {stats.ausente}</span>
            <span className="text-warning">⏰ {stats.atrasado}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {attendance.map((student) => (
          <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="font-medium">{student.name}</div>
              {getStatusBadge(student.status)}
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={student.status === "presente" ? "default" : "outline"}
                size="sm"
                onClick={() => updateAttendance(student.id, "presente")}
                className="flex items-center gap-1"
              >
                <CheckCircle className="h-4 w-4" />
                Presente
              </Button>
              <Button
                variant={student.status === "atrasado" ? "default" : "outline"}
                size="sm"
                onClick={() => updateAttendance(student.id, "atrasado")}
                className="flex items-center gap-1"
              >
                <Clock className="h-4 w-4" />
                Atrasado
              </Button>
              <Button
                variant={student.status === "ausente" ? "destructive" : "outline"}
                size="sm"
                onClick={() => updateAttendance(student.id, "ausente")}
                className="flex items-center gap-1"
              >
                <XCircle className="h-4 w-4" />
                Ausente
              </Button>
            </div>
          </div>
        ))}
        
        <div className="flex justify-between items-center pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            Total: {stats.total} alunos | 
            Presentes: {stats.presente} | 
            Ausentes: {stats.ausente} | 
            Atrasados: {stats.atrasado}
          </div>
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Salvar Frequência
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
