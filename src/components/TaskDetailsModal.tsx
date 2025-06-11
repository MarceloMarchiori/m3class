
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Clock, AlertCircle, User, Calendar } from 'lucide-react';

interface TaskDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({ open, onOpenChange }) => {
  const [tasks, setTasks] = useState([
    { 
      id: 1, 
      task: "Processar matrícula de Carlos Oliveira", 
      priority: "alta", 
      deadline: "Hoje",
      responsible: "Maria Santos",
      description: "Verificar documentação completa e criar perfil do aluno no sistema",
      status: "pendente",
      createdAt: "2025-01-10"
    },
    { 
      id: 2, 
      task: "Emitir declarações pendentes", 
      priority: "média", 
      deadline: "Amanhã",
      responsible: "Ana Costa",
      description: "3 declarações de matrícula e 2 de escolaridade",
      status: "em_andamento",
      createdAt: "2025-01-09"
    },
    { 
      id: 3, 
      task: "Atualizar dados de contato dos pais", 
      priority: "baixa", 
      deadline: "Esta semana",
      responsible: "João Silva",
      description: "Verificar e atualizar telefones e emails de 15 responsáveis",
      status: "pendente",
      createdAt: "2025-01-08"
    },
    { 
      id: 4, 
      task: "Organizar documentos do arquivo", 
      priority: "baixa", 
      deadline: "Próxima semana",
      responsible: "Maria Santos",
      description: "Reorganizar arquivo físico por ordem alfabética e ano letivo",
      status: "pendente",
      createdAt: "2025-01-07"
    }
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'alta': return 'bg-red-100 text-red-800';
      case 'média': return 'bg-yellow-100 text-yellow-800';
      case 'baixa': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'concluida': return 'bg-green-100 text-green-800';
      case 'em_andamento': return 'bg-blue-100 text-blue-800';
      case 'pendente': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'concluida': return <CheckCircle className="h-4 w-4" />;
      case 'em_andamento': return <Clock className="h-4 w-4" />;
      case 'pendente': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const handleCompleteTask = (taskId: number) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: 'concluida' } : task
    ));
  };

  const handleStartTask = (taskId: number) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: 'em_andamento' } : task
    ));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Detalhes das Tarefas Pendentes ({tasks.filter(t => t.status !== 'concluida').length} pendentes)
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">
                  {tasks.filter(t => t.priority === 'alta' && t.status !== 'concluida').length}
                </div>
                <div className="text-sm text-red-700">Alta Prioridade</div>
              </CardContent>
            </Card>
            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {tasks.filter(t => t.priority === 'média' && t.status !== 'concluida').length}
                </div>
                <div className="text-sm text-yellow-700">Média Prioridade</div>
              </CardContent>
            </Card>
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {tasks.filter(t => t.priority === 'baixa' && t.status !== 'concluida').length}
                </div>
                <div className="text-sm text-green-700">Baixa Prioridade</div>
              </CardContent>
            </Card>
          </div>

          <div className="overflow-y-auto max-h-[50vh] space-y-3">
            {tasks.map((task) => (
              <Card key={task.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        {getStatusIcon(task.status)}
                      </div>
                      <div className="space-y-2 flex-1">
                        <div>
                          <h4 className="font-semibold text-lg">{task.task}</h4>
                          <p className="text-sm text-muted-foreground">
                            {task.description}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            Responsável: {task.responsible}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Criado em: {new Date(task.createdAt).toLocaleDateString('pt-BR')}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                          </Badge>
                          <Badge className={getStatusColor(task.status)}>
                            {task.status === 'em_andamento' ? 'Em Andamento' : 
                             task.status === 'concluida' ? 'Concluída' : 'Pendente'}
                          </Badge>
                          <Badge variant="outline">
                            Prazo: {task.deadline}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      {task.status === 'pendente' && (
                        <Button size="sm" variant="outline" onClick={() => handleStartTask(task.id)}>
                          Iniciar
                        </Button>
                      )}
                      {task.status !== 'concluida' && (
                        <Button size="sm" onClick={() => handleCompleteTask(task.id)}>
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Concluir
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
