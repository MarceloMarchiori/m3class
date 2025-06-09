
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar, Filter, Download, RefreshCw } from 'lucide-react';

interface DashboardFiltersProps {
  onPeriodChange: (period: string) => void;
  onRefresh: () => void;
  selectedPeriod: string;
}

export const DashboardFilters = ({ onPeriodChange, onRefresh, selectedPeriod }: DashboardFiltersProps) => {
  const periods = [
    { value: '7d', label: 'Últimos 7 dias' },
    { value: '30d', label: 'Últimos 30 dias' },
    { value: '90d', label: 'Últimos 3 meses' },
    { value: '1y', label: 'Último ano' },
    { value: 'all', label: 'Todo período' }
  ];

  return (
    <Card className="mb-6 border-0 shadow-lg bg-gradient-to-r from-white/80 to-gray-50/80 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-600" />
              <span className="font-medium text-gray-700">Filtros:</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <Select value={selectedPeriod} onValueChange={onPeriodChange}>
                <SelectTrigger className="w-48 border-0 bg-white/60 backdrop-blur-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {periods.map((period) => (
                    <SelectItem key={period.value} value={period.value}>
                      {period.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Badge variant="outline" className="bg-white/60 backdrop-blur-sm">
              Dados atualizados em tempo real
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={onRefresh}
              className="bg-white/60 backdrop-blur-sm border-0 hover:bg-white/80"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Atualizar
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              className="bg-white/60 backdrop-blur-sm border-0 hover:bg-white/80"
            >
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
