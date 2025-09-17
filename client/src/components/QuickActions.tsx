import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Server, 
  Database, 
  HardDrive, 
  Zap, 
  FileText,
  Settings,
  Download,
  Upload
} from "lucide-react";
import { containerVariants, cardVariants } from "@/utils/motionVariants";

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  badge?: string;
  popular?: boolean;
}

interface QuickActionsProps {
  onAction: (actionId: string) => void;
}

// TODO: remove mock data
const quickActions: QuickAction[] = [
  {
    id: 'create-ec2',
    title: 'Launch EC2 Instance',
    description: 'Spin up a new virtual server',
    icon: Server,
    popular: true
  },
  {
    id: 'create-s3',
    title: 'Create S3 Bucket',
    description: 'Set up cloud storage',
    icon: HardDrive,
  },
  {
    id: 'create-rds',
    title: 'Launch Database',
    description: 'Deploy managed database',
    icon: Database,
    badge: 'New'
  },
  {
    id: 'create-lambda',
    title: 'Deploy Function',
    description: 'Serverless compute',
    icon: Zap,
  },
  {
    id: 'cost-report',
    title: 'Generate Cost Report',
    description: 'Analyze your spending',
    icon: FileText,
  },
  {
    id: 'bulk-upload',
    title: 'Bulk Upload',
    description: 'Upload multiple files',
    icon: Upload,
  },
];

export default function QuickActions({ onAction }: QuickActionsProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="gradient-border noise-overlay bg-card/80 backdrop-blur-sm border-white/10">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-foreground flex items-center">
            <Plus className="w-5 h-5 mr-2 text-primary" />
            Quick Actions
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Frequently used AWS operations
          </p>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={action.id}
                  variants={cardVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="organic-hover"
                >
                  <Button
                    variant="ghost"
                    className="w-full h-auto p-4 justify-start text-left bg-background/30 border border-white/10 hover:bg-background/50"
                    onClick={() => onAction(action.id)}
                    data-testid={`quick-action-${action.id}`}
                  >
                    <div className="flex items-start space-x-3 w-full">
                      <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-foreground">
                            {action.title}
                          </span>
                          <div className="flex space-x-1">
                            {action.popular && (
                              <Badge className="bg-chart-2/20 text-chart-2 border-0 text-xs">
                                Popular
                              </Badge>
                            )}
                            {action.badge && (
                              <Badge className="bg-primary/20 text-primary border-0 text-xs">
                                {action.badge}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </Button>
                </motion.div>
              );
            })}
          </div>
          
          {/* View All Actions */}
          <motion.div
            variants={cardVariants}
            className="mt-4 pt-4 border-t border-white/10"
          >
            <Button
              variant="outline"
              size="sm"
              className="w-full bg-background/50 border-white/20 hover:bg-background/70"
              onClick={() => onAction('view-all')}
              data-testid="view-all-actions"
            >
              <Settings className="w-4 h-4 mr-2" />
              Customize quick actions
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}