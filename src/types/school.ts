
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
export type UserRole = "professor" | "aluno" | "responsavel" | "secretaria";
export type SecretariaSubRole = "diretor" | "secretario_educacao" | "secretaria_operacional";

export interface Permission {
  id: string;
  name: string;
  module: string;
  action: "read" | "write" | "delete" | "approve";
}

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  subRole?: SecretariaSubRole;
  permissions: Permission[];
  avatar?: string;
  isActive: boolean;
}

export interface PersonalData {
  fullName: string;
  cpf: string;
  rg: string;
  birthDate: Date;
  address: Address;
  contacts: Contact[];
  photo?: string;
}

export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Contact {
  type: "telefone" | "celular" | "email" | "emergencia";
  value: string;
  isPrimary: boolean;
}

export interface ProfessionalData {
  position: string;
  department: string;
  salary: number;
  workload: number;
  hireDate: Date;
  contractType: "clt" | "estatutario" | "temporario" | "terceirizado";
  status: "ativo" | "inativo" | "licenca" | "ferias";
}

export interface Document {
  id: string;
  type: string;
  name: string;
  url: string;
  uploadDate: Date;
  expiryDate?: Date;
}

export interface Staff {
  id: string;
  personalData: PersonalData;
  professionalData: ProfessionalData;
  documents: Document[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AcademicFormation {
  id: string;
  degree: "graduacao" | "pos_graduacao" | "mestrado" | "doutorado";
  course: string;
  institution: string;
  completionYear: number;
  document: Document;
}

export interface TeacherPerformance {
  averageGrade: number;
  studentFeedback: number;
  punctuality: number;
  lastEvaluation: Date;
  observations: string;
}

export interface Teacher extends Staff {
  academicFormation: AcademicFormation[];
  authorizedSubjects: string[];
  professionalRegistry: string;
  performance: TeacherPerformance;
  specializations: string[];
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  workload: number;
  syllabus: string;
  prerequisites: string[];
  objectives: string[];
  bibliography: Bibliography;
  evaluationCriteria: EvaluationCriteria;
  academicYear: number;
  isActive: boolean;
}

export interface Bibliography {
  required: BookReference[];
  complementary: BookReference[];
}

export interface BookReference {
  title: string;
  author: string;
  publisher: string;
  year: number;
  isbn?: string;
}

export interface EvaluationCriteria {
  tests: number;
  assignments: number;
  participation: number;
  projects: number;
}

export interface Class {
  id: string;
  name: string;
  grade: string;
  shift: "matutino" | "vespertino" | "noturno";
  maxStudents: number;
  currentStudents: number;
  academicYear: number;
  subjects: string[];
  isActive: boolean;
}

export interface ClassSchedule {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  room: string;
}

export interface ClassAssignment {
  id: string;
  teacherId: string;
  subjectId: string;
  classId: string;
  academicYear: number;
  schedule: ClassSchedule[];
  status: "ativo" | "substituicao" | "licenca";
  createdAt: Date;
}

export interface AcademicYear {
  id: string;
  year: number;
  startDate: Date;
  endDate: Date;
  periods: AcademicPeriod[];
  holidays: Holiday[];
  isActive: boolean;
}

export interface AcademicPeriod {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  type: "bimestre" | "trimestre" | "semestre";
}

export interface Holiday {
  id: string;
  name: string;
  date: Date;
  type: "nacional" | "estadual" | "municipal" | "escolar";
}
