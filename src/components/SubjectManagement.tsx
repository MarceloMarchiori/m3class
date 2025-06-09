
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, BookOpen, Edit, Trash2 } from 'lucide-react';

interface Subject {
  id: string;
  name: string;
  code: string;
  description?: string;
  workload: number;
  category: string;
}

export const SubjectManagement: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: '1', name: 'Matemática', code: 'MAT', description: 'Matemática básica e avançada', workload: 40, category: 'Exatas' },
    { id: '2', name: 'Português', code: 'PORT', description: 'Língua Portuguesa', workload: 40, category: 'Linguagens' },
    { id: '3', name: 'História', code: 'HIST', description: 'História do Brasil e Geral', workload: 30, category: 'Humanas' },
  ]);
  
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    workload: '',
    category: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSubject: Subject = {
      id: editingSubject ? editingSubject.id : Date.now().toString(),
      name: formData.name,
      code: formData.code,
      description: formData.description,
      workload: parseInt(formData.workload),
      category: formData.category
    };

    if (editingSubject) {
      setSubjects(subjects.map(s => s.id === editingSubject.id ? newSubject : s));
    } else {
      setSubjects([...subjects, newSubject]);
    }

    setFormData({ name: '', code: '', description: '', workload: '', category: '' });
    setEditingSubject(null);
    setShowCreateForm(false);
  };

  const handleEdit = (subject: Subject) => {
    setEditingSubject(subject);
    setFormData({
      name: subject.name,
      code: subject.code,
      description: subject.description || '',
      workload: subject.workload.toString(),
      category: subject.category
    });
    setShowCreateForm(true);
  };

  const handleDelete = (id: string) => {
    setSubjects(subjects.filter(s => s.id !== id));
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Gestão de Matérias
            </CardTitle>
            <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
              <DialogTrigger asChild>
                <Button className="w-full sm:w-auto">
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Matéria
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[95vw] max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    {editingSubject ? 'Editar Matéria' : 'Nova Matéria'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome da Matéria</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ex: Matemática"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="code">Código</Label>
                    <Input
                      id="code"
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                      placeholder="Ex: MAT"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoria</Label>
                    <select
                      className="w-full p-2 border rounded-md"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      required
                    >
                      <option value="">Selecione uma categoria</option>
                      <option value="Exatas">Ciências Exatas</option>
                      <option value="Humanas">Ciências Humanas</option>
                      <option value="Linguagens">Linguagens</option>
                      <option value="Natureza">Ciências da Natureza</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="workload">Carga Horária (horas)</Label>
                    <Input
                      id="workload"
                      type="number"
                      value={formData.workload}
                      onChange={(e) => setFormData({ ...formData, workload: e.target.value })}
                      placeholder="40"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Input
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Descrição da matéria"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button type="submit" className="flex-1">
                      {editingSubject ? 'Salvar' : 'Criar'}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => {
                        setShowCreateForm(false);
                        setEditingSubject(null);
                        setFormData({ name: '', code: '', description: '', workload: '', category: '' });
                      }}
                      className="flex-1"
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            {subjects.map((subject) => (
              <Card key={subject.id} className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <h3 className="font-semibold">{subject.name}</h3>
                      <Badge variant="outline">{subject.code}</Badge>
                      <Badge variant="secondary">{subject.category}</Badge>
                    </div>
                    {subject.description && (
                      <p className="text-sm text-muted-foreground">{subject.description}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Carga horária: {subject.workload}h
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(subject)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(subject.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
