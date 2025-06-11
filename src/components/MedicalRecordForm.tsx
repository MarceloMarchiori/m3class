
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Heart, AlertTriangle, Phone, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MedicalRecordFormProps {
  studentId?: string;
  onSave?: (data: any) => void;
  onCancel?: () => void;
}

export const MedicalRecordForm = ({ studentId, onSave, onCancel }: MedicalRecordFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    bloodType: '',
    allergies: [] as string[],
    medications: [] as string[],
    chronicDiseases: [] as string[],
    surgeries: [] as string[],
    dietaryRestrictions: [] as string[],
    disabilities: [] as string[],
    specialNeeds: '',
    doctorName: '',
    doctorPhone: '',
    healthInsurance: '',
    healthInsuranceNumber: '',
    emergencyContacts: [
      { name: '', phone: '', relationship: '' },
      { name: '', phone: '', relationship: '' }
    ]
  });

  const [newAllergy, setNewAllergy] = useState('');
  const [newMedication, setNewMedication] = useState('');
  const [newChronicDisease, setNewChronicDisease] = useState('');

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  
  const commonAllergies = [
    'Amendoim', 'Leite', 'Ovos', 'Camarão', 'Peixe', 'Soja', 'Trigo', 
    'Castanhas', 'Pólen', 'Poeira', 'Medicamentos', 'Látex'
  ];

  const commonDietaryRestrictions = [
    'Vegetariano', 'Vegano', 'Sem lactose', 'Sem glúten', 'Diabético',
    'Hipertensão', 'Sem açúcar', 'Kosher', 'Halal'
  ];

  const addToArray = (array: string[], value: string, setter: (arr: string[]) => void) => {
    if (value.trim() && !array.includes(value.trim())) {
      setter([...array, value.trim()]);
    }
  };

  const removeFromArray = (array: string[], value: string, setter: (arr: string[]) => void) => {
    setter(array.filter(item => item !== value));
  };

  const handleSave = () => {
    const medicalRecord = {
      student_id: studentId,
      blood_type: formData.bloodType,
      allergies: formData.allergies,
      medications: formData.medications,
      chronic_diseases: formData.chronicDiseases,
      surgeries: formData.surgeries,
      dietary_restrictions: formData.dietaryRestrictions,
      disabilities: formData.disabilities,
      special_needs: formData.specialNeeds,
      doctor_name: formData.doctorName,
      doctor_phone: formData.doctorPhone,
      health_insurance: formData.healthInsurance,
      health_insurance_number: formData.healthInsuranceNumber,
      emergency_contacts: formData.emergencyContacts.filter(contact => contact.name && contact.phone)
    };

    if (onSave) {
      onSave(medicalRecord);
    }

    toast({
      title: "Ficha médica salva",
      description: "As informações médicas foram salvas com sucesso",
    });
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="bg-red-100 p-2 rounded-lg">
            <Heart className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <CardTitle>Ficha Médica Completa</CardTitle>
            <p className="text-sm text-gray-600">Informações de saúde do estudante</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Informações Básicas */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            Informações Básicas de Saúde
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bloodType">Tipo Sanguíneo</Label>
              <Select value={formData.bloodType} onValueChange={(value) => setFormData({...formData, bloodType: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo sanguíneo" />
                </SelectTrigger>
                <SelectContent>
                  {bloodTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="healthInsurance">Plano de Saúde</Label>
              <Input
                id="healthInsurance"
                value={formData.healthInsurance}
                onChange={(e) => setFormData({...formData, healthInsurance: e.target.value})}
                placeholder="Nome do plano de saúde"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="healthInsuranceNumber">Número da Carteirinha</Label>
              <Input
                id="healthInsuranceNumber"
                value={formData.healthInsuranceNumber}
                onChange={(e) => setFormData({...formData, healthInsuranceNumber: e.target.value})}
                placeholder="Número da carteirinha do plano"
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Médico */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Médico Responsável</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="doctorName">Nome do Médico</Label>
              <Input
                id="doctorName"
                value={formData.doctorName}
                onChange={(e) => setFormData({...formData, doctorName: e.target.value})}
                placeholder="Dr. Nome do médico"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="doctorPhone">Telefone do Médico</Label>
              <Input
                id="doctorPhone"
                value={formData.doctorPhone}
                onChange={(e) => setFormData({...formData, doctorPhone: e.target.value})}
                placeholder="(11) 99999-9999"
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Alergias */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            Alergias
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {commonAllergies.map(allergy => (
              <div key={allergy} className="flex items-center space-x-2">
                <Checkbox
                  id={`allergy-${allergy}`}
                  checked={formData.allergies.includes(allergy)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormData({...formData, allergies: [...formData.allergies, allergy]});
                    } else {
                      setFormData({...formData, allergies: formData.allergies.filter(a => a !== allergy)});
                    }
                  }}
                />
                <Label htmlFor={`allergy-${allergy}`} className="text-sm">{allergy}</Label>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              value={newAllergy}
              onChange={(e) => setNewAllergy(e.target.value)}
              placeholder="Adicionar outra alergia"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addToArray(formData.allergies, newAllergy, (allergies) => setFormData({...formData, allergies}));
                  setNewAllergy('');
                }
              }}
            />
            <Button 
              type="button" 
              onClick={() => {
                addToArray(formData.allergies, newAllergy, (allergies) => setFormData({...formData, allergies}));
                setNewAllergy('');
              }}
            >
              Adicionar
            </Button>
          </div>

          {formData.allergies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.allergies.map(allergy => (
                <span 
                  key={allergy} 
                  className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm cursor-pointer"
                  onClick={() => removeFromArray(formData.allergies, allergy, (allergies) => setFormData({...formData, allergies}))}
                >
                  {allergy} ×
                </span>
              ))}
            </div>
          )}
        </div>

        <Separator />

        {/* Restrições Alimentares */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Restrições Alimentares</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {commonDietaryRestrictions.map(restriction => (
              <div key={restriction} className="flex items-center space-x-2">
                <Checkbox
                  id={`dietary-${restriction}`}
                  checked={formData.dietaryRestrictions.includes(restriction)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormData({...formData, dietaryRestrictions: [...formData.dietaryRestrictions, restriction]});
                    } else {
                      setFormData({...formData, dietaryRestrictions: formData.dietaryRestrictions.filter(r => r !== restriction)});
                    }
                  }}
                />
                <Label htmlFor={`dietary-${restriction}`} className="text-sm">{restriction}</Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Medicamentos */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Medicamentos em Uso</h3>
          
          <div className="flex gap-2">
            <Input
              value={newMedication}
              onChange={(e) => setNewMedication(e.target.value)}
              placeholder="Nome do medicamento e dosagem"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addToArray(formData.medications, newMedication, (medications) => setFormData({...formData, medications}));
                  setNewMedication('');
                }
              }}
            />
            <Button 
              type="button" 
              onClick={() => {
                addToArray(formData.medications, newMedication, (medications) => setFormData({...formData, medications}));
                setNewMedication('');
              }}
            >
              Adicionar
            </Button>
          </div>

          {formData.medications.length > 0 && (
            <div className="space-y-2">
              {formData.medications.map((medication, index) => (
                <div key={index} className="flex items-center justify-between bg-blue-50 p-2 rounded">
                  <span>{medication}</span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => removeFromArray(formData.medications, medication, (medications) => setFormData({...formData, medications}))}
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <Separator />

        {/* Contatos de Emergência */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Phone className="h-5 w-5 text-blue-500" />
            Contatos de Emergência
          </h3>
          
          {formData.emergencyContacts.map((contact, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
              <div className="space-y-2">
                <Label>Nome</Label>
                <Input
                  value={contact.name}
                  onChange={(e) => {
                    const newContacts = [...formData.emergencyContacts];
                    newContacts[index].name = e.target.value;
                    setFormData({...formData, emergencyContacts: newContacts});
                  }}
                  placeholder="Nome do contato"
                />
              </div>
              <div className="space-y-2">
                <Label>Telefone</Label>
                <Input
                  value={contact.phone}
                  onChange={(e) => {
                    const newContacts = [...formData.emergencyContacts];
                    newContacts[index].phone = e.target.value;
                    setFormData({...formData, emergencyContacts: newContacts});
                  }}
                  placeholder="(11) 99999-9999"
                />
              </div>
              <div className="space-y-2">
                <Label>Parentesco</Label>
                <Input
                  value={contact.relationship}
                  onChange={(e) => {
                    const newContacts = [...formData.emergencyContacts];
                    newContacts[index].relationship = e.target.value;
                    setFormData({...formData, emergencyContacts: newContacts});
                  }}
                  placeholder="Mãe, Pai, Avó, etc."
                />
              </div>
            </div>
          ))}
        </div>

        <Separator />

        {/* Necessidades Especiais */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-500" />
            Necessidades Especiais
          </h3>
          
          <div className="space-y-2">
            <Label htmlFor="specialNeeds">Observações sobre necessidades especiais</Label>
            <Textarea
              id="specialNeeds"
              value={formData.specialNeeds}
              onChange={(e) => setFormData({...formData, specialNeeds: e.target.value})}
              placeholder="Descreva qualquer necessidade especial, adaptação necessária, ou informação importante para o cuidado do estudante..."
              rows={4}
            />
          </div>
        </div>

        {/* Botões */}
        <div className="flex justify-end gap-3 pt-6">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
          )}
          <Button onClick={handleSave}>
            Salvar Ficha Médica
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
