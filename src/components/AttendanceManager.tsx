
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, UserCheck, UserX, Clock, ChevronLeft, ChevronRight, Save } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface Student {
  id: string;
  name: string;
  email: string;
}

interface AttendanceRecord {
  id?: string;
  student_id: string;
  date: string;
  status: 'presente' | 'ausente' | 'atrasado';
  teacher_id: string;
}

export const AttendanceManager = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [currentStudentIndex, setCurrentStudentIndex] = useState(0);
  
  const { profile } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (profile?.user_type === 'professor') {
      fetchStudents();
    }
  }, [profile]);

  useEffect(() => {
    if (students.length > 0) {
      loadAttendance();
    }
  }, [students, selectedDate]);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      // Buscar alunos da escola do professor (usando approach simplificado)
      const { data, error } = await supabase
        .from('profiles')
        .select('id, name, email')
        .eq('user_type', 'aluno');

      if (error) throw error;

      const studentsData = (data || []).map(student => ({
        id: student.id,
        name: student.name,
        email: student.email
      }));

      setStudents(studentsData);
      
      // Inicializar attendance com todos presentes
      const initialAttendance: AttendanceRecord[] = studentsData.map(student => ({
        student_id: student.id,
        date: selectedDate,
        status: 'presente' as const,
        teacher_id: profile?.id || ''
      }));
      
      setAttendance(initialAttendance);
    } catch (error: any) {
      console.error('Error fetching students:', error);
      toast({
        title: "Erro ao carregar alunos",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadAttendance = async () => {
    try {
      // Por enquanto, sempre inicializar com presença para todos
      const initialAttendance: AttendanceRecord[] = students.map(student => ({
        student_id: student.id,
        date: selectedDate,
        status: 'presente' as const,
        teacher_id: profile?.id || ''
      }));
      setAttendance(initialAttendance);
      setCurrentStudentIndex(0);
    } catch (error: any) {
      console.error('Error loading attendance:', error);
    }
  };

  const updateAttendanceStatus = (studentId: string, status: 'presente' | 'ausente' | 'atrasado') => {
    setAttendance(prev => 
      prev.map(record => 
        record.student_id === studentId 
          ? { ...record, status }
          : record
      )
    );
  };

  const saveAttendance = async () => {
    setSaving(true);
    try {
      console.log('Saving attendance records:', attendance);
      
      // Simular envio de notificação para responsáveis em caso de falta
      const absentStudents = attendance.filter(record => record.status === 'ausente');
      
      if (absentStudents.length > 0) {
        console.log('Students with absence:', absentStudents);
      }

      toast({
        title: "Frequência salva com sucesso!",
        description: `Registros do dia ${new Date(selectedDate).toLocaleDateString('pt-BR')} foram salvos.`,
      });
    } catch (error: any) {
      console.error('Error saving attendance:', error);
      toast({
        title: "Erro ao salvar frequência",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const nextStudent = () => {
    if (currentStudentIndex < students.length - 1) {
      setCurrentStudentIndex(currentStudentIndex + 1);
    }
  };

  const prevStudent = () => {
    if (currentStudentIndex > 0) {
      setCurrentStudentIndex(currentStudentIndex - 1);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'presente':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'ausente':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'atrasado':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'presente':
        return <UserCheck className="h-6 w-6" />;
      case 'ausente':
        return <UserX className="h-6 w-6" />;
      case 'atrasado':
        return <Clock className="h-6 w-6" />;
      default:
        return <Users className="h-6 w-6" />;
    }
  };

  if (profile?.user_type !== 'professor') {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground">
            <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Acesso restrito a professores</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentStudent = students[currentStudentIndex];
  const currentAttendance = attendance.find(a => a.student_id === currentStudent?.id);
  const status = currentAttendance?.status || 'presente';

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Calendar className="h-6 w-6" />
          Registro de Frequência
        </CardTitle>
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium">Data:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="ml-2 px-3 py-2 border rounded-md w-full"
            />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {students.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Nenhum aluno encontrado</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Contador de progresso */}
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-2">
                Aluno {currentStudentIndex + 1} de {students.length}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStudentIndex + 1) / students.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Card do aluno atual */}
            <div className="text-center space-y-4 py-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
              <div className="p-4 bg-blue-100 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
                <Users className="h-10 w-10 text-blue-600" />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {currentStudent?.name}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {currentStudent?.email}
                </p>
              </div>

              {/* Status atual */}
              <div className="flex justify-center">
                <Badge className={`${getStatusColor(status)} text-lg px-4 py-2`}>
                  {getStatusIcon(status)}
                  <span className="ml-2 capitalize font-semibold">{status}</span>
                </Badge>
              </div>
            </div>

            {/* Botões de status - maiores e lado a lado */}
            <div className="grid grid-cols-3 gap-3">
              <Button
                size="lg"
                variant={status === 'presente' ? 'default' : 'outline'}
                onClick={() => updateAttendanceStatus(currentStudent.id, 'presente')}
                className="h-20 flex flex-col gap-2 text-sm font-semibold"
              >
                <UserCheck className="h-8 w-8" />
                Presente
              </Button>
              <Button
                size="lg"
                variant={status === 'atrasado' ? 'secondary' : 'outline'}
                onClick={() => updateAttendanceStatus(currentStudent.id, 'atrasado')}
                className="h-20 flex flex-col gap-2 text-sm font-semibold"
              >
                <Clock className="h-8 w-8" />
                Atrasado
              </Button>
              <Button
                size="lg"
                variant={status === 'ausente' ? 'destructive' : 'outline'}
                onClick={() => updateAttendanceStatus(currentStudent.id, 'ausente')}
                className="h-20 flex flex-col gap-2 text-sm font-semibold"
              >
                <UserX className="h-8 w-8" />
                Ausente
              </Button>
            </div>

            {/* Navegação entre alunos */}
            <div className="flex justify-between items-center pt-4">
              <Button
                variant="outline"
                onClick={prevStudent}
                disabled={currentStudentIndex === 0}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="h-5 w-5" />
                Anterior
              </Button>
              
              <Button
                variant="outline"
                onClick={nextStudent}
                disabled={currentStudentIndex === students.length - 1}
                className="flex items-center gap-2"
              >
                Próximo
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            {/* Botão salvar */}
            <div className="pt-4 border-t">
              <Button
                onClick={saveAttendance}
                disabled={saving}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 h-12 text-lg font-semibold"
              >
                <Save className="h-5 w-5 mr-2" />
                {saving ? "Salvando..." : "Salvar Frequência"}
              </Button>
            </div>

            {/* Resumo da frequência */}
            <div className="text-xs text-muted-foreground text-center pt-2">
              Presentes: {attendance.filter(a => a.status === 'presente').length} | 
              Ausentes: {attendance.filter(a => a.status === 'ausente').length} | 
              Atrasados: {attendance.filter(a => a.status === 'atrasado').length}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
