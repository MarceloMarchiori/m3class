import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface PerformanceMetrics {
  connectionCount: number;
  queryTime: number;
  lastUpdate: Date;
  cacheHits: number;
  slowQueries: number;
}

interface OptimizedQuery {
  query: string;
  cachedAt: Date;
  data: any;
}

// Cache global para queries
const queryCache = new Map<string, OptimizedQuery>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

export const useSupabaseOptimization = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    connectionCount: 0,
    queryTime: 0,
    lastUpdate: new Date(),
    cacheHits: 0,
    slowQueries: 0
  });

  // Cache de queries com TTL
  const cachedQuery = async (key: string, queryFn: () => Promise<any>) => {
    const cached = queryCache.get(key);
    
    if (cached && (Date.now() - cached.cachedAt.getTime()) < CACHE_DURATION) {
      setMetrics(prev => ({ ...prev, cacheHits: prev.cacheHits + 1 }));
      return cached.data;
    }

    const startTime = Date.now();
    const data = await queryFn();
    const queryTime = Date.now() - startTime;

    // Log queries lentas
    if (queryTime > 1000) {
      console.warn(`Slow query detected: ${key} took ${queryTime}ms`);
      setMetrics(prev => ({ ...prev, slowQueries: prev.slowQueries + 1 }));
    }

    queryCache.set(key, {
      query: key,
      cachedAt: new Date(),
      data
    });

    setMetrics(prev => ({
      ...prev,
      queryTime: queryTime,
      lastUpdate: new Date()
    }));

    return data;
  };

  // Limpeza automática do cache
  useEffect(() => {
    const cleanup = setInterval(() => {
      const now = Date.now();
      for (const [key, cached] of queryCache.entries()) {
        if ((now - cached.cachedAt.getTime()) > CACHE_DURATION) {
          queryCache.delete(key);
        }
      }
    }, 60000); // Limpa a cada minuto

    return () => clearInterval(cleanup);
  }, []);

  // Monitoramento de conexões
  useEffect(() => {
    const connectionMonitor = setInterval(async () => {
      try {
        const { data } = await supabase.from('profiles').select('count').limit(1);
        setMetrics(prev => ({ 
          ...prev, 
          connectionCount: prev.connectionCount + 1,
          lastUpdate: new Date()
        }));
      } catch (error) {
        console.warn('Connection monitor error:', error);
      }
    }, 30000); // Monitor a cada 30 segundos

    return () => clearInterval(connectionMonitor);
  }, []);

  const clearCache = () => {
    queryCache.clear();
    setMetrics(prev => ({ ...prev, cacheHits: 0 }));
  };

  return {
    metrics,
    cachedQuery,
    clearCache
  };
};