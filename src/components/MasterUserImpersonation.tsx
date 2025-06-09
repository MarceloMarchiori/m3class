
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Search, 
  Building, 
  Users, 
  LogIn, 
  ArrowLeft, 
  Filter,
  MapPin,
  User,
  GraduationCap,
  UserCheck,
  Shield,
  BookOpen
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useImpersonation } from '@/contexts/ImpersonationContext';

interface School {
  id: string;
  name: string;
  city: string;
  state: string;
  email: string;
  is_active: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
  user_type: string;
  avatar_url?: string;
}

export const MasterUserImpersonation = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [filteredSchools, setFilteredSchools] = useState<School[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [schoolSearch, setSchoolSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [userSearch, setUserSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [usersLoading, setUsersLoading] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setImpersonatedUser } = useImpersonation();

  useEffect(() => {
    fetchSchools();
  }, []);

  useEffect(() => {
    filterSchools();
  }, [schools, schoolSearch, cityFilter]);

  const fetchSchools = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('schools')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      setSchools(data || []);
    } catch (error: any) {
      console.error('Error fetching schools:', error);
      toast({
        title: "Erro ao carregar escolas",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterSchools = () => {
    let filtered = schools;

    if (schoolSearch) {
      filtered = filtered.filter(school =>
        school.name.toLowerCase().includes(schoolSearch.toLowerCase())
      );
    }

    if (cityFilter) {
      filtered = filtered.filter(school =>
        school.city?.toLowerCase().includes(cityFilter.toLowerCase())
      );
    }

    setFilteredSchools(filtered);
  };

  const fetchSchoolUsers = async (schoolId: string) => {
    setUsersLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          id,
          name,
          email,
          user_type,
          avatar_url,
          user_schools!inner(school_id)
        `)
        .eq('user_schools.school_id', schoolId)
        .order('name');

      if (error) throw error;
      setUsers(data || []);
    } catch (error: any) {
      console.error('Error fetching users:', error);
      toast({
        title: "Erro ao carregar usuários",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUsersLoading(false);
    }
  };

  const handleSchoolSelect = (school: School) => {
    setSelectedSchool(school);
    fetchSchoolUsers(school.id);
  };

  const handleImpersonateUser = (user: User) => {
    setImpersonatedUser(user);
    
    toast({
      title: "Modo de Impersonificação Ativado",
      description: `Você está agora logado como ${user.name}`,
    });

    // Redirecionar para o dashboard apropriado
    switch (user.user_type) {
      case 'school_admin':
      case 'secretaria':
        navigate('/teste?mode=secretary');
        break;
      case 'professor':
        navigate('/teste?mode=teacher');
        break;
      case 'aluno':
        navigate('/teste?mode=student');
        break;
      case 'responsavel':
        navigate('/teste?mode=parent');
        break;
      default:
        navigate('/dashboard');
    }
  };

  const getUserTypeIcon = (userType: string) => {
    switch (userType) {
      case 'school_admin':
      case 'secretaria':
        return <Shield className="h-4 w-4" />;
      case 'professor':
        return <BookOpen className="h-4 w-4" />;
      case 'aluno':
        return <GraduationCap className="h-4 w-4" />;
      case 'responsavel':
        return <UserCheck className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const getUserTypeLabel = (userType: string) => {
    const labels: Record<string, string> = {
      school_admin: 'Admin Escola',
      secretaria: 'Secretaria',
      professor: 'Professor',
      aluno: 'Aluno',
      responsavel: 'Responsável'
    };
    return labels[userType] || userType;
  };

  const getUserTypeBadgeVariant = (userType: string): "default" | "destructive" | "outline" | "secondary" => {
    const variants: Record<string, "default" | "destructive" | "outline" | "secondary"> = {
      school_admin: 'default',
      secretaria: 'secondary',
      professor: 'outline',
      aluno: 'outline',
      responsavel: 'secondary'
    };
    return variants[userType] || 'outline';
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    user.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  const uniqueCities = [...new Set(schools.map(s => s.city).filter(Boolean))].sort();

  if (selectedSchool) {
    return (
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedSchool(null)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar às Escolas
            </Button>
            <div>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                {selectedSchool.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {selectedSchool.city}, {selectedSchool.state}
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar usuários por nome ou email..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {usersLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredUsers.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhum usuário encontrado</p>
                </div>
              ) : (
                filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-all duration-200 gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                        {getUserTypeIcon(user.user_type)}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold">{user.name}</h3>
                        <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={getUserTypeBadgeVariant(user.user_type)}>
                        {getUserTypeLabel(user.user_type)}
                      </Badge>
                      <Button
                        size="sm"
                        onClick={() => handleImpersonateUser(user)}
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                      >
                        <LogIn className="h-4 w-4 mr-2" />
                        Acessar
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="h-5 w-5" />
          Buscar Escolas para Acesso Interno
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Selecione uma escola para ver todos os usuários e fazer login como qualquer um deles
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar escolas por nome..."
              value={schoolSearch}
              onChange={(e) => setSchoolSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <select
              className="pl-10 pr-4 py-2 border border-input bg-background rounded-md text-sm"
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
            >
              <option value="">Todas as cidades</option>
              {uniqueCities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredSchools.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Building className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Nenhuma escola encontrada</p>
              </div>
            ) : (
              filteredSchools.map((school) => (
                <div
                  key={school.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-all duration-200 cursor-pointer gap-4"
                  onClick={() => handleSchoolSelect(school)}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                      <Building className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold">{school.name}</h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {school.email || 'Sem email cadastrado'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {school.city}, {school.state}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">
                      <Users className="h-3 w-3 mr-1" />
                      Ver Usuários
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
