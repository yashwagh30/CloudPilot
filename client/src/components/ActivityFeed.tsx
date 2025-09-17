import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Activity, 
  Server, 
  Database, 
  DollarSign, 
  Users, 
  Shield,
  CheckCircle,
  AlertTriangle,
  Info,
  Clock
} from "lucide-react";
import { containerVariants, cardVariants } from "@/utils/motionVariants";
import { cn } from "@/lib/utils";

interface ActivityItem {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  description: string;
  timestamp: string;
  user?: string;
  service?: string;
  icon: React.ElementType;
}

interface ActivityFeedProps {
  onViewAll: () => void;
  onItemClick: (id: string) => void;
}

// TODO: remove mock data  
const activities: ActivityItem[] = [
  {
    id: '1',
    type: 'success',
    title: 'EC2 instance launched successfully',
    description: 'web-server-03 is now running in us-east-1',
    timestamp: '2 minutes ago',
    user: 'Sarah Chen',
    service: 'EC2',
    icon: Server
  },
  {
    id: '2', 
    type: 'info',
    title: 'Auto-scaling group updated',
    description: 'Minimum instances increased from 2 to 3',
    timestamp: '15 minutes ago',
    user: 'System',
    service: 'Auto Scaling',
    icon: Activity
  },
  {
    id: '3',
    type: 'warning',
    title: 'High memory usage detected',
    description: 'Database server using 85% memory',
    timestamp: '1 hour ago',
    service: 'CloudWatch',
    icon: AlertTriangle
  },
  {
    id: '4',
    type: 'success',
    title: 'Backup completed',
    description: 'prod-database backup finished successfully',
    timestamp: '2 hours ago',
    user: 'Automated',
    service: 'RDS',
    icon: Database
  },
  {
    id: '5',
    type: 'info',
    title: 'New IAM user created',
    description: 'developer-access role assigned to john.doe',
    timestamp: '3 hours ago',
    user: 'Sarah Chen',
    service: 'IAM',
    icon: Users
  },
  {
    id: '6',
    type: 'success',
    title: 'Cost optimization applied',
    description: 'Saved $234 by right-sizing instances',
    timestamp: '4 hours ago',
    user: 'Cost Optimizer',
    service: 'Cost Explorer',
    icon: DollarSign
  }
];

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'success': return CheckCircle;
    case 'warning': return AlertTriangle;
    case 'error': return AlertTriangle;
    default: return Info;
  }
};

const getActivityColor = (type: string) => {
  switch (type) {
    case 'success': return 'text-chart-2 bg-chart-2/10';
    case 'warning': return 'text-chart-3 bg-chart-3/10';
    case 'error': return 'text-destructive bg-destructive/10';
    default: return 'text-primary bg-primary/10';
  }
};

export default function ActivityFeed({ onViewAll, onItemClick }: ActivityFeedProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="gradient-border noise-overlay bg-card/80 backdrop-blur-sm border-white/10">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg font-semibold text-foreground flex items-center">
            <Activity className="w-5 h-5 mr-2 text-primary" />
            Recent Activity
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={onViewAll}
            className="bg-background/50 border-white/20 hover:bg-background/70"
            data-testid="view-all-activity"
          >
            View all
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-3">
          {activities.map((activity, index) => {
            const ActivityIcon = getActivityIcon(activity.type);
            const ServiceIcon = activity.icon;
            
            return (
              <motion.div
                key={activity.id}
                variants={cardVariants}
                whileHover="hover"
                className="organic-hover cursor-pointer"
                onClick={() => onItemClick(activity.id)}
                data-testid={`activity-${activity.id}`}
              >
                <div className="flex items-start space-x-3 p-3 rounded-lg bg-background/30 border border-white/10 hover:bg-background/50 transition-colors">
                  {/* Status Icon */}
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                    getActivityColor(activity.type)
                  )}>
                    <ActivityIcon className="w-4 h-4" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-foreground">
                          {activity.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {activity.description}
                        </p>
                        
                        {/* Meta Info */}
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>{activity.timestamp}</span>
                          {activity.service && (
                            <>
                              <span>•</span>
                              <span>{activity.service}</span>
                            </>
                          )}
                        </div>
                      </div>
                      
                      {/* Service Icon */}
                      <div className="w-6 h-6 bg-primary/20 rounded flex items-center justify-center flex-shrink-0">
                        <ServiceIcon className="w-3 h-3 text-primary" />
                      </div>
                    </div>
                    
                    {/* User Info */}
                    {activity.user && (
                      <div className="flex items-center space-x-2 mt-2">
                        <Avatar className="w-5 h-5">
                          <AvatarFallback className="bg-primary/20 text-primary text-xs">
                            {activity.user.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">
                          by {activity.user}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
          
          {/* Empty state would go here for when there are no activities */}
          {activities.length === 0 && (
            <div className="text-center py-8">
              <Activity className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
              <p className="text-sm text-muted-foreground">No recent activity</p>
              <p className="text-xs text-muted-foreground mt-1">
                Activity will appear here as you use AWS services
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}