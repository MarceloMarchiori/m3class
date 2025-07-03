import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, Save, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Student {
  id: string;
  name: string;
  email: string;
}

interface AttendanceSystemProps {
  classId?: string;
  className?: string;
  students?: Student[];
  teacherId?: string;
  schoolId?: string;
}

export const AttendanceSystem: React.FC<AttendanceSystemProps> = ({
  classId = 'demo-class',
  className = 'Turma Demo',
  students = [
    { id: '1', name: 'Ana Beatriz Costa', email: 'ana@email.com' },
    { id: '2', name: 'Bruno Silva Santos', email: 'bruno@email.com' },
    { id: '3', name: 'Carolina Oliveira', email: 'carolina@email.com' },
    { id: '4', name: 'Daniel Souza', email: 'daniel@email.com' },
    { id: '5', name: 'Eduardo Lima', email: 'eduardo@email.com' },
    { id: '6', name: 'Fernanda Costa', email: 'fernanda@email.com' },
    { id: '7', name: 'Gabriel Santos', email: 'gabriel@email.com' },
    { id: '8', name: 'Helena Oliveira', email: 'helena@email.com' }
  ],
  teacherId = 'demo-teacher',
  schoolId = 'demo-school'
}) => {
  const [attendance, setAttendance] = useState<Record<string, 'presente' | 'ausente' | 'atrasado'>>(
    students.reduce((acc, student) => ({ ...acc, [student.id]: 'presente' }), {})
  );
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const updateAttendance = (studentId: string, status: 'presente' | 'ausente' | 'atrasado') => {
    setAttendance(prev => ({ ...prev, [studentId]: status }));
  };

  const saveAttendance = async () => {
    setSaving(true);
    try {
      const attendanceRecords = students.map(student => ({
        student_id: student.id,
        class_id: classId,
        teacher_id: teacherId,
        school_id: schoolId,
        status: attendance[student.id],
        date: new Date().toISOString().split('T')[0]
      }));

      const { error } = await supabase
        .from('attendance_records')
        .upsert(attendanceRecords, { 
          onConflict: 'student_id,date,class_id',
          ignoreDuplicates: false 
        });

      if (error) throw error;

      toast({
        title: "Frequência salva com sucesso!",
        description: `A chamada da ${className} foi registrada.`,
      });
    } catch (error) {
      console.error('Erro ao salvar frequência:', error);
      toast({
        title: "Erro ao salvar frequência",
        description: "Tente novamente mais tarde.",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const getStatusBadge = (status: 'presente' | 'ausente' | 'atrasado') => {
    switch (status) {
      case 'presente':
        return <Badge className="bg-success text-success-foreground">Presente</Badge>;
      case 'ausente':
        return <Badge variant="destructive">Ausente</Badge>;
      case 'atrasado':
        return <Badge className="bg-warning text-warning-foreground">Atrasado</Badge>;
    }
  };

  const getStats = () => {
    const presente = Object.values(attendance).filter(s => s === 'presente').length;
    const ausente = Object.values(attendance).filter(s => s === 'ausente').length;
    const atrasado = Object.values(attendance).filter(s => s === 'atrasado').length;
    const total = students.length;
    
    return { presente, ausente, atrasado, total };
  };

  const stats = getStats();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            <span>Chamada - {className}</span>
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-success">✓ {stats.presente}</span>
            <span className="text-destructive">✗ {stats.ausente}</span>
            <span className="text-warning">⏰ {stats.atrasado}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3">
          {students.map((student) => (
            <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">
                    {student.name.split(' ').map(n => n.charAt(0)).join('').slice(0, 2)}
                  </span>
                </div>
                <div>
                  <div className="font-medium">{student.name}</div>
                  <div className="text-sm text-muted-foreground">{student.email}</div>
                </div>
                {getStatusBadge(attendance[student.id])}
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant={attendance[student.id] === 'presente' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => updateAttendance(student.id, 'presente')}
                  className="flex items-center gap-1"
                >
                  <CheckCircle className="h-4 w-4" />
                  Presente
                </Button>
                <Button
                  variant={attendance[student.id] === 'atrasado' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => updateAttendance(student.id, 'atrasado')}
                  className="flex items-center gap-1"
                >
                  <Clock className="h-4 w-4" />
                  Atrasado
                </Button>
                <Button
                  variant={attendance[student.id] === 'ausente' ? 'destructive' : 'outline'}
                  size="sm"
                  onClick={() => updateAttendance(student.id, 'ausente')}
                  className="flex items-center gap-1"
                >
                  <XCircle className="h-4 w-4" />
                  Ausente
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between items-center pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            Total: {stats.total} alunos | 
            Presentes: {stats.presente} | 
            Ausentes: {stats.ausente} | 
            Atrasados: {stats.atrasado}
          </div>
          <Button 
            onClick={saveAttendance} 
            disabled={saving}
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            {saving ? 'Salvando...' : 'Salvar Chamada'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};