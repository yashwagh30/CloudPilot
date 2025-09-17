import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Square, 
  BarChart3, 
  MoreVertical,
  Server,
  Database,
  Zap,
  HardDrive
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AWSService {
  id: string;
  name: string;
  type: 'EC2' | 'S3' | 'RDS' | 'Lambda';
  status: 'running' | 'stopped' | 'pending';
  region: string;
  cost: number;
  usage: number;
  icon: React.ElementType;
}

interface AWSServiceCardProps {
  service: AWSService;
  onAction: (serviceId: string, action: string) => void;
}

const statusColors = {
  running: "bg-chart-2/20 text-chart-2 border-chart-2/30",
  stopped: "bg-destructive/20 text-destructive border-destructive/30", 
  pending: "bg-chart-3/20 text-chart-3 border-chart-3/30"
};

const serviceTypeIcons = {
  EC2: Server,
  S3: HardDrive,
  RDS: Database,
  Lambda: Zap
};

export default function AWSServiceCard({ service, onAction }: AWSServiceCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const StatusIcon = service.status === 'running' ? Square : Play;
  const ServiceIcon = serviceTypeIcons[service.type];

  const handleAction = async (action: string) => {
    setIsLoading(true);
    console.log(`${action} action on ${service.name}`);
    
    // Simulate API call
    setTimeout(() => {
      onAction(service.id, action);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="bg-card/80 backdrop-blur-sm border-white/20 hover-elevate group">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
              <ServiceIcon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-sm font-semibold text-foreground">{service.name}</CardTitle>
              <p className="text-xs text-muted-foreground">{service.type} • {service.region}</p>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="w-8 h-8 hover-elevate"
                data-testid={`menu-${service.id}`}
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-popover/95 backdrop-blur-xl border-white/20">
              <DropdownMenuItem onClick={() => handleAction('monitor')}>
                <BarChart3 className="mr-2 w-4 h-4" />
                Monitor
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction('configure')}>
                Configure
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction('terminate')} className="text-destructive">
                Terminate
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge className={cn("text-xs border", statusColors[service.status])}>
              {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
            </Badge>
            <span className="text-sm font-medium text-foreground">
              ${service.cost.toFixed(2)}/month
            </span>
          </div>

          {/* Usage Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Usage</span>
              <span className="text-foreground">{service.usage}%</span>
            </div>
            <div className="w-full bg-background/50 rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${service.usage}%` }}
                transition={{ duration: 1, delay: 0.2 }}
                className={cn(
                  "h-full rounded-full",
                  service.usage > 80 ? "bg-destructive" :
                  service.usage > 60 ? "bg-chart-3" : "bg-primary"
                )}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant={service.status === 'running' ? 'destructive' : 'default'}
              className="flex-1"
              onClick={() => handleAction(service.status === 'running' ? 'stop' : 'start')}
              disabled={isLoading || service.status === 'pending'}
              data-testid={`button-toggle-${service.id}`}
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                />
              ) : (
                <>
                  <StatusIcon className="w-4 h-4 mr-2" />
                  {service.status === 'running' ? 'Stop' : 'Start'}
                </>
              )}
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleAction('monitor')}
              className="bg-background/50 border-white/20 hover:bg-background/70"
              data-testid={`button-monitor-${service.id}`}
            >
              <BarChart3 className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}