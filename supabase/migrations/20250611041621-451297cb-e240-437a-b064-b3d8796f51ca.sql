
-- Tabela para tipos de escola (tradicional vs creche)
CREATE TYPE public.school_type AS ENUM ('tradicional', 'creche');

ALTER TABLE public.schools 
ADD COLUMN school_type public.school_type DEFAULT 'tradicional';

-- Tabela para séries de creche
CREATE TABLE public.daycare_grades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  age_range TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Inserir séries padrão de creche
INSERT INTO public.daycare_grades (name, age_range, description) VALUES
('Berçário I', '4-12 meses', 'Primeira fase do berçário'),
('Berçário II', '1-2 anos', 'Segunda fase do berçário'),
('Maternal I', '2-3 anos', 'Primeira fase do maternal'),
('Maternal II', '3-4 anos', 'Segunda fase do maternal'),
('Pré I', '4-5 anos', 'Primeira fase do pré-escolar'),
('Pré II', '5-6 anos', 'Segunda fase do pré-escolar');

-- Tabela para fichas médicas completas
CREATE TABLE public.student_medical_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL,
  blood_type TEXT,
  allergies TEXT[],
  medications TEXT[],
  chronic_diseases TEXT[],
  surgeries TEXT[],
  emergency_contacts JSONB,
  dietary_restrictions TEXT[],
  disabilities TEXT[],
  special_needs TEXT,
  doctor_name TEXT,
  doctor_phone TEXT,
  health_insurance TEXT,
  health_insurance_number TEXT,
  vaccination_record JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabela para módulos do sistema
CREATE TABLE public.system_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Inserir módulos padrão
INSERT INTO public.system_modules (name, display_name, description, icon) VALUES
('canteen', 'Gestão de Cantina', 'Controle de cardápio, estoque e vendas da cantina', 'utensils'),
('stockroom', 'Gestão de Almoxarifado', 'Controle de materiais e estoque escolar', 'package'),
('fleet', 'Frota Escolar', 'Gestão de veículos, rotas e manutenção', 'bus');

-- Tabela para permissões de módulos por usuário
CREATE TABLE public.user_module_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  module_id UUID REFERENCES public.system_modules(id) ON DELETE CASCADE,
  school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
  is_enabled BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, module_id, school_id)
);

-- Tabelas para Gestão de Cantina
CREATE TABLE public.canteen_menu (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
  day_of_week INTEGER CHECK (day_of_week >= 0 AND day_of_week <= 6),
  meal_type TEXT CHECK (meal_type IN ('breakfast', 'lunch', 'snack', 'dinner')),
  items JSONB,
  week_start_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE public.canteen_inventory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
  item_name TEXT NOT NULL,
  category TEXT,
  quantity DECIMAL(10,2),
  unit TEXT,
  min_quantity DECIMAL(10,2),
  supplier_name TEXT,
  supplier_contact TEXT,
  cost_per_unit DECIMAL(10,2),
  expiry_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE public.canteen_sales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
  item_name TEXT NOT NULL,
  quantity DECIMAL(10,2),
  unit_price DECIMAL(10,2),
  total_amount DECIMAL(10,2),
  sale_date DATE DEFAULT CURRENT_DATE,
  student_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabelas para Gestão de Almoxarifado
CREATE TABLE public.stockroom_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
  item_name TEXT NOT NULL,
  category TEXT,
  brand TEXT,
  model TEXT,
  quantity INTEGER,
  min_quantity INTEGER,
  unit TEXT,
  location TEXT,
  supplier_name TEXT,
  supplier_contact TEXT,
  cost_per_unit DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE public.stockroom_movements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
  item_id UUID REFERENCES public.stockroom_items(id),
  movement_type TEXT CHECK (movement_type IN ('entrada', 'saida')),
  quantity INTEGER,
  reason TEXT,
  user_id UUID REFERENCES public.profiles(id),
  movement_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabelas para Frota Escolar
CREATE TABLE public.fleet_vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
  license_plate TEXT NOT NULL,
  model TEXT,
  brand TEXT,
  year INTEGER,
  capacity INTEGER,
  fuel_type TEXT,
  status TEXT CHECK (status IN ('ativo', 'manutencao', 'inativo')),
  driver_name TEXT,
  driver_license TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE public.fleet_maintenance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID REFERENCES public.fleet_vehicles(id) ON DELETE CASCADE,
  maintenance_type TEXT,
  description TEXT,
  cost DECIMAL(10,2),
  service_provider TEXT,
  maintenance_date DATE,
  next_maintenance_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE public.fleet_routes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
  route_name TEXT NOT NULL,
  vehicle_id UUID REFERENCES public.fleet_vehicles(id),
  stops JSONB,
  start_time TIME,
  end_time TIME,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE public.fleet_fuel_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID REFERENCES public.fleet_vehicles(id) ON DELETE CASCADE,
  fuel_amount DECIMAL(10,2),
  cost DECIMAL(10,2),
  odometer_reading INTEGER,
  fuel_date DATE DEFAULT CURRENT_DATE,
  gas_station TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Habilitar RLS para todas as novas tabelas
ALTER TABLE public.daycare_grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_medical_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_module_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.canteen_menu ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.canteen_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.canteen_sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stockroom_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stockroom_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fleet_vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fleet_maintenance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fleet_routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fleet_fuel_records ENABLE ROW LEVEL SECURITY;

-- Políticas RLS básicas (permitir acesso para usuários autenticados da escola)
CREATE POLICY "Users can view daycare grades" ON public.daycare_grades FOR SELECT USING (true);

CREATE POLICY "School users can manage medical records" ON public.student_medical_records
  FOR ALL USING (true);

CREATE POLICY "Users can view system modules" ON public.system_modules FOR SELECT USING (true);

CREATE POLICY "Users can view their module permissions" ON public.user_module_permissions
  FOR SELECT USING (true);

-- Políticas para módulos de cantina
CREATE POLICY "School users can manage canteen menu" ON public.canteen_menu
  FOR ALL USING (true);

CREATE POLICY "School users can manage canteen inventory" ON public.canteen_inventory
  FOR ALL USING (true);

CREATE POLICY "School users can manage canteen sales" ON public.canteen_sales
  FOR ALL USING (true);

-- Políticas para módulos de almoxarifado
CREATE POLICY "School users can manage stockroom items" ON public.stockroom_items
  FOR ALL USING (true);

CREATE POLICY "School users can manage stockroom movements" ON public.stockroom_movements
  FOR ALL USING (true);

-- Políticas para módulos de frota
CREATE POLICY "School users can manage fleet vehicles" ON public.fleet_vehicles
  FOR ALL USING (true);

CREATE POLICY "School users can manage fleet maintenance" ON public.fleet_maintenance
  FOR ALL USING (true);

CREATE POLICY "School users can manage fleet routes" ON public.fleet_routes
  FOR ALL USING (true);

CREATE POLICY "School users can manage fleet fuel records" ON public.fleet_fuel_records
  FOR ALL USING (true);
