export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      attendance_records: {
        Row: {
          class_id: string | null
          created_at: string | null
          date: string
          id: string
          notes: string | null
          school_id: string | null
          status: string
          student_id: string
          teacher_id: string | null
          updated_at: string | null
        }
        Insert: {
          class_id?: string | null
          created_at?: string | null
          date?: string
          id?: string
          notes?: string | null
          school_id?: string | null
          status?: string
          student_id: string
          teacher_id?: string | null
          updated_at?: string | null
        }
        Update: {
          class_id?: string | null
          created_at?: string | null
          date?: string
          id?: string
          notes?: string | null
          school_id?: string | null
          status?: string
          student_id?: string
          teacher_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "attendance_records_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_records_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      canteen_inventory: {
        Row: {
          category: string | null
          cost_per_unit: number | null
          created_at: string | null
          expiry_date: string | null
          id: string
          item_name: string
          min_quantity: number | null
          quantity: number | null
          school_id: string | null
          supplier_contact: string | null
          supplier_name: string | null
          unit: string | null
        }
        Insert: {
          category?: string | null
          cost_per_unit?: number | null
          created_at?: string | null
          expiry_date?: string | null
          id?: string
          item_name: string
          min_quantity?: number | null
          quantity?: number | null
          school_id?: string | null
          supplier_contact?: string | null
          supplier_name?: string | null
          unit?: string | null
        }
        Update: {
          category?: string | null
          cost_per_unit?: number | null
          created_at?: string | null
          expiry_date?: string | null
          id?: string
          item_name?: string
          min_quantity?: number | null
          quantity?: number | null
          school_id?: string | null
          supplier_contact?: string | null
          supplier_name?: string | null
          unit?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "canteen_inventory_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      canteen_menu: {
        Row: {
          created_at: string | null
          day_of_week: number | null
          id: string
          items: Json | null
          meal_type: string | null
          school_id: string | null
          week_start_date: string | null
        }
        Insert: {
          created_at?: string | null
          day_of_week?: number | null
          id?: string
          items?: Json | null
          meal_type?: string | null
          school_id?: string | null
          week_start_date?: string | null
        }
        Update: {
          created_at?: string | null
          day_of_week?: number | null
          id?: string
          items?: Json | null
          meal_type?: string | null
          school_id?: string | null
          week_start_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "canteen_menu_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      canteen_sales: {
        Row: {
          created_at: string | null
          id: string
          item_name: string
          quantity: number | null
          sale_date: string | null
          school_id: string | null
          student_id: string | null
          total_amount: number | null
          unit_price: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          item_name: string
          quantity?: number | null
          sale_date?: string | null
          school_id?: string | null
          student_id?: string | null
          total_amount?: number | null
          unit_price?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          item_name?: string
          quantity?: number | null
          sale_date?: string | null
          school_id?: string | null
          student_id?: string | null
          total_amount?: number | null
          unit_price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "canteen_sales_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_messages: {
        Row: {
          created_at: string | null
          id: string
          message: string
          school_id: string | null
          sender_email: string
          sender_name: string
          status: string | null
          subject: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          school_id?: string | null
          sender_email: string
          sender_name: string
          status?: string | null
          subject: string
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          school_id?: string | null
          sender_email?: string
          sender_name?: string
          status?: string | null
          subject?: string
        }
        Relationships: [
          {
            foreignKeyName: "contact_messages_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      daycare_grades: {
        Row: {
          age_range: string | null
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          age_range?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          age_range?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      fleet_fuel_records: {
        Row: {
          cost: number | null
          created_at: string | null
          fuel_amount: number | null
          fuel_date: string | null
          gas_station: string | null
          id: string
          odometer_reading: number | null
          vehicle_id: string | null
        }
        Insert: {
          cost?: number | null
          created_at?: string | null
          fuel_amount?: number | null
          fuel_date?: string | null
          gas_station?: string | null
          id?: string
          odometer_reading?: number | null
          vehicle_id?: string | null
        }
        Update: {
          cost?: number | null
          created_at?: string | null
          fuel_amount?: number | null
          fuel_date?: string | null
          gas_station?: string | null
          id?: string
          odometer_reading?: number | null
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fleet_fuel_records_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "fleet_vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      fleet_maintenance: {
        Row: {
          cost: number | null
          created_at: string | null
          description: string | null
          id: string
          maintenance_date: string | null
          maintenance_type: string | null
          next_maintenance_date: string | null
          service_provider: string | null
          vehicle_id: string | null
        }
        Insert: {
          cost?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          maintenance_date?: string | null
          maintenance_type?: string | null
          next_maintenance_date?: string | null
          service_provider?: string | null
          vehicle_id?: string | null
        }
        Update: {
          cost?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          maintenance_date?: string | null
          maintenance_type?: string | null
          next_maintenance_date?: string | null
          service_provider?: string | null
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fleet_maintenance_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "fleet_vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      fleet_routes: {
        Row: {
          created_at: string | null
          end_time: string | null
          id: string
          is_active: boolean | null
          route_name: string
          school_id: string | null
          start_time: string | null
          stops: Json | null
          vehicle_id: string | null
        }
        Insert: {
          created_at?: string | null
          end_time?: string | null
          id?: string
          is_active?: boolean | null
          route_name: string
          school_id?: string | null
          start_time?: string | null
          stops?: Json | null
          vehicle_id?: string | null
        }
        Update: {
          created_at?: string | null
          end_time?: string | null
          id?: string
          is_active?: boolean | null
          route_name?: string
          school_id?: string | null
          start_time?: string | null
          stops?: Json | null
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fleet_routes_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fleet_routes_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "fleet_vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      fleet_vehicles: {
        Row: {
          brand: string | null
          capacity: number | null
          created_at: string | null
          driver_license: string | null
          driver_name: string | null
          fuel_type: string | null
          id: string
          license_plate: string
          model: string | null
          school_id: string | null
          status: string | null
          year: number | null
        }
        Insert: {
          brand?: string | null
          capacity?: number | null
          created_at?: string | null
          driver_license?: string | null
          driver_name?: string | null
          fuel_type?: string | null
          id?: string
          license_plate: string
          model?: string | null
          school_id?: string | null
          status?: string | null
          year?: number | null
        }
        Update: {
          brand?: string | null
          capacity?: number | null
          created_at?: string | null
          driver_license?: string | null
          driver_name?: string | null
          fuel_type?: string | null
          id?: string
          license_plate?: string
          model?: string | null
          school_id?: string | null
          status?: string | null
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fleet_vehicles_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          from_user_id: string
          id: string
          is_read: boolean
          message_type: string
          sent_at: string
          subject: string
          to_school_id: string | null
        }
        Insert: {
          content: string
          from_user_id: string
          id?: string
          is_read?: boolean
          message_type?: string
          sent_at?: string
          subject: string
          to_school_id?: string | null
        }
        Update: {
          content?: string
          from_user_id?: string
          id?: string
          is_read?: boolean
          message_type?: string
          sent_at?: string
          subject?: string
          to_school_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_to_school_id_fkey"
            columns: ["to_school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          data: Json | null
          id: string
          is_read: boolean | null
          message: string
          title: string
          type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          data?: Json | null
          id?: string
          is_read?: boolean | null
          message: string
          title: string
          type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          data?: Json | null
          id?: string
          is_read?: boolean | null
          message?: string
          title?: string
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_history: {
        Row: {
          amount: number
          created_at: string
          due_date: string
          id: string
          notes: string | null
          paid_date: string | null
          payment_method: string | null
          school_id: string
          status: string
          subscription_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          due_date: string
          id?: string
          notes?: string | null
          paid_date?: string | null
          payment_method?: string | null
          school_id: string
          status?: string
          subscription_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          due_date?: string
          id?: string
          notes?: string | null
          paid_date?: string | null
          payment_method?: string | null
          school_id?: string
          status?: string
          subscription_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_history_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_history_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "school_subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          id: string
          name: string
          school_id: string | null
          secretaria_role: Database["public"]["Enums"]["secretaria_role"] | null
          updated_at: string
          user_type: Database["public"]["Enums"]["user_type"]
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          id: string
          name: string
          school_id?: string | null
          secretaria_role?:
            | Database["public"]["Enums"]["secretaria_role"]
            | null
          updated_at?: string
          user_type?: Database["public"]["Enums"]["user_type"]
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          id?: string
          name?: string
          school_id?: string | null
          secretaria_role?:
            | Database["public"]["Enums"]["secretaria_role"]
            | null
          updated_at?: string
          user_type?: Database["public"]["Enums"]["user_type"]
        }
        Relationships: [
          {
            foreignKeyName: "fk_profiles_school"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      school_contracts: {
        Row: {
          contract_number: string
          created_at: string
          end_date: string | null
          id: string
          school_id: string
          start_date: string
          status: string
          terms: string | null
          updated_at: string
        }
        Insert: {
          contract_number: string
          created_at?: string
          end_date?: string | null
          id?: string
          school_id: string
          start_date: string
          status?: string
          terms?: string | null
          updated_at?: string
        }
        Update: {
          contract_number?: string
          created_at?: string
          end_date?: string | null
          id?: string
          school_id?: string
          start_date?: string
          status?: string
          terms?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "school_contracts_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      school_subscriptions: {
        Row: {
          created_at: string
          due_day: number
          id: string
          monthly_value: number
          plan_name: string
          school_id: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          due_day?: number
          id?: string
          monthly_value: number
          plan_name?: string
          school_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          due_day?: number
          id?: string
          monthly_value?: number
          plan_name?: string
          school_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "school_subscriptions_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      schools: {
        Row: {
          address: string | null
          admin_user_id: string | null
          city: string | null
          created_at: string
          email: string | null
          id: string
          is_active: boolean
          name: string
          phone: string | null
          school_type: Database["public"]["Enums"]["school_type"] | null
          state: string | null
          updated_at: string
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          admin_user_id?: string | null
          city?: string | null
          created_at?: string
          email?: string | null
          id?: string
          is_active?: boolean
          name: string
          phone?: string | null
          school_type?: Database["public"]["Enums"]["school_type"] | null
          state?: string | null
          updated_at?: string
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          admin_user_id?: string | null
          city?: string | null
          created_at?: string
          email?: string | null
          id?: string
          is_active?: boolean
          name?: string
          phone?: string | null
          school_type?: Database["public"]["Enums"]["school_type"] | null
          state?: string | null
          updated_at?: string
          zip_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "schools_admin_user_id_fkey"
            columns: ["admin_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      stockroom_items: {
        Row: {
          brand: string | null
          category: string | null
          cost_per_unit: number | null
          created_at: string | null
          id: string
          item_name: string
          location: string | null
          min_quantity: number | null
          model: string | null
          quantity: number | null
          school_id: string | null
          supplier_contact: string | null
          supplier_name: string | null
          unit: string | null
        }
        Insert: {
          brand?: string | null
          category?: string | null
          cost_per_unit?: number | null
          created_at?: string | null
          id?: string
          item_name: string
          location?: string | null
          min_quantity?: number | null
          model?: string | null
          quantity?: number | null
          school_id?: string | null
          supplier_contact?: string | null
          supplier_name?: string | null
          unit?: string | null
        }
        Update: {
          brand?: string | null
          category?: string | null
          cost_per_unit?: number | null
          created_at?: string | null
          id?: string
          item_name?: string
          location?: string | null
          min_quantity?: number | null
          model?: string | null
          quantity?: number | null
          school_id?: string | null
          supplier_contact?: string | null
          supplier_name?: string | null
          unit?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stockroom_items_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      stockroom_movements: {
        Row: {
          created_at: string | null
          id: string
          item_id: string | null
          movement_date: string | null
          movement_type: string | null
          quantity: number | null
          reason: string | null
          school_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          item_id?: string | null
          movement_date?: string | null
          movement_type?: string | null
          quantity?: number | null
          reason?: string | null
          school_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          item_id?: string | null
          movement_date?: string | null
          movement_type?: string | null
          quantity?: number | null
          reason?: string | null
          school_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stockroom_movements_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "stockroom_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stockroom_movements_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stockroom_movements_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      student_medical_records: {
        Row: {
          allergies: string[] | null
          blood_type: string | null
          chronic_diseases: string[] | null
          created_at: string | null
          dietary_restrictions: string[] | null
          disabilities: string[] | null
          doctor_name: string | null
          doctor_phone: string | null
          emergency_contacts: Json | null
          health_insurance: string | null
          health_insurance_number: string | null
          id: string
          medications: string[] | null
          special_needs: string | null
          student_id: string
          surgeries: string[] | null
          updated_at: string | null
          vaccination_record: Json | null
        }
        Insert: {
          allergies?: string[] | null
          blood_type?: string | null
          chronic_diseases?: string[] | null
          created_at?: string | null
          dietary_restrictions?: string[] | null
          disabilities?: string[] | null
          doctor_name?: string | null
          doctor_phone?: string | null
          emergency_contacts?: Json | null
          health_insurance?: string | null
          health_insurance_number?: string | null
          id?: string
          medications?: string[] | null
          special_needs?: string | null
          student_id: string
          surgeries?: string[] | null
          updated_at?: string | null
          vaccination_record?: Json | null
        }
        Update: {
          allergies?: string[] | null
          blood_type?: string | null
          chronic_diseases?: string[] | null
          created_at?: string | null
          dietary_restrictions?: string[] | null
          disabilities?: string[] | null
          doctor_name?: string | null
          doctor_phone?: string | null
          emergency_contacts?: Json | null
          health_insurance?: string | null
          health_insurance_number?: string | null
          id?: string
          medications?: string[] | null
          special_needs?: string | null
          student_id?: string
          surgeries?: string[] | null
          updated_at?: string | null
          vaccination_record?: Json | null
        }
        Relationships: []
      }
      system_modules: {
        Row: {
          created_at: string | null
          description: string | null
          display_name: string
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_name: string
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_name?: string
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
        }
        Relationships: []
      }
      user_module_permissions: {
        Row: {
          created_at: string | null
          id: string
          is_enabled: boolean | null
          module_id: string | null
          school_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_enabled?: boolean | null
          module_id?: string | null
          school_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_enabled?: boolean | null
          module_id?: string | null
          school_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_module_permissions_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "system_modules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_module_permissions_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_module_permissions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_schools: {
        Row: {
          created_at: string
          id: string
          school_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          school_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          school_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_schools_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_schools_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_access_school: {
        Args: { school_uuid: string }
        Returns: boolean
      }
      generate_monthly_payments: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      get_user_schools: {
        Args: { user_uuid: string }
        Returns: {
          school_id: string
          school_name: string
        }[]
      }
      is_current_user_master: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_master_user: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      user_has_school_access: {
        Args: { user_uuid: string; school_uuid: string }
        Returns: boolean
      }
    }
    Enums: {
      school_type: "tradicional" | "creche"
      secretaria_role:
        | "diretor"
        | "secretario_educacao"
        | "secretaria_operacional"
      user_type:
        | "master"
        | "school_admin"
        | "professor"
        | "aluno"
        | "responsavel"
        | "secretaria"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      school_type: ["tradicional", "creche"],
      secretaria_role: [
        "diretor",
        "secretario_educacao",
        "secretaria_operacional",
      ],
      user_type: [
        "master",
        "school_admin",
        "professor",
        "aluno",
        "responsavel",
        "secretaria",
      ],
    },
  },
} as const
