
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bus, Wrench, MapPin, Fuel, AlertTriangle, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const FleetManagement = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('vehicles');

  // Mock data
  const [vehicles, setVehicles] = useState([
    { 
      id: '1', 
      plate: 'ABC-1234', 
      model: 'Mercedes Sprinter', 
      capacity: 25, 
      status: 'ativo', 
      driver: 'João Silva',
      fuelType: 'Diesel',
      year: 2020
    },
    { 
      id: '2', 
      plate: 'DEF-5678', 
      model: 'Iveco Daily', 
      capacity: 30, 
      status: 'manutencao', 
      driver: 'Maria Santos',
      fuelType: 'Diesel',
      year: 2019
    }
  ]);

  const [routes, setRoutes] = useState([
    { 
      id: '1', 
      name: 'Rota Centro', 
      vehicle: 'ABC-1234', 
      stops: ['Centro', 'Bairro A', 'Escola'], 
      startTime: '07:00', 
      endTime: '08:30',
      active: true
    },
    { 
      id: '2', 
      name: 'Rota Norte', 
      vehicle: 'DEF-5678', 
      stops: ['Bairro Norte', 'Shopping', 'Escola'], 
      startTime: '07:15', 
      endTime: '08:45',
      active: false
    }
  ]);

  const [maintenance, setMaintenance] = useState([
    { 
      id: '1', 
      vehicle: 'ABC-1234', 
      type: 'Revisão', 
      date: '2025-01-15', 
      nextDate: '2025-04-15',
      cost: 850.00,
      status: 'agendada'
    },
    { 
      id: '2', 
      vehicle: 'DEF-5678', 
      type: 'Troca de óleo', 
      date: '2025-01-10', 
      nextDate: '2025-04-10',
      cost: 320.00,
      status: 'concluida'
    }
  ]);

  const [fuelRecords, setFuelRecords] = useState([
    { id: '1', vehicle: 'ABC-1234', amount: 80, cost: 480.00, date: '2025-01-01', station: 'Posto Brasileiro' },
    { id: '2', vehicle: 'DEF-5678', amount: 75, cost: 450.00, date: '2024-12-30', station: 'Posto Shell' }
  ]);

  const addVehicle = () => {
    const newVehicle = {
      id: Date.now().toString(),
      plate: 'XXX-0000',
      model: 'Novo Veículo',
      capacity: 20,
      status: 'ativo',
      driver: 'A definir',
      fuelType: 'Diesel',
      year: 2025
    };
    setVehicles([...vehicles, newVehicle]);
    toast({
      title: "Veículo adicionado",
      description: "Novo veículo cadastrado na frota",
    });
  };

  const addRoute = () => {
    const newRoute = {
      id: Date.now().toString(),
      name: 'Nova Rota',
      vehicle: 'A definir',
      stops: ['Parada 1', 'Escola'],
      startTime: '07:00',
      endTime: '08:00',
      active: true
    };
    setRoutes([...routes, newRoute]);
    toast({
      title: "Rota criada",
      description: "Nova rota adicionada ao sistema",
    });
  };

  const totalVehicles = vehicles.length;
  const activeVehicles = vehicles.filter(v => v.status === 'ativo').length;
  const vehiclesInMaintenance = vehicles.filter(v => v.status === 'manutencao').length;
  const activeRoutes = routes.filter(r => r.active).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-yellow-100 p-2 rounded-lg">
            <Bus className="h-6 w-6 text-yellow-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Gestão de Frota Escolar</h1>
            <p className="text-gray-600">Controle completo da frota de transporte</p>
          </div>
        </div>
      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total de Veículos</p>
                <p className="text-2xl font-bold">{totalVehicles}</p>
              </div>
              <Bus className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Veículos Ativos</p>
                <p className="text-2xl font-bold text-green-600">{activeVehicles}</p>
              </div>
              <Bus className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Em Manutenção</p>
                <p className="text-2xl font-bold text-red-600">{vehiclesInMaintenance}</p>
              </div>
              <Wrench className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rotas Ativas</p>
                <p className="text-2xl font-bold">{activeRoutes}</p>
              </div>
              <MapPin className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="vehicles">Veículos</TabsTrigger>
          <TabsTrigger value="routes">Rotas</TabsTrigger>
          <TabsTrigger value="maintenance">Manutenção</TabsTrigger>
          <TabsTrigger value="fuel">Combustível</TabsTrigger>
        </TabsList>

        <TabsContent value="vehicles" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Frota de Veículos</CardTitle>
                <Button onClick={addVehicle}>Adicionar Veículo</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vehicles.map((vehicle) => (
                  <div key={vehicle.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{vehicle.model} - {vehicle.plate}</h3>
                        <p className="text-sm text-gray-600">
                          Capacidade: {vehicle.capacity} passageiros | Motorista: {vehicle.driver}
                        </p>
                        <p className="text-sm text-gray-600">
                          {vehicle.fuelType} | Ano: {vehicle.year}
                        </p>
                      </div>
                      <Badge variant={vehicle.status === 'ativo' ? 'default' : vehicle.status === 'manutencao' ? 'destructive' : 'secondary'}>
                        {vehicle.status === 'ativo' ? 'Ativo' : vehicle.status === 'manutencao' ? 'Manutenção' : 'Inativo'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="routes" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Rotas de Transporte</CardTitle>
                <Button onClick={addRoute}>Criar Rota</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {routes.map((route) => (
                  <div key={route.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{route.name}</h3>
                        <p className="text-sm text-gray-600">
                          Veículo: {route.vehicle} | Horário: {route.startTime} - {route.endTime}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <p className="text-sm text-gray-600">
                            {route.stops.join(' → ')}
                          </p>
                        </div>
                      </div>
                      <Badge variant={route.active ? 'default' : 'secondary'}>
                        {route.active ? 'Ativa' : 'Inativa'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Controle de Manutenção</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {maintenance.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{item.type} - {item.vehicle}</h3>
                        <p className="text-sm text-gray-600">
                          Data: {item.date} | Próxima: {item.nextDate}
                        </p>
                        <p className="text-sm text-gray-600">
                          Custo: R$ {item.cost.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge variant={item.status === 'concluida' ? 'default' : 'secondary'}>
                          {item.status === 'concluida' ? 'Concluída' : 'Agendada'}
                        </Badge>
                        {item.status === 'agendada' && (
                          <div className="flex items-center gap-1 text-orange-600">
                            <Calendar className="h-4 w-4" />
                            <span className="text-xs">Agendada</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fuel" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Controle de Combustível</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {fuelRecords.map((record) => (
                  <div key={record.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{record.vehicle}</h3>
                        <p className="text-sm text-gray-600">
                          {record.amount}L - {record.station}
                        </p>
                        <p className="text-xs text-gray-500">{record.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">R$ {record.cost.toFixed(2)}</p>
                        <div className="flex items-center gap-1">
                          <Fuel className="h-4 w-4 text-gray-400" />
                          <span className="text-xs text-gray-500">
                            R$ {(record.cost / record.amount).toFixed(2)}/L
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
