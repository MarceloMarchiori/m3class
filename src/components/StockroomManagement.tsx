
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const StockroomManagement = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('items');

  // Mock data
  const [items, setItems] = useState([
    { id: '1', name: 'Papel A4', category: 'Papelaria', quantity: 500, minQuantity: 100, unit: 'folhas', location: 'Sala 1', status: 'ok' },
    { id: '2', name: 'Caneta Azul', category: 'Papelaria', quantity: 15, minQuantity: 50, unit: 'unidades', location: 'Gaveta 2', status: 'low' },
    { id: '3', name: 'Material de Limpeza', category: 'Limpeza', quantity: 80, minQuantity: 20, unit: 'unidades', location: 'Depósito', status: 'ok' }
  ]);

  const [movements, setMovements] = useState([
    { id: '1', type: 'entrada', item: 'Papel A4', quantity: 200, reason: 'Compra mensal', date: '2025-01-01', user: 'João Silva' },
    { id: '2', type: 'saida', item: 'Caneta Azul', quantity: 35, reason: 'Distribuição salas', date: '2025-01-01', user: 'Maria Santos' }
  ]);

  const addItem = () => {
    const newItem = {
      id: Date.now().toString(),
      name: 'Novo Material',
      category: 'Geral',
      quantity: 0,
      minQuantity: 10,
      unit: 'unidades',
      location: 'A definir',
      status: 'low'
    };
    setItems([...items, newItem]);
    toast({
      title: "Item adicionado",
      description: "Item adicionado ao almoxarifado",
    });
  };

  const addMovement = (type: 'entrada' | 'saida') => {
    const newMovement = {
      id: Date.now().toString(),
      type,
      item: 'Item exemplo',
      quantity: 10,
      reason: type === 'entrada' ? 'Nova compra' : 'Uso escolar',
      date: new Date().toISOString().split('T')[0],
      user: 'Usuário Atual'
    };
    setMovements([newMovement, ...movements]);
    toast({
      title: `${type === 'entrada' ? 'Entrada' : 'Saída'} registrada`,
      description: "Movimento registrado com sucesso",
    });
  };

  const totalItems = items.length;
  const lowStockItems = items.filter(item => item.status === 'low').length;
  const totalMovements = movements.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Package className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Gestão de Almoxarifado</h1>
            <p className="text-gray-600">Controle de materiais e estoque escolar</p>
          </div>
        </div>
      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total de Itens</p>
                <p className="text-2xl font-bold">{totalItems}</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Estoque Baixo</p>
                <p className="text-2xl font-bold text-red-600">{lowStockItems}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Movimentações</p>
                <p className="text-2xl font-bold">{totalMovements}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Categorias</p>
                <p className="text-2xl font-bold">{new Set(items.map(item => item.category)).size}</p>
              </div>
              <Package className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="items">Itens em Estoque</TabsTrigger>
          <TabsTrigger value="movements">Movimentações</TabsTrigger>
        </TabsList>

        <TabsContent value="items" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Controle de Estoque</CardTitle>
                <Button onClick={addItem}>Adicionar Item</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-gray-600">
                          {item.category} | Localização: {item.location}
                        </p>
                        <p className="text-sm text-gray-600">
                          Quantidade: {item.quantity} {item.unit} | Mínimo: {item.minQuantity} {item.unit}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge variant={item.status === 'low' ? 'destructive' : 'default'}>
                          {item.status === 'low' ? 'Estoque Baixo' : 'OK'}
                        </Badge>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => addMovement('entrada')}>
                            <TrendingUp className="h-4 w-4 mr-1" />
                            Entrada
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => addMovement('saida')}>
                            <TrendingDown className="h-4 w-4 mr-1" />
                            Saída
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="movements" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Histórico de Movimentações</CardTitle>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => addMovement('entrada')}>
                    <TrendingUp className="h-4 w-4 mr-1" />
                    Nova Entrada
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => addMovement('saida')}>
                    <TrendingDown className="h-4 w-4 mr-1" />
                    Nova Saída
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {movements.map((movement) => (
                  <div key={movement.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          {movement.type === 'entrada' ? (
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-600" />
                          )}
                          <h3 className="font-semibold">{movement.item}</h3>
                          <Badge variant={movement.type === 'entrada' ? 'default' : 'secondary'}>
                            {movement.type === 'entrada' ? 'Entrada' : 'Saída'}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          Quantidade: {movement.quantity} | Motivo: {movement.reason}
                        </p>
                        <p className="text-xs text-gray-500">
                          {movement.date} | Por: {movement.user}
                        </p>
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
