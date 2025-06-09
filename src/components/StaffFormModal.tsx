
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Staff, PersonalData, ProfessionalData, Contact, Address } from "@/types/school";
import { User, Building, FileText, Phone, Mail, MapPin } from "lucide-react";

interface StaffFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (staff: Staff) => void;
  staff?: Staff | null;
}

export const StaffFormModal = ({ isOpen, onClose, onSave, staff }: StaffFormModalProps) => {
  const [formData, setFormData] = useState<Staff>({
    id: "",
    personalData: {
      fullName: "",
      cpf: "",
      rg: "",
      birthDate: new Date(),
      address: {
        street: "",
        number: "",
        complement: "",
        neighborhood: "",
        city: "",
        state: "",
        zipCode: ""
      },
      contacts: [
        { type: "celular", value: "", isPrimary: true },
        { type: "email", value: "", isPrimary: true }
      ]
    },
    professionalData: {
      position: "",
      department: "",
      salary: 0,
      workload: 40,
      hireDate: new Date(),
      contractType: "clt",
      status: "ativo"
    },
    documents: [],
    createdAt: new Date(),
    updatedAt: new Date()
  });

  useEffect(() => {
    if (staff) {
      setFormData(staff);
    } else {
      // Reset form
      setFormData({
        id: "",
        personalData: {
          fullName: "",
          cpf: "",
          rg: "",
          birthDate: new Date(),
          address: {
            street: "",
            number: "",
            complement: "",
            neighborhood: "",
            city: "",
            state: "",
            zipCode: ""
          },
          contacts: [
            { type: "celular", value: "", isPrimary: true },
            { type: "email", value: "", isPrimary: true }
          ]
        },
        professionalData: {
          position: "",
          department: "",
          salary: 0,
          workload: 40,
          hireDate: new Date(),
          contractType: "clt",
          status: "ativo"
        },
        documents: [],
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
  }, [staff, isOpen]);

  const handlePersonalDataChange = (field: keyof PersonalData, value: any) => {
    setFormData(prev => ({
      ...prev,
      personalData: {
        ...prev.personalData,
        [field]: value
      }
    }));
  };

  const handleAddressChange = (field: keyof Address, value: string) => {
    setFormData(prev => ({
      ...prev,
      personalData: {
        ...prev.personalData,
        address: {
          ...prev.personalData.address,
          [field]: value
        }
      }
    }));
  };

  const handleContactChange = (index: number, field: keyof Contact, value: any) => {
    setFormData(prev => ({
      ...prev,
      personalData: {
        ...prev.personalData,
        contacts: prev.personalData.contacts.map((contact, i) => 
          i === index ? { ...contact, [field]: value } : contact
        )
      }
    }));
  };

  const handleProfessionalDataChange = (field: keyof ProfessionalData, value: any) => {
    setFormData(prev => ({
      ...prev,
      professionalData: {
        ...prev.professionalData,
        [field]: value
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      updatedAt: new Date()
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {staff ? "Editar Funcionário" : "Novo Funcionário"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="personal" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Dados Pessoais
              </TabsTrigger>
              <TabsTrigger value="professional" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                Dados Profissionais
              </TabsTrigger>
              <TabsTrigger value="documents" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Documentos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Informações Pessoais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Nome Completo *</Label>
                      <Input
                        id="fullName"
                        value={formData.personalData.fullName}
                        onChange={(e) => handlePersonalDataChange("fullName", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="birthDate">Data de Nascimento *</Label>
                      <Input
                        id="birthDate"
                        type="date"
                        value={formData.personalData.birthDate.toISOString().split('T')[0]}
                        onChange={(e) => handlePersonalDataChange("birthDate", new Date(e.target.value))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cpf">CPF *</Label>
                      <Input
                        id="cpf"
                        value={formData.personalData.cpf}
                        onChange={(e) => handlePersonalDataChange("cpf", e.target.value)}
                        placeholder="000.000.000-00"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="rg">RG *</Label>
                      <Input
                        id="rg"
                        value={formData.personalData.rg}
                        onChange={(e) => handlePersonalDataChange("rg", e.target.value)}
                        placeholder="00.000.000-0"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Endereço
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="street">Logradouro *</Label>
                      <Input
                        id="street"
                        value={formData.personalData.address.street}
                        onChange={(e) => handleAddressChange("street", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="number">Número *</Label>
                      <Input
                        id="number"
                        value={formData.personalData.address.number}
                        onChange={(e) => handleAddressChange("number", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="complement">Complemento</Label>
                      <Input
                        id="complement"
                        value={formData.personalData.address.complement || ""}
                        onChange={(e) => handleAddressChange("complement", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="neighborhood">Bairro *</Label>
                      <Input
                        id="neighborhood"
                        value={formData.personalData.address.neighborhood}
                        onChange={(e) => handleAddressChange("neighborhood", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">Cidade *</Label>
                      <Input
                        id="city"
                        value={formData.personalData.address.city}
                        onChange={(e) => handleAddressChange("city", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">Estado *</Label>
                      <Input
                        id="state"
                        value={formData.personalData.address.state}
                        onChange={(e) => handleAddressChange("state", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">CEP *</Label>
                      <Input
                        id="zipCode"
                        value={formData.personalData.address.zipCode}
                        onChange={(e) => handleAddressChange("zipCode", e.target.value)}
                        placeholder="00000-000"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Contatos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formData.personalData.contacts.map((contact, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`contact-type-${index}`}>Tipo de Contato</Label>
                        <select
                          id={`contact-type-${index}`}
                          value={contact.type}
                          onChange={(e) => handleContactChange(index, "type", e.target.value)}
                          className="w-full px-3 py-2 border rounded-md bg-background"
                        >
                          <option value="celular">Celular</option>
                          <option value="telefone">Telefone</option>
                          <option value="email">Email</option>
                          <option value="emergencia">Emergência</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor={`contact-value-${index}`}>Valor</Label>
                        <Input
                          id={`contact-value-${index}`}
                          value={contact.value}
                          onChange={(e) => handleContactChange(index, "value", e.target.value)}
                          placeholder={contact.type === "email" ? "email@exemplo.com" : "(11) 99999-9999"}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="professional" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Dados Profissionais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="position">Cargo *</Label>
                      <Input
                        id="position"
                        value={formData.professionalData.position}
                        onChange={(e) => handleProfessionalDataChange("position", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="department">Departamento *</Label>
                      <select
                        id="department"
                        value={formData.professionalData.department}
                        onChange={(e) => handleProfessionalDataChange("department", e.target.value)}
                        className="w-full px-3 py-2 border rounded-md bg-background"
                        required
                      >
                        <option value="">Selecione um departamento</option>
                        <option value="Secretaria">Secretaria</option>
                        <option value="Pedagogico">Pedagógico</option>
                        <option value="Administracao">Administração</option>
                        <option value="Manutencao">Manutenção</option>
                        <option value="Limpeza">Limpeza</option>
                        <option value="Seguranca">Segurança</option>
                        <option value="Cantina">Cantina</option>
                        <option value="Biblioteca">Biblioteca</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="salary">Salário (R$)</Label>
                      <Input
                        id="salary"
                        type="number"
                        value={formData.professionalData.salary}
                        onChange={(e) => handleProfessionalDataChange("salary", Number(e.target.value))}
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div>
                      <Label htmlFor="workload">Carga Horária (h/semana) *</Label>
                      <Input
                        id="workload"
                        type="number"
                        value={formData.professionalData.workload}
                        onChange={(e) => handleProfessionalDataChange("workload", Number(e.target.value))}
                        min="1"
                        max="44"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="hireDate">Data de Contratação *</Label>
                      <Input
                        id="hireDate"
                        type="date"
                        value={formData.professionalData.hireDate.toISOString().split('T')[0]}
                        onChange={(e) => handleProfessionalDataChange("hireDate", new Date(e.target.value))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="contractType">Tipo de Contrato *</Label>
                      <select
                        id="contractType"
                        value={formData.professionalData.contractType}
                        onChange={(e) => handleProfessionalDataChange("contractType", e.target.value)}
                        className="w-full px-3 py-2 border rounded-md bg-background"
                        required
                      >
                        <option value="clt">CLT</option>
                        <option value="estatutario">Estatutário</option>
                        <option value="temporario">Temporário</option>
                        <option value="terceirizado">Terceirizado</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="status">Status *</Label>
                      <select
                        id="status"
                        value={formData.professionalData.status}
                        onChange={(e) => handleProfessionalDataChange("status", e.target.value)}
                        className="w-full px-3 py-2 border rounded-md bg-background"
                        required
                      >
                        <option value="ativo">Ativo</option>
                        <option value="inativo">Inativo</option>
                        <option value="licenca">Licença</option>
                        <option value="ferias">Férias</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Documentos</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Funcionalidade de upload de documentos será implementada em breve.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {staff ? "Salvar Alterações" : "Cadastrar Funcionário"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
