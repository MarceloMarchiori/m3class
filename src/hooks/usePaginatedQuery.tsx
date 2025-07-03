import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useSupabaseOptimization } from './useSupabaseOptimization';

interface PaginationConfig {
  table: string;
  columns?: string;
  pageSize?: number;
  filters?: Record<string, any>;
  orderBy?: { column: string; ascending?: boolean };
}

export const usePaginatedQuery = (config: PaginationConfig) => {
  const { table, columns = '*', pageSize = 20, filters = {}, orderBy } = config;
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  
  const { cachedQuery } = useSupabaseOptimization();

  const fetchData = async (page: number, append = false) => {
    setLoading(true);
    setError(null);

    try {
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      const cacheKey = `${table}-${columns}-${JSON.stringify(filters)}-${page}-${pageSize}`;

      const result = await cachedQuery(cacheKey, async () => {
        let query = supabase
          .from(table as any)
          .select(columns, { count: 'exact' })
          .range(from, to);

        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            if (typeof value === 'string' && value.startsWith('ilike.')) {
              query = query.ilike(key, value.replace('ilike.', ''));
            } else {
              query = query.eq(key, value);
            }
          }
        });

        if (orderBy) {
          query = query.order(orderBy.column, { ascending: orderBy.ascending ?? true });
        }

        return await query;
      });

      const { data: fetchedData, error: fetchError, count } = result;

      if (fetchError) throw fetchError;

      const newData = fetchedData || [];
      
      if (append) {
        setData(prev => [...prev, ...newData]);
      } else {
        setData(newData);
      }

      setTotalCount(count || 0);
      setHasMore(newData.length === pageSize);
      setCurrentPage(page);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
      console.error('Pagination error:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      fetchData(currentPage + 1, true);
    }
  };

  const refresh = () => {
    fetchData(1);
  };

  const goToPage = (page: number) => {
    fetchData(page);
  };

  useEffect(() => {
    fetchData(1);
  }, [table, JSON.stringify(filters), JSON.stringify(orderBy)]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    data,
    loading,
    error,
    currentPage,
    totalCount,
    totalPages,
    hasMore,
    loadMore,
    refresh,
    goToPage
  };
};