
export interface Department {
  id: string;
  name: string;
  icon: string;
  color: string;
  manager: string;
  budget: number;
  currentStock: number;
  minStock: number;
  items: InventoryItem[];
}

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  minQuantity: number;
  unit: string;
  price: number;
  supplier: string;
  lastPurchase: Date;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  type: "prova" | "reuniao" | "evento" | "feriado" | "administrativo";
  targetAudience: string[];
  location: string;
  organizer: string;
  isRecurring: boolean;
  recurrencePattern?: string;
}

export interface Enrollment {
  id: string;
  studentId: string;
  academicYear: number;
  grade: string;
  class: string;
  enrollmentNumber: string;
  status: "ativa" | "inativa" | "transferido" | "concluido";
  enrollmentDate: Date;
  previousEnrollments?: string[];
}

export type EnrollmentStatus = "ativa" | "inativa" | "transferido" | "concluido";
export type EventType = "prova" | "reuniao" | "evento" | "feriado" | "administrativo";
