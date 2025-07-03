import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Activity, 
  Database, 
  Timer, 
  RefreshCw,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { useSupabaseOptimization } from '@/hooks/useSupabaseOptimization';

export const PerformanceMonitor: React.FC = () => {
  const { metrics, clearCache } = useSupabaseOptimization();

  const getPerformanceStatus = () => {
    if (metrics.queryTime > 2000) return { color: 'bg-red-100 text-red-800', icon: AlertTriangle, text: 'Lento' };
    if (metrics.queryTime > 1000) return { color: 'bg-yellow-100 text-yellow-800', icon: Timer, text: 'Moderado' };
    return { color: 'bg-green-100 text-green-800', icon: CheckCircle, text: 'Rápido' };
  };

  const status = getPerformanceStatus();
  const StatusIcon = status.icon;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Monitor de Performance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">Conexões</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {metrics.connectionCount}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Timer className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-medium">Última Query</span>
            </div>
            <div className="text-2xl font-bold text-orange-600">
              {metrics.queryTime}ms
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">Cache Hits</span>
            </div>
            <div className="text-2xl font-bold text-green-600">
              {metrics.cacheHits}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <span className="text-sm font-medium">Queries Lentas</span>
            </div>
            <div className="text-2xl font-bold text-red-600">
              {metrics.slowQueries}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <StatusIcon className="h-4 w-4" />
            <span className="text-sm">Status:</span>
            <Badge className={status.color}>
              {status.text}
            </Badge>
          </div>
          
          <Button
            size="sm"
            variant="outline"
            onClick={clearCache}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Limpar Cache
          </Button>
        </div>

        <div className="text-xs text-muted-foreground">
          Última atualização: {metrics.lastUpdate.toLocaleTimeString()}
        </div>
      </CardContent>
    </Card>
  );
};