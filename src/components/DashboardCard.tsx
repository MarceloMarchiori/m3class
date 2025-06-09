
import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  children?: ReactNode;
}

export const DashboardCard = ({ 
  title, 
  value, 
  icon: Icon, 
  subtitle, 
  trend, 
  className = "",
  children 
}: DashboardCardProps) => {
  return (
    <Card className={`transition-all duration-300 hover:shadow-card-hover hover:scale-105 ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">
            {subtitle}
          </p>
        )}
        {trend && (
          <div className="flex items-center mt-2">
            <span className={`text-xs font-medium ${
              trend.isPositive ? 'text-success' : 'text-destructive'
            }`}>
              {trend.isPositive ? '+' : ''}{trend.value}%
            </span>
            <span className="text-xs text-muted-foreground ml-1">
              vs. mês anterior
            </span>
          </div>
        )}
        {children}
      </CardContent>
    </Card>
  );
};
