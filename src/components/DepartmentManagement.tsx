
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  AlertTriangle,
  Plus,
  Search,
  FileText
} from "lucide-react";
import { Department, InventoryItem } from "@/types/school";

interface DepartmentManagementProps {
  department: Department;
  onBack: () => void;
}

const mockInventoryItems: InventoryItem[] = [
  {
    id: "1",
    name: "Papel A4",
    quantity: 150,
    minQuantity: 50,
    unit: "resmas",
    price: 25.90,
    supplier: "Papelaria Central",
    lastPurchase: new Date("2024-05-15")
  },
  {
    id: "2",
    name: "Canetas Azuis",
    quantity: 25,
    minQuantity: 30,
    unit: "caixas",
    price: 45.00,
    supplier: "Material Escolar Plus",
    lastPurchase: new Date("2024-05-10")
  },
  {
    id: "3",
    name: "Grampeador",
    quantity: 8,
    minQuantity: 5,
    unit: "unidades",
    price: 35.90,
    supplier: "Escritório Total",
    lastPurchase: new Date("2024-04-20")
  }
];

export const DepartmentManagement = ({ department, onBack }: DepartmentManagementProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [items] = useState<InventoryItem[]>(mockInventoryItems);

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lowStockItems = items.filter(item => item.quantity <= item.minQuantity);

  return (
    <div className="space-y-6">
      <Card className="gradient-card">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              {department.name} - Gestão Completa
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">R$ {department.budget.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Orçamento Total</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-success">{items.length}</div>
                <div className="text-sm text-muted-foreground">Itens em Estoque</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-destructive">{lowStockItems.length}</div>
                <div className="text-sm text-muted-foreground">Alertas de Estoque</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="estoque" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="estoque">Controle de Estoque</TabsTrigger>
              <TabsTrigger value="compras">Sistema de Compras</TabsTrigger>
              <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
              <TabsTrigger value="fornecedores">Fornecedores</TabsTrigger>
            </TabsList>

            <TabsContent value="estoque" className="space-y-4">
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar item..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Item
                </Button>
              </div>

              {lowStockItems.length > 0 && (
                <Card className="border-warning">
                  <CardHeader>
                    <CardTitle className="text-warning flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      Alertas de Estoque Baixo
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {lowStockItems.map(item => (
                        <div key={item.id} className="flex items-center justify-between p-2 bg-warning/10 rounded">
                          <span className="font-medium">{item.name}</span>
                          <Badge variant="destructive">
                            {item.quantity} {item.unit} (Min: {item.minQuantity})
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>Itens em Estoque</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredItems.map(item => (
                      <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex-1">
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Fornecedor: {item.supplier} | Última compra: {item.lastPurchase.toLocaleDateString()}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <div className="font-bold">{item.quantity} {item.unit}</div>
                            <div className="text-xs text-muted-foreground">Em estoque</div>
                          </div>
                          
                          <div className="text-center">
                            <div className="font-bold">R$ {item.price.toFixed(2)}</div>
                            <div className="text-xs text-muted-foreground">Preço unit.</div>
                          </div>
                          
                          <Badge 
                            variant={item.quantity > item.minQuantity ? "default" : "destructive"}
                          >
                            {item.quantity > item.minQuantity ? "Normal" : "Baixo"}
                          </Badge>
                          
                          <Button variant="outline" size="sm">
                            Editar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="compras">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Sistema de Compras
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Nova Solicitação de Compra
                    </Button>
                    <p className="text-muted-foreground">
                      Funcionalidade completa de compras será implementada na próxima fase.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="relatorios">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Relatórios Financeiros
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button variant="outline">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Relatório de Gastos Mensais
                    </Button>
                    <p className="text-muted-foreground">
                      Sistema completo de relatórios será implementado na próxima fase.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="fornecedores">
              <Card>
                <CardHeader>
                  <CardTitle>Gestão de Fornecedores</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Cadastrar Fornecedor
                    </Button>
                    <p className="text-muted-foreground">
                      Gestão completa de fornecedores será implementada na próxima fase.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
