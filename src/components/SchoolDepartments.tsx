
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Utensils, 
  Package, 
  BookOpen, 
  FlaskConical, 
  FileText, 
  Wrench, 
  Bus, 
  Sparkles,
  Building,
  AlertTriangle,
  TrendingUp,
  ShoppingCart
} from "lucide-react";
import { Department } from "@/types/school";
import { DepartmentManagement } from "./DepartmentManagement";

const mockDepartments: Department[] = [
  {
    id: "1",
    name: "Cantina",
    icon: "Utensils",
    color: "bg-orange-100 text-orange-800",
    manager: "Maria Silva",
    budget: 15000,
    currentStock: 85,
    minStock: 20,
    items: []
  },
  {
    id: "2",
    name: "Almoxarifado",
    icon: "Package",
    color: "bg-blue-100 text-blue-800",
    manager: "João Santos",
    budget: 25000,
    currentStock: 65,
    minStock: 30,
    items: []
  },
  {
    id: "3",
    name: "Biblioteca",
    icon: "BookOpen",
    color: "bg-green-100 text-green-800",
    manager: "Ana Costa",
    budget: 12000,
    currentStock: 95,
    minStock: 10,
    items: []
  },
  {
    id: "4",
    name: "Laboratório",
    icon: "FlaskConical",
    color: "bg-purple-100 text-purple-800",
    manager: "Dr. Carlos",
    budget: 30000,
    currentStock: 45,
    minStock: 25,
    items: []
  },
  {
    id: "5",
    name: "Secretaria",
    icon: "FileText",
    color: "bg-gray-100 text-gray-800",
    manager: "Paula Admin",
    budget: 8000,
    currentStock: 75,
    minStock: 15,
    items: []
  },
  {
    id: "6",
    name: "Manutenção",
    icon: "Wrench",
    color: "bg-yellow-100 text-yellow-800",
    manager: "Roberto Tech",
    budget: 20000,
    currentStock: 40,
    minStock: 20,
    items: []
  },
  {
    id: "7",
    name: "Transporte",
    icon: "Bus",
    color: "bg-indigo-100 text-indigo-800",
    manager: "Miguel Driver",
    budget: 35000,
    currentStock: 80,
    minStock: 15,
    items: []
  },
  {
    id: "8",
    name: "Limpeza",
    icon: "Sparkles",
    color: "bg-pink-100 text-pink-800",
    manager: "Sandra Clean",
    budget: 10000,
    currentStock: 70,
    minStock: 25,
    items: []
  }
];

const getIcon = (iconName: string) => {
  const icons = {
    Utensils, Package, BookOpen, FlaskConical, FileText, Wrench, Bus, Sparkles
  };
  return icons[iconName as keyof typeof icons] || Building;
};

export const SchoolDepartments = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);

  if (selectedDepartment) {
    return (
      <DepartmentManagement 
        department={selectedDepartment}
        onBack={() => setSelectedDepartment(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <Card className="gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Gestão de Departamentos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockDepartments.map((department) => {
              const Icon = getIcon(department.icon);
              const isLowStock = department.currentStock <= department.minStock;
              
              return (
                <Card 
                  key={department.id} 
                  className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
                  onClick={() => setSelectedDepartment(department)}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${department.color}`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    
                    <h3 className="font-semibold text-lg mb-2">{department.name}</h3>
                    
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div>Gestor: {department.manager}</div>
                      <div>Orçamento: R$ {department.budget.toLocaleString()}</div>
                      
                      <div className="flex items-center justify-center gap-2">
                        <span>Estoque: {department.currentStock}%</span>
                        {isLowStock && (
                          <AlertTriangle className="h-4 w-4 text-warning" />
                        )}
                      </div>
                      
                      {isLowStock && (
                        <Badge variant="destructive" className="text-xs">
                          Estoque Baixo
                        </Badge>
                      )}
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <Button variant="outline" size="sm" className="w-full">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Ver Relatório
                      </Button>
                      <Button variant="default" size="sm" className="w-full">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Nova Compra
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
