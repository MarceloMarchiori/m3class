
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Plus, Edit, Trash2 } from "lucide-react";
import { CalendarEvent } from "@/types/school";
import { EventFormModal } from "./EventFormModal";

const mockEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Prova de Matemática - 9º Ano",
    description: "Avaliação bimestral de matemática",
    startDate: new Date(2024, 5, 15),
    type: "prova",
    targetAudience: ["9º A", "9º B"],
    location: "Sala 15",
    organizer: "Prof. Maria Silva",
    isRecurring: false
  },
  {
    id: "2",
    title: "Reunião de Pais e Mestres",
    description: "Reunião bimestral com responsáveis",
    startDate: new Date(2024, 5, 20),
    type: "reuniao",
    targetAudience: ["Todos"],
    location: "Auditório",
    organizer: "Coordenação",
    isRecurring: true,
    recurrencePattern: "Bimestral"
  },
  {
    id: "3",
    title: "Festa Junina",
    description: "Festa tradicional da escola",
    startDate: new Date(2024, 5, 25),
    type: "evento",
    targetAudience: ["Toda a comunidade"],
    location: "Pátio principal",
    organizer: "Comissão Organizadora",
    isRecurring: true,
    recurrencePattern: "Anual"
  }
];

export const CalendarManager = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>(mockEvents);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getEventsForDate = (day: number) => {
    return events.filter(event => 
      event.startDate.getDate() === day && 
      event.startDate.getMonth() === currentDate.getMonth() &&
      event.startDate.getFullYear() === currentDate.getFullYear()
    );
  };

  const handleCreateEvent = () => {
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  const handleEditEvent = (event: CalendarEvent) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter(e => e.id !== eventId));
  };

  const handleSaveEvent = (eventData: Partial<CalendarEvent>) => {
    if (editingEvent) {
      // Editar evento existente
      setEvents(events.map(e => 
        e.id === editingEvent.id 
          ? { ...e, ...eventData }
          : e
      ));
    } else {
      // Criar novo evento
      const newEvent: CalendarEvent = {
        id: Date.now().toString(),
        title: eventData.title || "",
        description: eventData.description || "",
        startDate: eventData.startDate || new Date(),
        endDate: eventData.endDate,
        type: eventData.type || "evento",
        targetAudience: eventData.targetAudience || [],
        location: eventData.location || "",
        organizer: eventData.organizer || "",
        isRecurring: eventData.isRecurring || false,
        recurrencePattern: eventData.recurrencePattern
      };
      setEvents([...events, newEvent]);
    }
    setIsModalOpen(false);
  };

  const getEventBadgeColor = (type: CalendarEvent["type"]) => {
    switch (type) {
      case "prova":
        return "bg-destructive text-destructive-foreground";
      case "reuniao":
        return "bg-primary text-primary-foreground";
      case "evento":
        return "bg-success text-success-foreground";
      case "feriado":
        return "bg-warning text-warning-foreground";
      case "administrativo":
        return "bg-secondary text-secondary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const today = new Date();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Gestão do Calendário Escolar
            </span>
            <div className="flex items-center gap-4">
              <Button onClick={handleCreateEvent}>
                <Plus className="h-4 w-4 mr-2" />
                Novo Evento
              </Button>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={previousMonth}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-lg font-semibold min-w-[200px] text-center">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </span>
                <Button variant="outline" size="sm" onClick={nextMonth}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1 mb-4">
            {dayNames.map(day => (
              <div key={day} className="p-2 text-center font-medium text-muted-foreground">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {/* Dias vazios do início do mês */}
            {Array.from({ length: firstDay }, (_, i) => (
              <div key={`empty-${i}`} className="p-2 h-32"></div>
            ))}
            
            {/* Dias do mês */}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const dayEvents = getEventsForDate(day);
              const isToday = today.getDate() === day && 
                             today.getMonth() === currentDate.getMonth() &&
                             today.getFullYear() === currentDate.getFullYear();
              
              return (
                <div 
                  key={day} 
                  className={`p-2 h-32 border rounded-lg relative ${
                    isToday ? 'bg-primary/10 border-primary' : 'border-border hover:bg-muted/50'
                  } transition-colors`}
                >
                  <div className={`text-sm font-medium ${
                    isToday ? 'text-primary' : 'text-foreground'
                  }`}>
                    {day}
                  </div>
                  
                  <div className="space-y-1 mt-1">
                    {dayEvents.slice(0, 2).map(event => (
                      <div 
                        key={event.id} 
                        className={`text-xs px-1 py-0.5 rounded flex items-center justify-between group ${getEventBadgeColor(event.type)}`}
                        title={event.description}
                      >
                        <span className="truncate flex-1">{event.title}</span>
                        <div className="hidden group-hover:flex items-center gap-1 ml-1">
                          <button
                            onClick={() => handleEditEvent(event)}
                            className="hover:bg-white/20 p-0.5 rounded"
                          >
                            <Edit className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => handleDeleteEvent(event.id)}
                            className="hover:bg-white/20 p-0.5 rounded"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-xs text-muted-foreground">
                        +{dayEvents.length - 2} mais
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Lista de próximos eventos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Próximos Eventos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {events.slice(0, 5).map(event => (
            <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3 flex-1">
                <Badge className={getEventBadgeColor(event.type)}>
                  {event.type}
                </Badge>
                <div className="flex-1">
                  <div className="font-medium">{event.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {event.startDate.toLocaleDateString('pt-BR')} | {event.location} | {event.organizer}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {event.isRecurring && (
                  <Badge variant="outline" className="text-xs">
                    {event.recurrencePattern}
                  </Badge>
                )}
                <Button variant="outline" size="sm" onClick={() => handleEditEvent(event)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDeleteEvent(event.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <EventFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEvent}
        event={editingEvent}
      />
    </div>
  );
};
