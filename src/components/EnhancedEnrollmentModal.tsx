
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { UserPlus, User, Heart, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { MedicalRecordForm } from './MedicalRecordForm';

interface EnhancedEnrollmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EnhancedEnrollmentModal: React.FC<EnhancedEnrollmentModalProps> = ({ open, onOpenChange }) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  
  const [studentData, setStudentData] = useState({
    studentName: '',
    parentName: '',
    email: '',
    phone: '',
    address: '',
    grade: '',
    birthDate: '',
    parentCpf: '',
    parentRg: '',
    birthCertificate: '',
    residenceProof: '',
    vaccines: '',
    previousSchool: '',
    emergencyContact: '',
    emergencyPhone: ''
  });

  const [medicalData, setMedicalData] = useState(null);

  const handleStudentDataChange = (field: string, value: string) => {
    setStudentData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleMedicalDataSave = (data: any) => {
    setMedicalData(data);
    setCurrentStep(3); // Vai para a tela de confirmação
  };

  const handleFinalSubmit = () => {
    toast({
      title: "Matrícula realizada com sucesso!",
      description: `Aluno ${studentData.studentName} matriculado na turma ${studentData.grade} com ficha médica completa`,
    });
    
    // Reset form
    setStudentData({
      studentName: '',
      parentName: '',
      email: '',
      phone: '',
      address: '',
      grade: '',
      birthDate: '',
      parentCpf: '',
      parentRg: '',
      birthCertificate: '',
      residenceProof: '',
      vaccines: '',
      previousSchool: '',
      emergencyContact: '',
      emergencyPhone: ''
    });
    setMedicalData(null);
    setCurrentStep(1);
    onOpenChange(false);
  };

  const isStep1Valid = () => {
    return studentData.studentName && studentData.parentName && studentData.email && 
           studentData.phone && studentData.grade && studentData.birthDate;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Nova Matrícula Completa - Etapa {currentStep}/3
          </DialogTitle>
        </DialogHeader>

        {/* Progress Indicator */}
        <div className="flex items-center justify-between mb-6">
          <div className={`flex items-center gap-2 ${currentStep >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
              {currentStep > 1 ? <CheckCircle className="h-5 w-5" /> : '1'}
            </div>
            <span className="text-sm font-medium">Dados Básicos</span>
          </div>
          
          <div className={`w-16 h-0.5 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
          
          <div className={`flex items-center gap-2 ${currentStep >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
              {currentStep > 2 ? <CheckCircle className="h-5 w-5" /> : '2'}
            </div>
            <span className="text-sm font-medium">Ficha Médica</span>
          </div>
          
          <div className={`w-16 h-0.5 ${currentStep >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
          
          <div className={`flex items-center gap-2 ${currentStep >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
              3
            </div>
            <span className="text-sm font-medium">Confirmação</span>
          </div>
        </div>

        {/* Step 1: Basic Data */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Dados do Aluno
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="studentName">Nome Completo do Aluno *</Label>
                    <Input
                      id="studentName"
                      value={studentData.studentName}
                      onChange={(e) => handleStudentDataChange('studentName', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="birthDate">Data de Nascimento *</Label>
                    <Input
                      id="birthDate"
                      type="date"
                      value={studentData.birthDate}
                      onChange={(e) => handleStudentDataChange('birthDate', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="grade">Turma *</Label>
                    <Select value={studentData.grade} onValueChange={(value) => handleStudentDataChange('grade', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a turma" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1ano-a">1º Ano A</SelectItem>
                        <SelectItem value="1ano-b">1º Ano B</SelectItem>
                        <SelectItem value="2ano-a">2º Ano A</SelectItem>
                        <SelectItem value="3ano-a">3º Ano A</SelectItem>
                        <SelectItem value="4ano-a">4º Ano A</SelectItem>
                        <SelectItem value="5ano-a">5º Ano A</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="previousSchool">Escola Anterior (se houver)</Label>
                    <Input
                      id="previousSchool"
                      value={studentData.previousSchool}
                      onChange={(e) => handleStudentDataChange('previousSchool', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dados do Responsável</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="parentName">Nome Completo do Responsável *</Label>
                    <Input
                      id="parentName"
                      value={studentData.parentName}
                      onChange={(e) => handleStudentDataChange('parentName', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="parentCpf">CPF do Responsável</Label>
                    <Input
                      id="parentCpf"
                      value={studentData.parentCpf}
                      onChange={(e) => handleStudentDataChange('parentCpf', e.target.value)}
                      placeholder="000.000.000-00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="parentRg">RG do Responsável</Label>
                    <Input
                      id="parentRg"
                      value={studentData.parentRg}
                      onChange={(e) => handleStudentDataChange('parentRg', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={studentData.email}
                      onChange={(e) => handleStudentDataChange('email', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Telefone Principal *</Label>
                    <Input
                      id="phone"
                      value={studentData.phone}
                      onChange={(e) => handleStudentDataChange('phone', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="emergencyPhone">Telefone de Emergência</Label>
                    <Input
                      id="emergencyPhone"
                      value={studentData.emergencyPhone}
                      onChange={(e) => handleStudentDataChange('emergencyPhone', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Endereço Completo *</Label>
                  <Input
                    id="address"
                    value={studentData.address}
                    onChange={(e) => handleStudentDataChange('address', e.target.value)}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={handleNextStep} disabled={!isStep1Valid()}>
                Próximo: Ficha Médica
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Medical Record */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                Ficha Médica Completa
              </h3>
              <Button variant="outline" onClick={handlePreviousStep}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            </div>
            <MedicalRecordForm 
              studentId={studentData.studentName}
              onSave={handleMedicalDataSave}
              onCancel={handlePreviousStep}
            />
          </div>
        )}

        {/* Step 3: Confirmation */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Confirmação da Matrícula
              </h3>
              <Button variant="outline" onClick={() => setCurrentStep(2)}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Resumo da Matrícula</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-semibold">Aluno:</Label>
                    <p>{studentData.studentName}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Data de Nascimento:</Label>
                    <p>{studentData.birthDate}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Turma:</Label>
                    <p>{studentData.grade}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Responsável:</Label>
                    <p>{studentData.parentName}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Email:</Label>
                    <p>{studentData.email}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Telefone:</Label>
                    <p>{studentData.phone}</p>
                  </div>
                </div>
                <div>
                  <Label className="font-semibold">Endereço:</Label>
                  <p>{studentData.address}</p>
                </div>
                
                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 text-green-700">
                    <Heart className="h-5 w-5" />
                    <span className="font-semibold">Ficha Médica:</span>
                  </div>
                  <p className="text-green-600 text-sm mt-1">
                    ✓ Ficha médica completa preenchida e anexada
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button onClick={handleFinalSubmit} className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="h-4 w-4 mr-2" />
                Confirmar Matrícula
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
