
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface ModernMetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    isPositive: boolean;
  };
  sparklineData?: Array<{ value: number }>;
  gradient: string;
  icon: React.ReactNode;
}

export const ModernMetricCard = ({ 
  title, 
  value, 
  change, 
  sparklineData, 
  gradient,
  icon 
}: ModernMetricCardProps) => {
  return (
    <Card className={`relative overflow-hidden border-0 shadow-lg backdrop-blur-sm bg-gradient-to-br ${gradient} hover:scale-105 transition-all duration-300`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
      <CardContent className="relative p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-white/80 text-sm font-medium">{title}</div>
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            {icon}
          </div>
        </div>
        
        <div className="text-3xl font-bold text-white mb-2">{value}</div>
        
        {change && (
          <div className="flex items-center gap-2 mb-3">
            {change.isPositive ? (
              <TrendingUp className="h-4 w-4 text-green-300" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-300" />
            )}
            <span className={`text-sm font-medium ${
              change.isPositive ? 'text-green-300' : 'text-red-300'
            }`}>
              {change.isPositive ? '+' : ''}{change.value}%
            </span>
            <span className="text-white/60 text-xs">vs. mês anterior</span>
          </div>
        )}
        
        {sparklineData && (
          <div className="h-12 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklineData}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="rgba(255,255,255,0.8)" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
