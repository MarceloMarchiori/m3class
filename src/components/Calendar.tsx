import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, BookOpen, Users, AlertCircle } from "lucide-react";

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: "prova" | "reuniao" | "evento" | "feriado";
  description?: string;
}

interface CalendarProps {
  userRole?: string;
}

export const Calendar = ({ userRole }: CalendarProps) => {
  // Se o usuário for da secretaria, usar o CalendarManager
  if (userRole === "secretaria") {
    const { CalendarManager } = require("./CalendarManager");
    return <CalendarManager />;
  }

  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Mock events data
  const events: CalendarEvent[] = [
    {
      id: "1",
      title: "Prova de Matemática",
      date: new Date(2024, 5, 15),
      type: "prova",
      description: "Prova bimestral de matemática"
    },
    {
      id: "2", 
      title: "Reunião de Pais",
      date: new Date(2024, 5, 20),
      type: "reuniao",
      description: "Reunião bimestral com pais e responsáveis"
    },
    {
      id: "3",
      title: "Festa Junina",
      date: new Date(2024, 5, 25),
      type: "evento",
      description: "Festa junina da escola"
    }
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getEventsForDate = (day: number) => {
    return events.filter(event => 
      event.date.getDate() === day && 
      event.date.getMonth() === currentDate.getMonth() &&
      event.date.getFullYear() === currentDate.getFullYear()
    );
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
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getEventIcon = (type: CalendarEvent["type"]) => {
    switch (type) {
      case "prova":
        return BookOpen;
      case "reuniao":
        return Users;
      case "evento":
        return CalendarIcon;
      case "feriado":
        return AlertCircle;
      default:
        return CalendarIcon;
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
              Calendário Escolar
            </span>
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
              <div key={`empty-${i}`} className="p-2 h-24"></div>
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
                  className={`p-2 h-24 border rounded-lg relative ${
                    isToday ? 'bg-primary/10 border-primary' : 'border-border hover:bg-muted/50'
                  } transition-colors cursor-pointer`}
                >
                  <div className={`text-sm font-medium ${
                    isToday ? 'text-primary' : 'text-foreground'
                  }`}>
                    {day}
                  </div>
                  
                  <div className="space-y-1 mt-1">
                    {dayEvents.slice(0, 2).map(event => {
                      const Icon = getEventIcon(event.type);
                      return (
                        <div 
                          key={event.id} 
                          className={`text-xs px-1 py-0.5 rounded flex items-center gap-1 ${getEventBadgeColor(event.type)}`}
                          title={event.description}
                        >
                          <Icon className="h-3 w-3" />
                          <span className="truncate">{event.title}</span>
                        </div>
                      );
                    })}
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

      {/* Próximos eventos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Próximos Eventos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {events.slice(0, 5).map(event => {
            const Icon = getEventIcon(event.type);
            return (
              <div key={event.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getEventBadgeColor(event.type)}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{event.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {event.date.toLocaleDateString('pt-BR')} | {event.description}
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};
