
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Info } from "lucide-react";

const mockEvents = [
  {
    id: 1,
    title: "Prova de Matemática",
    date: new Date(2024, 5, 15),
    type: "prova",
    className: "9º A"
  },
  {
    id: 2,
    title: "Reunião de Pais",
    date: new Date(2024, 5, 20),
    type: "reuniao",
    className: "Todas as turmas"
  },
  {
    id: 3,
    title: "Festa Junina",
    date: new Date(2024, 5, 25),
    type: "evento",
    className: "Toda a escola"
  }
];

export const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getEventsForDate = (day: number) => {
    return mockEvents.filter(event => 
      event.date.getDate() === day && 
      event.date.getMonth() === currentDate.getMonth() &&
      event.date.getFullYear() === currentDate.getFullYear()
    );
  };

  const getEventBadgeColor = (type: string) => {
    switch (type) {
      case "prova":
        return "bg-destructive text-destructive-foreground";
      case "reuniao":
        return "bg-primary text-primary-foreground";
      case "evento":
        return "bg-success text-success-foreground";
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Calendário Escolar
          </span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Info className="h-4 w-4" />
              Visualização apenas
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={previousMonth}
                className="p-2 hover:bg-muted rounded-md"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-lg font-semibold min-w-[200px] text-center">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </span>
              <button 
                onClick={nextMonth}
                className="p-2 hover:bg-muted rounded-md"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
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
                className={`p-2 h-24 border rounded-lg ${
                  isToday ? 'bg-primary/10 border-primary' : 'border-border'
                }`}
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
                      className={`text-xs px-1 py-0.5 rounded ${getEventBadgeColor(event.type)}`}
                      title={`${event.title} - ${event.className}`}
                    >
                      <div className="truncate">{event.title}</div>
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
  );
};
