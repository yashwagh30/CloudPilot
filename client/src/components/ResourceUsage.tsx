import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  Cpu, 
  HardDrive, 
  Wifi, 
  Zap,
  AlertTriangle,
  TrendingUp,
  RefreshCw
} from "lucide-react";
import { cn } from "@/lib/utils";

// TODO: remove mock data
const resourceMetrics = [
  {
    id: 'cpu',
    name: 'CPU Usage',
    value: 67,
    unit: '%',
    icon: Cpu,
    status: 'normal',
    trend: '+5.2%',
    description: 'Average across all instances'
  },
  {
    id: 'memory',
    name: 'Memory Usage',
    value: 82,
    unit: '%',
    icon: Activity,
    status: 'warning',
    trend: '+12.1%',
    description: '8.2 GB of 10 GB used'
  },
  {
    id: 'storage',
    name: 'Storage',
    value: 45,
    unit: '%',
    icon: HardDrive,
    status: 'normal',
    trend: '+2.8%',
    description: '450 GB of 1 TB used'
  },
  {
    id: 'network',
    name: 'Network I/O',
    value: 34,
    unit: 'Mbps',
    icon: Wifi,
    status: 'normal',
    trend: '-1.4%',
    description: 'Inbound/Outbound traffic'
  }
];

const alerts = [
  { id: 1, type: 'warning', message: 'Memory usage approaching limit on web-server-01', time: '2 min ago' },
  { id: 2, type: 'info', message: 'Auto-scaling triggered for production cluster', time: '15 min ago' },
  { id: 3, type: 'error', message: 'Database connection timeout in us-west-2', time: '1 hour ago' }
];

interface ResourceUsageProps {
  onRefresh: () => void;
  onViewAlert: (alertId: number) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'warning': return 'text-chart-3 bg-chart-3/20';
    case 'critical': return 'text-destructive bg-destructive/20';
    default: return 'text-chart-2 bg-chart-2/20';
  }
};

const getProgressColor = (value: number) => {
  if (value > 80) return 'bg-destructive';
  if (value > 60) return 'bg-chart-3';
  return 'bg-primary';
};

export default function ResourceUsage({ onRefresh, onViewAlert }: ResourceUsageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="space-y-6"
    >
      {/* Resource Metrics */}
      <Card className="bg-card/80 backdrop-blur-sm border-white/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold text-foreground flex items-center">
              <Activity className="w-5 h-5 mr-2 text-primary" />
              Resource Usage
            </CardTitle>
            <p className="text-sm text-muted-foreground">Real-time infrastructure metrics</p>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            className="bg-background/50 border-white/20 hover:bg-background/70"
            data-testid="button-refresh-metrics"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resourceMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={metric.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="p-4 rounded-lg bg-background/30 border border-white/10 hover-elevate"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Icon className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">{metric.name}</span>
                    </div>
                    <Badge className={cn("text-xs border-0", getStatusColor(metric.status))}>
                      {metric.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-foreground">
                        {metric.value}{metric.unit}
                      </span>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {metric.trend}
                      </div>
                    </div>
                    
                    <div className="w-full bg-background/50 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(metric.value, 100)}%` }}
                        transition={{ duration: 1.5, delay: 0.2 + (index * 0.1) }}
                        className={cn("h-full rounded-full", getProgressColor(metric.value))}
                      />
                    </div>
                    
                    <p className="text-xs text-muted-foreground">{metric.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Alerts & Notifications */}
      <Card className="bg-card/80 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-chart-3" />
            Recent Alerts
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center justify-between p-3 rounded-lg bg-background/30 border border-white/10 hover-elevate cursor-pointer"
                onClick={() => onViewAlert(alert.id)}
                data-testid={`alert-${alert.id}`}
              >
                <div className="flex items-center space-x-3">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    alert.type === 'error' ? 'bg-destructive' :
                    alert.type === 'warning' ? 'bg-chart-3' : 'bg-primary'
                  )} />
                  <div>
                    <p className="text-sm text-foreground">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                </div>
                
                <Badge 
                  className={cn(
                    "text-xs border-0",
                    alert.type === 'error' ? 'bg-destructive/20 text-destructive' :
                    alert.type === 'warning' ? 'bg-chart-3/20 text-chart-3' : 'bg-primary/20 text-primary'
                  )}
                >
                  {alert.type}
                </Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}