-- Criar tabela para registros de frequência
CREATE TABLE public.attendance_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL,
  class_id UUID,
  teacher_id UUID REFERENCES public.profiles(id),
  school_id UUID REFERENCES public.schools(id),
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  status TEXT CHECK (status IN ('presente', 'ausente', 'atrasado')) NOT NULL DEFAULT 'presente',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(student_id, date, class_id)
);

-- Criar tabela para notificações
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT CHECK (type IN ('absence', 'grade', 'general', 'payment')) NOT NULL,
  is_read BOOLEAN DEFAULT false,
  data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Criar tabela para mensagens de contato comercial
CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES public.schools(id),
  sender_name TEXT NOT NULL,
  sender_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT CHECK (status IN ('pending', 'read', 'responded')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.attendance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para attendance_records
CREATE POLICY "School users can manage attendance records" ON public.attendance_records
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() 
      AND school_id = attendance_records.school_id
    )
  );

-- Políticas RLS para notifications
CREATE POLICY "Users can view their own notifications" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can create notifications" ON public.notifications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their own notifications" ON public.notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- Políticas RLS para contact_messages
CREATE POLICY "School users can manage their contact messages" ON public.contact_messages
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() 
      AND school_id = contact_messages.school_id
    )
  );

CREATE POLICY "Master users can view all contact messages" ON public.contact_messages
  FOR SELECT USING (is_master_user());

-- Função para criar notificação de falta automaticamente
CREATE OR REPLACE FUNCTION public.notify_absence()
RETURNS TRIGGER AS $$
BEGIN
  -- Se o status mudou para ausente, criar notificação para responsáveis
  IF NEW.status = 'ausente' AND (OLD.status IS NULL OR OLD.status != 'ausente') THEN
    INSERT INTO public.notifications (user_id, title, message, type, data)
    SELECT 
      p.id,
      'Falta Registrada',
      'Seu filho(a) faltou à aula no dia ' || NEW.date::text,
      'absence',
      jsonb_build_object(
        'student_id', NEW.student_id,
        'date', NEW.date,
        'class_id', NEW.class_id
      )
    FROM public.profiles p
    WHERE p.user_type = 'responsavel' 
    AND p.school_id = NEW.school_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para notificação automática
CREATE TRIGGER attendance_absence_notification
  AFTER INSERT OR UPDATE ON public.attendance_records
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_absence();

-- Função para atualizar updated_at
CREATE OR REPLACE FUNCTION public.update_attendance_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para updated_at
CREATE TRIGGER update_attendance_records_updated_at
  BEFORE UPDATE ON public.attendance_records
  FOR EACH ROW
  EXECUTE FUNCTION public.update_attendance_updated_at();