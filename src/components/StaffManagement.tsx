
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  Plus, 
  Search, 
  Filter,
  Edit,
  Trash2,
  FileText,
  User,
  Building,
  Clock,
  Phone,
  Mail
} from "lucide-react";
import { Staff } from "@/types/school";
import { StaffFormModal } from "./StaffFormModal";

const mockStaff: Staff[] = [
  {
    id: "1",
    personalData: {
      fullName: "Maria Silva Santos",
      cpf: "123.456.789-00",
      rg: "12.345.678-9",
      birthDate: new Date("1985-03-15"),
      address: {
        street: "Rua das Flores",
        number: "123",
        neighborhood: "Centro",
        city: "São Paulo",
        state: "SP",
        zipCode: "01234-567"
      },
      contacts: [
        { type: "celular", value: "(11) 99999-9999", isPrimary: true },
        { type: "email", value: "maria.silva@escola.com", isPrimary: true }
      ]
    },
    professionalData: {
      position: "Secretária",
      department: "Secretaria",
      salary: 3500,
      workload: 40,
      hireDate: new Date("2020-02-01"),
      contractType: "clt",
      status: "ativo"
    },
    documents: [],
    createdAt: new Date("2020-02-01"),
    updatedAt: new Date()
  },
  {
    id: "2",
    personalData: {
      fullName: "João Carlos Oliveira",
      cpf: "987.654.321-00",
      rg: "98.765.432-1",
      birthDate: new Date("1978-07-22"),
      address: {
        street: "Av. Principal",
        number: "456",
        neighborhood: "Vila Nova",
        city: "São Paulo",
        state: "SP",
        zipCode: "02345-678"
      },
      contacts: [
        { type: "celular", value: "(11) 88888-8888", isPrimary: true },
        { type: "email", value: "joao.oliveira@escola.com", isPrimary: true }
      ]
    },
    professionalData: {
      position: "Porteiro",
      department: "Segurança",
      salary: 2800,
      workload: 40,
      hireDate: new Date("2019-08-15"),
      contractType: "clt",
      status: "ativo"
    },
    documents: [],
    createdAt: new Date("2019-08-15"),
    updatedAt: new Date()
  }
];

export const StaffManagement = () => {
  const [staff, setStaff] = useState<Staff[]>(mockStaff);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ativo":
        return "bg-green-100 text-green-800";
      case "inativo":
        return "bg-red-100 text-red-800";
      case "licenca":
        return "bg-yellow-100 text-yellow-800";
      case "ferias":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      ativo: "Ativo",
      inativo: "Inativo",
      licenca: "Licença",
      ferias: "Férias"
    };
    return labels[status as keyof typeof labels] || status;
  };

  const filteredStaff = staff.filter(member => {
    const matchesSearch = member.personalData.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.professionalData.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === "all" || 
                             member.professionalData.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const departments = Array.from(new Set(staff.map(member => member.professionalData.department)));

  const handleSave = (staffData: Staff) => {
    if (editingStaff) {
      setStaff(prev => prev.map(member => 
        member.id === editingStaff.id ? { ...staffData, id: editingStaff.id } : member
      ));
    } else {
      setStaff(prev => [...prev, { ...staffData, id: Date.now().toString() }]);
    }
    setIsModalOpen(false);
    setEditingStaff(null);
  };

  const handleEdit = (member: Staff) => {
    setEditingStaff(member);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setStaff(prev => prev.filter(member => member.id !== id));
  };

  return (
    <div className="space-y-6">
      <Card className="gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Gestão de Funcionários
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filtros e Busca */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar funcionário..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background"
            >
              <option value="all">Todos os Departamentos</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            
            <Button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Novo Funcionário
            </Button>
          </div>

          {/* Lista de Funcionários */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStaff.map((member) => (
              <Card key={member.id} className="hover:shadow-lg transition-all">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">{member.personalData.fullName}</h3>
                        <p className="text-xs text-muted-foreground">{member.professionalData.position}</p>
                      </div>
                    </div>
                    <Badge className={`text-xs ${getStatusColor(member.professionalData.status)}`}>
                      {getStatusLabel(member.professionalData.status)}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Building className="h-3 w-3" />
                      <span>{member.professionalData.department}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      <span>{member.professionalData.workload}h/semana</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-3 w-3" />
                      <span>{member.personalData.contacts.find(c => c.type === "celular")?.value}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-3 w-3" />
                      <span className="truncate">{member.personalData.contacts.find(c => c.type === "email")?.value}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(member)}
                      className="flex-1"
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(member.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredStaff.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Nenhum funcionário encontrado.
            </div>
          )}
        </CardContent>
      </Card>

      <StaffFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingStaff(null);
        }}
        onSave={handleSave}
        staff={editingStaff}
      />
    </div>
  );
};
