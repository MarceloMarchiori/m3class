
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  GraduationCap, 
  Users, 
  Shield, 
  BookOpen, 
  Calendar,
  FileText,
  UserCheck,
  Settings,
  BarChart3,
  Bell,
  Utensils,
  Package,
  Bus,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Documentation = () => {
  const features = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Gestão de Usuários",
      description: "Sistema completo para cadastro e gerenciamento de alunos, professores, funcionários e responsáveis",
      userTypes: ["Master", "Diretor", "Secretária"],
      functionalities: [
        "Cadastro de novos usuários",
        "Edição de perfis",
        "Controle de permissões",
        "Histórico de atividades"
      ]
    },
    {
      icon: <UserCheck className="h-6 w-6" />,
      title: "Sistema de Frequência",
      description: "Controle de presença dos alunos com chamadas digitais e relatórios automáticos",
      userTypes: ["Professor", "Diretor", "Secretária"],
      functionalities: [
        "Chamada digital por turma",
        "Relatórios de frequência",
        "Notificações de ausências",
        "Controle de faltas justificadas"
      ]
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Emissão de Documentos",
      description: "Geração automática de declarações, históricos e certificados escolares",
      userTypes: ["Secretária", "Diretor"],
      functionalities: [
        "Declaração de matrícula",
        "Histórico escolar",
        "Declaração de escolaridade",
        "Guia de transferência"
      ]
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Gestão Acadêmica",
      description: "Controle completo do calendário escolar, turmas e horários",
      userTypes: ["Diretor", "Professor", "Secretária"],
      functionalities: [
        "Criação de turmas",
        "Gerenciamento de horários",
        "Calendário escolar",
        "Planejamento de aulas"
      ]
    },
    {
      icon: <Bell className="h-6 w-6" />,
      title: "Sistema de Notificações",
      description: "Comunicação eficiente entre escola, professores e responsáveis",
      userTypes: ["Todos"],
      functionalities: [
        "Notificações em tempo real",
        "Avisos por turma",
        "Comunicados gerais",
        "Alertas de frequência"
      ]
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Relatórios e Analytics",
      description: "Dashboards completos com métricas e indicadores educacionais",
      userTypes: ["Master", "Diretor", "Secretária"],
      functionalities: [
        "Dashboard executivo",
        "Relatórios de desempenho",
        "Métricas de frequência",
        "Análises financeiras"
      ]
    }
  ];

  const modules = [
    {
      icon: <Utensils className="h-6 w-6" />,
      title: "Gestão de Cantina",
      description: "Controle completo do estoque, cardápio e vendas da cantina escolar",
      features: [
        "Controle de estoque de ingredientes",
        "Planejamento de cardápios semanais",
        "Registro de vendas",
        "Relatórios financeiros",
        "Controle de validade dos produtos"
      ]
    },
    {
      icon: <Package className="h-6 w-6" />,
      title: "Almoxarifado",
      description: "Sistema de gestão de materiais escolares e suprimentos",
      features: [
        "Controle de entrada e saída",
        "Inventário em tempo real",
        "Solicitações de material",
        "Alertas de estoque mínimo",
        "Relatórios de consumo"
      ]
    },
    {
      icon: <Bus className="h-6 w-6" />,
      title: "Gestão de Frota",
      description: "Controle de veículos escolares, rotas e manutenções",
      features: [
        "Cadastro de veículos",
        "Controle de rotas",
        "Agendamento de manutenções",
        "Registro de combustível",
        "Controle de motoristas"
      ]
    }
  ];

  const userProfiles = [
    {
      title: "Master",
      icon: <Settings className="h-6 w-6" />,
      description: "Administrador geral do sistema com acesso total",
      permissions: [
        "Gerenciar todas as escolas",
        "Criar e editar usuários",
        "Acessar todos os módulos",
        "Configurar permissões",
        "Visualizar relatórios globais"
      ],
      color: "bg-purple-100 text-purple-800"
    },
    {
      title: "Diretor",
      icon: <Shield className="h-6 w-6" />,
      description: "Gestor da escola com acesso administrativo completo",
      permissions: [
        "Gerenciar usuários da escola",
        "Acessar relatórios executivos",
        "Controlar módulos especiais",
        "Supervisionar atividades",
        "Tomar decisões estratégicas"
      ],
      color: "bg-blue-100 text-blue-800"
    },
    {
      title: "Secretária",
      icon: <FileText className="h-6 w-6" />,
      description: "Responsável pela gestão administrativa e documental",
      permissions: [
        "Gerenciar matrículas",
        "Emitir documentos",
        "Cadastrar usuários",
        "Controlar frequência",
        "Gerenciar módulos operacionais"
      ],
      color: "bg-green-100 text-green-800"
    },
    {
      title: "Professor",
      icon: <BookOpen className="h-6 w-6" />,
      description: "Educador com foco no processo de ensino-aprendizagem",
      permissions: [
        "Fazer chamada",
        "Visualizar turmas",
        "Enviar notificações",
        "Acessar dados dos alunos",
        "Gerar relatórios de turma"
      ],
      color: "bg-orange-100 text-orange-800"
    },
    {
      title: "Responsável",
      icon: <Users className="h-6 w-6" />,
      description: "Pais ou responsáveis com acesso aos dados dos filhos",
      permissions: [
        "Visualizar frequência dos filhos",
        "Receber notificações",
        "Acompanhar desempenho",
        "Comunicar com professores",
        "Acessar documentos"
      ],
      color: "bg-yellow-100 text-yellow-800"
    },
    {
      title: "Aluno",
      icon: <GraduationCap className="h-6 w-6" />,
      description: "Estudante com acesso limitado às próprias informações",
      permissions: [
        "Visualizar próprias notas",
        "Consultar frequência",
        "Receber comunicados",
        "Acessar calendário escolar",
        "Visualizar horários"
      ],
      color: "bg-pink-100 text-pink-800"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar ao Login
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="bg-blue-600 p-2 rounded-full">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">M3Class</h1>
                  <p className="text-sm text-muted-foreground">Documentação do Sistema</p>
                </div>
              </div>
            </div>
            <Badge className="bg-blue-100 text-blue-800">
              Versão 1.0
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-8 space-y-12">
        {/* Introdução */}
        <section>
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl text-center">Sistema de Gestão Escolar M3Class</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg text-center text-muted-foreground">
                Uma solução completa e moderna para gestão educacional, desenvolvida para otimizar 
                todos os processos administrativos e pedagógicos da sua instituição de ensino.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <Card className="text-center p-6">
                  <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto mb-4">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Gestão Completa</h3>
                  <p className="text-sm text-muted-foreground">
                    Controle total de alunos, professores e funcionários
                  </p>
                </Card>
                <Card className="text-center p-6">
                  <div className="p-3 bg-green-100 rounded-full w-fit mx-auto mb-4">
                    <BarChart3 className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Relatórios Inteligentes</h3>
                  <p className="text-sm text-muted-foreground">
                    Dashboards e analytics para tomada de decisão
                  </p>
                </Card>
                <Card className="text-center p-6">
                  <div className="p-3 bg-purple-100 rounded-full w-fit mx-auto mb-4">
                    <Shield className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Segurança Total</h3>
                  <p className="text-sm text-muted-foreground">
                    Controle de acesso e proteção de dados
                  </p>
                </Card>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Perfis de Usuário */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Perfis de Usuário</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userProfiles.map((profile, index) => (
              <Card key={index} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${profile.color}`}>
                      {profile.icon}
                    </div>
                    {profile.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{profile.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Permissões:</h4>
                    <ul className="space-y-1">
                      {profile.permissions.map((permission, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                          {permission}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Funcionalidades Principais */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Funcionalidades Principais</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                      {feature.icon}
                    </div>
                    {feature.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Disponível para:</h4>
                    <div className="flex gap-2 flex-wrap">
                      {feature.userTypes.map((type, idx) => (
                        <Badge key={idx} variant="secondary">{type}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Funcionalidades:</h4>
                    <ul className="space-y-1">
                      {feature.functionalities.map((func, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                          {func}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Módulos Especializados */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Módulos Especializados</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {modules.map((module, index) => (
              <Card key={index} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                      {module.icon}
                    </div>
                    {module.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{module.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {module.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Benefícios */}
        <section>
          <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-50 to-purple-50">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Benefícios do M3Class</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto mb-3">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Economia de Tempo</h4>
                  <p className="text-sm text-muted-foreground">
                    Automação de processos reduz tempo em tarefas administrativas
                  </p>
                </div>
                <div className="text-center">
                  <div className="p-3 bg-green-100 rounded-full w-fit mx-auto mb-3">
                    <BarChart3 className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Decisões Inteligentes</h4>
                  <p className="text-sm text-muted-foreground">
                    Relatórios detalhados para tomada de decisão baseada em dados
                  </p>
                </div>
                <div className="text-center">
                  <div className="p-3 bg-purple-100 rounded-full w-fit mx-auto mb-3">
                    <Shield className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Maior Segurança</h4>
                  <p className="text-sm text-muted-foreground">
                    Controle de acesso e backup automático dos dados
                  </p>
                </div>
                <div className="text-center">
                  <div className="p-3 bg-orange-100 rounded-full w-fit mx-auto mb-3">
                    <Bell className="h-6 w-6 text-orange-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Comunicação Eficaz</h4>
                  <p className="text-sm text-muted-foreground">
                    Notificações em tempo real entre todos os usuários
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Footer */}
        <section className="text-center py-8 border-t">
          <p className="text-muted-foreground mb-4">
            © 2025 M3Class - Sistema de Gestão Escolar. Todos os direitos reservados.
          </p>
          <p className="text-sm text-muted-foreground">
            Para mais informações ou suporte técnico, entre em contato conosco.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Documentation;
