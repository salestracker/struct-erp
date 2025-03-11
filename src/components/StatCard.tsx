import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
    description?: string;
  };
  loading?: boolean;
  className?: string;
}

export function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  loading = false,
  className 
}: StatCardProps) {
  return (
    <div className={cn(
      "bg-white p-4 md:p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow",
      loading && "animate-pulse",
      className
    )}>
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <h3 className="text-gray-500 text-sm font-medium truncate">{title}</h3>
        <Icon className="w-5 h-5 text-gray-400" />
      </div>
      <div className="space-y-2">
        <div className="flex items-baseline gap-2">
          <span className="text-lg md:text-2xl font-bold text-gray-900 truncate">
            {loading ? "Loading..." : value}
          </span>
          {trend && !loading && (
            <span
              className={cn(
                "text-xs md:text-sm font-medium flex items-center gap-1",
                trend.positive ? "text-green-600" : "text-red-600"
              )}
            >
              {trend.positive ? "+" : "-"}{trend.value}
              {trend.description && (
                <span className="text-gray-500 text-xs">
                  ({trend.description})
                </span>
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
