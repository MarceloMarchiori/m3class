
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { CalendarEvent, EventType } from "@/types/school";

interface EventFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Partial<CalendarEvent>) => void;
  event?: CalendarEvent | null;
}

export const EventFormModal = ({ isOpen, onClose, onSave, event }: EventFormModalProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    type: "evento" as EventType,
    targetAudience: "",
    location: "",
    organizer: "",
    isRecurring: false,
    recurrencePattern: ""
  });

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title,
        description: event.description,
        startDate: event.startDate.toISOString().split('T')[0],
        endDate: event.endDate?.toISOString().split('T')[0] || "",
        type: event.type,
        targetAudience: event.targetAudience.join(", "),
        location: event.location,
        organizer: event.organizer,
        isRecurring: event.isRecurring,
        recurrencePattern: event.recurrencePattern || ""
      });
    } else {
      setFormData({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        type: "evento",
        targetAudience: "",
        location: "",
        organizer: "",
        isRecurring: false,
        recurrencePattern: ""
      });
    }
  }, [event, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const eventData: Partial<CalendarEvent> = {
      title: formData.title,
      description: formData.description,
      startDate: new Date(formData.startDate),
      endDate: formData.endDate ? new Date(formData.endDate) : undefined,
      type: formData.type,
      targetAudience: formData.targetAudience.split(",").map(s => s.trim()),
      location: formData.location,
      organizer: formData.organizer,
      isRecurring: formData.isRecurring,
      recurrencePattern: formData.recurrencePattern
    };

    onSave(eventData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {event ? "Editar Evento" : "Criar Novo Evento"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título do Evento</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Tipo de Evento</Label>
              <select
                id="type"
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value as EventType})}
                className="w-full px-3 py-2 border rounded-md bg-background"
              >
                <option value="prova">Prova</option>
                <option value="reuniao">Reunião</option>
                <option value="evento">Evento</option>
                <option value="feriado">Feriado</option>
                <option value="administrativo">Administrativo</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Data de Início</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endDate">Data de Fim (opcional)</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({...formData, endDate: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Local</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                placeholder="Ex: Auditório, Sala 15..."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="organizer">Organizador</Label>
              <Input
                id="organizer"
                value={formData.organizer}
                onChange={(e) => setFormData({...formData, organizer: e.target.value})}
                placeholder="Ex: Prof. Maria Silva..."
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetAudience">Público-Alvo</Label>
            <Input
              id="targetAudience"
              value={formData.targetAudience}
              onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
              placeholder="Ex: 9º A, 9º B, Todos..."
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isRecurring"
              checked={formData.isRecurring}
              onCheckedChange={(checked) => setFormData({...formData, isRecurring: checked})}
            />
            <Label htmlFor="isRecurring">Evento Recorrente</Label>
          </div>

          {formData.isRecurring && (
            <div className="space-y-2">
              <Label htmlFor="recurrencePattern">Padrão de Recorrência</Label>
              <select
                id="recurrencePattern"
                value={formData.recurrencePattern}
                onChange={(e) => setFormData({...formData, recurrencePattern: e.target.value})}
                className="w-full px-3 py-2 border rounded-md bg-background"
              >
                <option value="">Selecione...</option>
                <option value="Diário">Diário</option>
                <option value="Semanal">Semanal</option>
                <option value="Mensal">Mensal</option>
                <option value="Bimestral">Bimestral</option>
                <option value="Trimestral">Trimestral</option>
                <option value="Semestral">Semestral</option>
                <option value="Anual">Anual</option>
              </select>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {event ? "Atualizar" : "Criar"} Evento
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
