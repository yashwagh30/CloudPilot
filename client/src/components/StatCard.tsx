import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkline } from "./Sparkline";
import { LucideIcon, TrendingUp, TrendingDown, MoreHorizontal } from "lucide-react";
import { cardVariants } from "@/utils/motionVariants";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface StatCardProps {
  title: string;
  value: string;
  change: {
    value: string;
    trend: 'up' | 'down' | 'neutral';
  };
  icon: LucideIcon;
  sparklineData: number[];
  description?: string;
  onAction?: (action: string) => void;
  className?: string;
  shouldReduceMotion?: boolean;
}

export default function StatCard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  sparklineData,
  description,
  onAction,
  className,
  shouldReduceMotion = false 
}: StatCardProps) {
  const getTrendColor = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up': return 'text-chart-2 bg-chart-2/20';
      case 'down': return 'text-destructive bg-destructive/20';
      default: return 'text-muted-foreground bg-muted/20';
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up': return TrendingUp;
      case 'down': return TrendingDown;
      default: return null;
    }
  };

  const TrendIcon = getTrendIcon(change.trend);
  const sparklineColor = change.trend === 'up' ? 'hsl(var(--chart-2))' : 
                         change.trend === 'down' ? 'hsl(var(--destructive))' : 
                         'hsl(var(--primary))';

  return (
    <motion.div
      variants={shouldReduceMotion ? undefined : cardVariants}
      whileHover={shouldReduceMotion ? undefined : "hover"}
      whileTap={shouldReduceMotion ? undefined : "tap"}
      className={cn("organic-hover", className)}
    >
      <Card className="gradient-border noise-overlay bg-card/80 backdrop-blur-sm border-white/10 h-full">
        <CardContent className="p-4 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">{title}</span>
            </div>
            
            {onAction && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="w-6 h-6"
                    data-testid={`stat-menu-${title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-popover/95 backdrop-blur-xl border-white/20">
                  <DropdownMenuItem onClick={() => onAction('view-details')}>
                    View details
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onAction('export')}>
                    Export data
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onAction('configure')}>
                    Configure alerts
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Value and Change */}
          <div className="space-y-2">
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold text-foreground tabular-nums">
                {value}
              </span>
              <Badge className={cn("text-xs border-0 flex items-center gap-1", getTrendColor(change.trend))}>
                {TrendIcon && <TrendIcon className="w-3 h-3" />}
                {change.value}
              </Badge>
            </div>
            
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>

          {/* Sparkline */}
          <div className="flex justify-end">
            <Sparkline 
              data={sparklineData} 
              width={80} 
              height={24}
              color={sparklineColor}
            />
          </div>

          {/* Last Updated */}
          <div className="text-xs text-muted-foreground text-right">
            Updated 2 min ago
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}