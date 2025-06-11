
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { FileText, Download } from 'lucide-react';

interface DocumentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DocumentModal: React.FC<DocumentModalProps> = ({ open, onOpenChange }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    studentName: '',
    documentType: '',
    purpose: '',
    observations: ''
  });

  const handleGenerate = () => {
    toast({
      title: "Documento gerado com sucesso!",
      description: `${formData.documentType} para ${formData.studentName} foi criado e está pronto para download.`,
    });
    
    setFormData({
      studentName: '',
      documentType: '',
      purpose: '',
      observations: ''
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Emitir Documento
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="studentName">Nome do Aluno</Label>
            <Input
              id="studentName"
              placeholder="Digite o nome do aluno"
              value={formData.studentName}
              onChange={(e) => setFormData(prev => ({ ...prev, studentName: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="documentType">Tipo de Documento</Label>
            <Select value={formData.documentType} onValueChange={(value) => setFormData(prev => ({ ...prev, documentType: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo de documento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="declaracao-matricula">Declaração de Matrícula</SelectItem>
                <SelectItem value="declaracao-escolaridade">Declaração de Escolaridade</SelectItem>
                <SelectItem value="historico-escolar">Histórico Escolar</SelectItem>
                <SelectItem value="boletim">Boletim Escolar</SelectItem>
                <SelectItem value="declaracao-frequencia">Declaração de Frequência</SelectItem>
                <SelectItem value="transferencia">Guia de Transferência</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="purpose">Finalidade</Label>
            <Input
              id="purpose"
              placeholder="Ex: Para fins de benefício social, matrícula em curso, etc."
              value={formData.purpose}
              onChange={(e) => setFormData(prev => ({ ...prev, purpose: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="observations">Observações (opcional)</Label>
            <Textarea
              id="observations"
              placeholder="Observações adicionais para o documento"
              value={formData.observations}
              onChange={(e) => setFormData(prev => ({ ...prev, observations: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button onClick={handleGenerate} disabled={!formData.studentName || !formData.documentType}>
              <Download className="h-4 w-4 mr-2" />
              Gerar Documento
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
