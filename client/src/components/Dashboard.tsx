import { useState } from "react";
import { motion } from "framer-motion";
import GlassSidebar from "./GlassSidebar";
import GlassNavbar from "./GlassNavbar";
import AWSServiceCard from "./AWSServiceCard";
import BillingChart from "./BillingChart";
import ResourceUsage from "./ResourceUsage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Cloud, 
  TrendingUp, 
  Users, 
  Shield,
  Plus,
  Activity,
  Server,
  HardDrive,
  Database,
  Zap
} from "lucide-react";

// TODO: remove mock data
const mockServices = [
  {
    id: "i-1234567890",
    name: "Web Server",
    type: "EC2" as const,
    status: "running" as const,
    region: "us-east-1",
    cost: 45.67,
    usage: 67,
    icon: Server
  },
  {
    id: "s3-bucket-1",
    name: "Static Assets",
    type: "S3" as const,
    status: "running" as const,
    region: "us-west-2",
    cost: 12.34,
    usage: 34,
    icon: HardDrive
  },
  {
    id: "rds-prod-db",
    name: "Production DB",
    type: "RDS" as const,
    status: "running" as const,
    region: "us-east-1",
    cost: 89.12,
    usage: 78,
    icon: Database
  },
  {
    id: "lambda-api",
    name: "API Functions",
    type: "Lambda" as const,
    status: "running" as const,
    region: "us-east-1",
    cost: 23.45,
    usage: 45,
    icon: Zap
  },
  {
    id: "i-0987654321",
    name: "Database Server",
    type: "EC2" as const,
    status: "stopped" as const,
    region: "eu-west-1",
    cost: 0.00,
    usage: 0,
    icon: Server
  },
  {
    id: "lambda-worker",
    name: "Background Jobs",
    type: "Lambda" as const,
    status: "pending" as const,
    region: "us-west-2",
    cost: 8.90,
    usage: 12,
    icon: Zap
  }
];

const quickStats = [
  { label: "Active Services", value: "12", change: "+2", icon: Cloud },
  { label: "Monthly Cost", value: "$167", change: "-11%", icon: TrendingUp },
  { label: "IAM Users", value: "8", change: "+1", icon: Users },
  { label: "Security Alerts", value: "3", change: "-2", icon: Shield }
];

export default function Dashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [user] = useState({
    name: "Sarah Chen",
    email: "sarah.chen@company.com",
    avatar: undefined
  });

  const handleServiceAction = (serviceId: string, action: string) => {
    console.log(`Service ${serviceId} - Action: ${action}`);
    // TODO: Implement real service actions
  };

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    // TODO: Implement search functionality
  };

  return (
    <div className="h-screen bg-background flex overflow-hidden">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 flex-shrink-0`}>
        <GlassSidebar
          onItemSelect={setActiveSection}
          activeItem={activeSection}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <GlassNavbar
          onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          onSearch={handleSearch}
          user={user}
        />

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto p-6 space-y-6">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back, {user.name.split(' ')[0]} 👋
            </h1>
            <p className="text-muted-foreground">
              Here's what's happening with your AWS infrastructure today.
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {quickStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="bg-card/80 backdrop-blur-sm border-white/20 hover-elevate">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">{stat.label}</p>
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                            <Badge className="bg-chart-2/20 text-chart-2 border-0 text-xs">
                              {stat.change}
                            </Badge>
                          </div>
                        </div>
                        <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* AWS Services */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-primary" />
                  AWS Services
                </h2>
                <Button 
                  size="sm" 
                  className="bg-primary hover:bg-primary/90"
                  data-testid="button-add-service"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Service
                </Button>
              </div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {mockServices.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <AWSServiceCard
                      service={service}
                      onAction={handleServiceAction}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Sidebar Content */}
            <div className="space-y-6">
              <BillingChart
                onDownloadReport={() => console.log('Downloading report')}
                onViewDetails={() => console.log('Viewing billing details')}
              />
              
              <ResourceUsage
                onRefresh={() => console.log('Refreshing metrics')}
                onViewAlert={(alertId) => console.log('Viewing alert:', alertId)}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}