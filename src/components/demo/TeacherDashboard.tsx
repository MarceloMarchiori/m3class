import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  BookOpen, 
  Calendar, 
  TrendingUp, 
  Clock, 
  FileText, 
  MessageSquare, 
  User,
  PlusCircle,
  Users,
  GraduationCap,
  Upload
} from 'lucide-react';

interface TeacherDashboardProps {
  demoUser: {
    name: string;
    email: string;
    userType: string;
  };
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ demoUser }) => {
  const [gradeForm, setGradeForm] = useState({
    student: '',
    subject: '',
    activityType: '',
    comment: '',
    grade: '',
    date: ''
  });

  const [attendanceData, setAttendanceData] = useState<Record<string, boolean>>({});
  const [contentForm, setContentForm] = useState({
    title: '',
    description: '',
    photos: [] as File[]
  });

  const teacherStats = {
    totalStudents: 156,
    totalClasses: 6,
    averageGrade: 8.4,
    attendance: 92.1,
    pendingGrades: 8,
    nextClass: 'Matemática 5º A - 10:00'
  };

  const todaySchedule = [
    { time: '08:00', class: '5º Ano A', subject: 'Matemática', room: 'Sala 12' },
    { time: '09:00', class: '4º Ano B', subject: 'Matemática', room: 'Sala 08' },
    { time: '10:10', class: '5º Ano B', subject: 'Matemática', room: 'Sala 12' },
    { time: '14:00', class: '3º Ano A', subject: 'Matemática', room: 'Sala 05' }
  ];

  const studentsList = [
    'Ana Silva', 'Bruno Costa', 'Carla Santos', 'Diego Oliveira', 'Elena Rodrigues',
    'Fernando Lima', 'Gabriela Nunes', 'Henrique Alves', 'Isabella Ferreira', 'João Pedro'
  ];

  const recentGrades = [
    { student: 'Ana Silva', assignment: 'Prova de Geometria', grade: 9.0, date: '05/06' },
    { student: 'Bruno Costa', assignment: 'Trabalho Frações', grade: 8.5, date: '03/06' },
    { student: 'Carla Santos', assignment: 'Exercícios Casa', grade: 8.8, date: '01/06' },
    { student: 'Diego Oliveira', assignment: 'Prova Tabuada', grade: 9.2, date: '30/05' }
  ];

  const handleGradeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Nota lançada:', gradeForm);
    setGradeForm({
      student: '',
      subject: '',
      activityType: '',
      comment: '',
      grade: '',
      date: ''
    });
  };

  const handleAttendanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Frequência registrada:', attendanceData);
    setAttendanceData({});
  };

  const handleContentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Conteúdo salvo:', contentForm);
    setContentForm({
      title: '',
      description: '',
      photos: []
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setContentForm({
        ...contentForm,
        photos: Array.from(e.target.files)
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-full">
              <User className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Olá, {demoUser.name}!</h2>
              <p className="text-muted-foreground">Professor(a) de Matemática</p>
              <p className="text-sm text-green-600">Próxima aula: {teacherStats.nextClass}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ações Rápidas - Movido para o topo */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="h-20 flex flex-col gap-2">
                  <BookOpen className="h-6 w-6" />
                  <span className="text-sm">Lançar Notas</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Lançar Nota</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleGradeSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="student">Aluno</Label>
                    <Select value={gradeForm.student} onValueChange={(value) => setGradeForm({ ...gradeForm, student: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o aluno" />
                      </SelectTrigger>
                      <SelectContent>
                        {studentsList.map((student) => (
                          <SelectItem key={student} value={student}>{student}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Matéria</Label>
                    <Select value={gradeForm.subject} onValueChange={(value) => setGradeForm({ ...gradeForm, subject: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a matéria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="matematica">Matemática</SelectItem>
                        <SelectItem value="portugues">Português</SelectItem>
                        <SelectItem value="ciencias">Ciências</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="activityType">Tipo de Atividade</Label>
                    <Select value={gradeForm.activityType} onValueChange={(value) => setGradeForm({ ...gradeForm, activityType: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="prova">Prova</SelectItem>
                        <SelectItem value="trabalho">Trabalho</SelectItem>
                        <SelectItem value="exercicio">Exercício</SelectItem>
                        <SelectItem value="participacao">Participação</SelectItem>
                        <SelectItem value="projeto">Projeto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="comment">Comentário da Atividade</Label>
                    <Input
                      id="comment"
                      value={gradeForm.comment}
                      onChange={(e) => setGradeForm({ ...gradeForm, comment: e.target.value })}
                      placeholder="Ex: Prova 1, Trabalho em grupo, etc."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="grade">Nota</Label>
                    <Input
                      id="grade"
                      type="number"
                      min="0"
                      max="10"
                      step="0.1"
                      value={gradeForm.grade}
                      onChange={(e) => setGradeForm({ ...gradeForm, grade: e.target.value })}
                      placeholder="0.0 a 10.0"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Data da Atividade</Label>
                    <Input
                      id="date"
                      type="date"
                      value={gradeForm.date}
                      onChange={(e) => setGradeForm({ ...gradeForm, date: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">Lançar Nota</Button>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Users className="h-6 w-6" />
                  <span className="text-sm">Registrar Frequência</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Registrar Frequência</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAttendanceSubmit} className="space-y-4">
                  <div className="space-y-4">
                    <Label>Marque os alunos presentes:</Label>
                    {studentsList.map((student) => (
                      <div key={student} className="flex items-center space-x-2">
                        <Checkbox
                          id={student}
                          checked={attendanceData[student] || false}
                          onCheckedChange={(checked) => 
                            setAttendanceData({ ...attendanceData, [student]: checked as boolean })
                          }
                        />
                        <Label htmlFor={student}>{student}</Label>
                      </div>
                    ))}
                  </div>
                  <Button type="submit" className="w-full">Salvar Frequência</Button>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <FileText className="h-6 w-6" />
                  <span className="text-sm">Conteúdo Lecionado</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Registrar Conteúdo Lecionado</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleContentSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="content-title">Título da Aula</Label>
                    <Input
                      id="content-title"
                      value={contentForm.title}
                      onChange={(e) => setContentForm({ ...contentForm, title: e.target.value })}
                      placeholder="Ex: Frações - Conceitos Básicos"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="content-description">Descrição do Conteúdo</Label>
                    <Textarea
                      id="content-description"
                      value={contentForm.description}
                      onChange={(e) => setContentForm({ ...contentForm, description: e.target.value })}
                      placeholder="Descreva o que foi ensinado na aula..."
                      rows={4}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="content-photos">Fotos da Aula (opcional)</Label>
                    <Input
                      id="content-photos"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handlePhotoUpload}
                    />
                    {contentForm.photos.length > 0 && (
                      <p className="text-sm text-muted-foreground">
                        {contentForm.photos.length} foto(s) selecionada(s)
                      </p>
                    )}
                  </div>
                  <Button type="submit" className="w-full">Salvar Conteúdo</Button>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <MessageSquare className="h-6 w-6" />
                  <span className="text-sm">Comunicados</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Comunicados da Escola</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <p className="font-medium">Reunião Pedagógica</p>
                    <p className="text-sm text-muted-foreground">Sexta-feira às 14h na sala dos professores.</p>
                    <p className="text-xs text-muted-foreground">Hoje</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <p className="font-medium">Entrega de Notas</p>
                    <p className="text-sm text-muted-foreground">Prazo final: próxima terça-feira.</p>
                    <p className="text-xs text-muted-foreground">Ontem</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Resto do conteúdo permanece igual */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Alunos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teacherStats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">Em 6 turmas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Turmas</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teacherStats.totalClasses}</div>
            <p className="text-xs text-muted-foreground">Matemática</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Média Turmas</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teacherStats.averageGrade}</div>
            <p className="text-xs text-green-600">+0.2 vs. mês anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notas Pendentes</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teacherStats.pendingGrades}</div>
            <p className="text-xs text-orange-600">Para lançar</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Horário de Hoje
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todaySchedule.map((schedule, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{schedule.time} - {schedule.class}</p>
                    <p className="text-sm text-muted-foreground">{schedule.subject}</p>
                    <p className="text-xs text-muted-foreground">{schedule.room}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Notas Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentGrades.map((grade, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{grade.student}</p>
                    <p className="text-sm text-muted-foreground">{grade.assignment}</p>
                    <p className="text-xs text-muted-foreground">{grade.date}</p>
                  </div>
                  <Badge variant={grade.grade >= 9 ? 'default' : grade.grade >= 7 ? 'secondary' : 'destructive'}>
                    {grade.grade}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
