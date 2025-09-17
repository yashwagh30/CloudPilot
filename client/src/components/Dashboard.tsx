import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import GlassSidebar from "./GlassSidebar";
import GlassNavbar from "./GlassNavbar";
import AWSServiceCard from "./AWSServiceCard";
import GreetingBanner from "./GreetingBanner";
import StatCard from "./StatCard";
import QuickActions from "./QuickActions";
import ActivityFeed from "./ActivityFeed";
import BillingChart from "./BillingChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Zap,
  DollarSign
} from "lucide-react";
import { containerVariants, cardVariants } from "@/utils/motionVariants";

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

// TODO: remove mock data
const kpiData = [
  {
    title: "Active Services",
    value: "12",
    change: { value: "+2", trend: "up" as const },
    icon: Cloud,
    sparklineData: [8, 9, 11, 10, 12, 11, 12],
    description: "Running instances and services"
  },
  {
    title: "Monthly Cost",
    value: "$167",
    change: { value: "-11%", trend: "down" as const },
    icon: DollarSign,
    sparklineData: [189, 178, 165, 156, 167, 162, 167],
    description: "Current month spending"
  },
  {
    title: "IAM Users",
    value: "8",
    change: { value: "+1", trend: "up" as const },
    icon: Users,
    sparklineData: [6, 7, 7, 8, 8, 7, 8],
    description: "Active user accounts"
  },
  {
    title: "Security Score",
    value: "94%",
    change: { value: "+2%", trend: "up" as const },
    icon: Shield,
    sparklineData: [89, 91, 92, 94, 93, 95, 94],
    description: "Overall security posture"
  }
];

export default function Dashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [user] = useState({
    name: "Sarah Chen",
    email: "sarah.chen@company.com",
    avatar: undefined
  });
  const shouldReduceMotion = useReducedMotion() ?? false;

  const handleServiceAction = (serviceId: string, action: string) => {
    console.log(`Service ${serviceId} - Action: ${action}`);
    // TODO: Implement real service actions
  };

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    // TODO: Implement search functionality
  };

  const handleQuickAction = (action: string) => {
    console.log('Quick action:', action);
    // TODO: Implement quick actions
  };

  const handleStatAction = (stat: string, action: string) => {
    console.log(`Stat ${stat} - Action: ${action}`);
    // TODO: Implement stat actions
  };

  const handleActivityClick = (activityId: string) => {
    console.log('Activity clicked:', activityId);
    // TODO: Implement activity details
  };

  return (
    <div className="h-screen grain-bg flex overflow-hidden">
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
          <AnimatePresence mode="wait">
            <motion.div
              variants={shouldReduceMotion ? undefined : containerVariants}
              initial={shouldReduceMotion ? false : "hidden"}
              animate={shouldReduceMotion ? false : "visible"}
              className="space-y-6"
            >
              {/* Greeting Banner */}
              <GreetingBanner 
                userName={user.name}
                onQuickAction={handleQuickAction}
              />

              {/* KPI Strip */}
              <motion.div
                variants={shouldReduceMotion ? undefined : containerVariants}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4"
              >
                {kpiData.map((kpi, index) => (
                  <StatCard
                    key={kpi.title}
                    title={kpi.title}
                    value={kpi.value}
                    change={kpi.change}
                    icon={kpi.icon}
                    sparklineData={kpi.sparklineData}
                    description={kpi.description}
                    onAction={(action) => handleStatAction(kpi.title, action)}
                    shouldReduceMotion={shouldReduceMotion}
                  />
                ))}
              </motion.div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                {/* Left Column - Services */}
                <div className="xl:col-span-2 space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-foreground tracking-tight flex items-center">
                      <Activity className="w-5 h-5 mr-2 text-primary" />
                      Your AWS Resources
                    </h2>
                    <Button 
                      size="sm" 
                      className="bg-primary hover:bg-primary/90"
                      onClick={() => handleQuickAction('create-resource')}
                      data-testid="button-add-service"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create resource
                    </Button>
                  </div>
                  
                  {/* Services Masonry Layout */}
                  <motion.div
                    variants={shouldReduceMotion ? undefined : containerVariants}
                    className="columns-1 md:columns-2 xl:columns-3 gap-4"
                  >
                    {mockServices.map((service, index) => (
                      <motion.div
                        key={service.id}
                        variants={shouldReduceMotion ? undefined : cardVariants}
                        initial={shouldReduceMotion ? false : "hidden"}
                        animate={shouldReduceMotion ? false : "visible"}
                        whileHover={shouldReduceMotion ? undefined : "hover"}
                        whileTap={shouldReduceMotion ? undefined : "tap"}
                        className="break-inside-avoid mb-4 inline-block w-full"
                      >
                        <AWSServiceCard
                          service={service}
                          onAction={handleServiceAction}
                          shouldReduceMotion={shouldReduceMotion}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                  
                  {/* Empty state */}
                  {mockServices.length === 0 && (
                    <Card className="gradient-border noise-overlay bg-card/80 backdrop-blur-sm border-white/10">
                      <CardContent className="p-8 text-center">
                        <Activity className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
                        <h3 className="text-lg font-medium text-foreground mb-2">No resources yet</h3>
                        <p className="text-muted-foreground mb-4">
                          Get started by creating your first AWS resource
                        </p>
                        <Button onClick={() => handleQuickAction('create-resource')}>
                          Create your first resource
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Right Column - Quick Actions & Activity */}
                <div className="xl:col-span-1 space-y-6">
                  <QuickActions onAction={handleQuickAction} />
                  <ActivityFeed 
                    onViewAll={() => console.log('Viewing all activity')}
                    onItemClick={handleActivityClick}
                  />
                </div>
                
                {/* Far Right - Billing */}
                <div className="xl:col-span-1 space-y-6">
                  <BillingChart
                    onDownloadReport={() => console.log('Downloading report')}
                    onViewDetails={() => console.log('Viewing billing details')}
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}