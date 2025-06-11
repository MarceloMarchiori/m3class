
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Utensils, Package, DollarSign, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const CanteenManagement = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('menu');

  // Mock data
  const [menuItems, setMenuItems] = useState([
    { id: '1', day: 'Segunda', meal: 'Almoço', items: ['Arroz', 'Feijão', 'Frango grelhado', 'Salada'] },
    { id: '2', day: 'Terça', meal: 'Almoço', items: ['Macarrão', 'Molho de tomate', 'Carne moída', 'Legumes'] }
  ]);

  const [inventory, setInventory] = useState([
    { id: '1', name: 'Arroz', quantity: 50, unit: 'kg', minQuantity: 10, status: 'ok' },
    { id: '2', name: 'Feijão', quantity: 8, unit: 'kg', minQuantity: 10, status: 'low' },
    { id: '3', name: 'Frango', quantity: 25, unit: 'kg', minQuantity: 15, status: 'ok' }
  ]);

  const [sales, setSales] = useState([
    { id: '1', item: 'Lanche natural', quantity: 15, price: 5.50, total: 82.50, date: '2025-01-01' },
    { id: '2', item: 'Suco de laranja', quantity: 20, price: 3.00, total: 60.00, date: '2025-01-01' }
  ]);

  const addMenuItem = () => {
    const newItem = {
      id: Date.now().toString(),
      day: 'Quarta',
      meal: 'Almoço',
      items: ['Novo item']
    };
    setMenuItems([...menuItems, newItem]);
    toast({
      title: "Item adicionado",
      description: "Item do cardápio adicionado com sucesso",
    });
  };

  const addInventoryItem = () => {
    const newItem = {
      id: Date.now().toString(),
      name: 'Novo produto',
      quantity: 0,
      unit: 'kg',
      minQuantity: 5,
      status: 'low'
    };
    setInventory([...inventory, newItem]);
    toast({
      title: "Produto adicionado",
      description: "Produto adicionado ao estoque",
    });
  };

  const totalSales = sales.reduce((sum, sale) => sum + sale.total, 0);
  const lowStockItems = inventory.filter(item => item.status === 'low');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-orange-100 p-2 rounded-lg">
            <Utensils className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Gestão de Cantina</h1>
            <p className="text-gray-600">Controle completo da cantina escolar</p>
          </div>
        </div>
      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Vendas Hoje</p>
                <p className="text-2xl font-bold text-green-600">R$ {totalSales.toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Itens em Estoque</p>
                <p className="text-2xl font-bold">{inventory.length}</p>
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
                <p className="text-2xl font-bold text-red-600">{lowStockItems.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Itens do Cardápio</p>
                <p className="text-2xl font-bold">{menuItems.length}</p>
              </div>
              <Utensils className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="menu">Cardápio</TabsTrigger>
          <TabsTrigger value="inventory">Estoque</TabsTrigger>
          <TabsTrigger value="sales">Vendas</TabsTrigger>
        </TabsList>

        <TabsContent value="menu" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Cardápio Semanal</CardTitle>
                <Button onClick={addMenuItem}>Adicionar Item</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {menuItems.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{item.day} - {item.meal}</h3>
                      <Badge variant="outline">{item.items.length} itens</Badge>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.items.map((menuItem, index) => (
                        <Badge key={index} variant="secondary">{menuItem}</Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Controle de Estoque</CardTitle>
                <Button onClick={addInventoryItem}>Adicionar Produto</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inventory.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-gray-600">
                          Quantidade: {item.quantity} {item.unit} | Mínimo: {item.minQuantity} {item.unit}
                        </p>
                      </div>
                      <Badge variant={item.status === 'low' ? 'destructive' : 'default'}>
                        {item.status === 'low' ? 'Estoque Baixo' : 'OK'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Registro de Vendas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sales.map((sale) => (
                  <div key={sale.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{sale.item}</h3>
                        <p className="text-sm text-gray-600">
                          {sale.quantity} unidades × R$ {sale.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">R$ {sale.total.toFixed(2)}</p>
                        <p className="text-xs text-gray-500">{sale.date}</p>
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
