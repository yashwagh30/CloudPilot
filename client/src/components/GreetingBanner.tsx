import { motion, useReducedMotion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkline } from "./Sparkline";
import { Cloud, TrendingUp, AlertCircle, Activity } from "lucide-react";
import { fadeInUp } from "@/utils/motionVariants";

interface GreetingBannerProps {
  userName: string;
  onQuickAction: (action: string) => void;
}

// TODO: remove mock data
const recentActivity = [
  "2 new EC2 instances launched",
  "Cost decreased by 12% this month", 
  "Database backup completed"
];

const quickMetrics = [67, 72, 68, 75, 71, 78, 82];

function getTimeBasedGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return { text: "Good morning", gradient: "from-amber-400/20 to-orange-500/20" };
  if (hour < 17) return { text: "Good afternoon", gradient: "from-blue-400/20 to-cyan-500/20" };
  return { text: "Good evening", gradient: "from-purple-400/20 to-pink-500/20" };
}

export default function GreetingBanner({ userName, onQuickAction }: GreetingBannerProps) {
  const { text: greeting, gradient } = getTimeBasedGreeting();
  const firstName = userName.split(' ')[0];
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={shouldReduceMotion ? undefined : fadeInUp}
      initial={shouldReduceMotion ? false : "hidden"}
      animate={shouldReduceMotion ? false : "visible"}
      className="relative overflow-hidden"
    >
      <Card className={`gradient-border noise-overlay bg-gradient-to-r ${gradient} border-white/10`}>
        <div className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Greeting Section */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                  <Cloud className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-foreground tracking-tight">
                    {greeting}, {firstName}
                  </h1>
                  <p className="text-muted-foreground">
                    Welcome back to your AWS console
                  </p>
                </div>
              </div>
              
              {/* Recent Activity */}
              <div className="flex flex-wrap items-center gap-2">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }}
                    animate={shouldReduceMotion ? false : { opacity: 1, scale: 1 }}
                    transition={shouldReduceMotion ? undefined : { delay: 0.2 + index * 0.1 }}
                  >
                    <Badge 
                      variant="secondary" 
                      className="bg-background/50 text-foreground border-white/20 text-xs"
                    >
                      <Activity className="w-3 h-3 mr-1" />
                      {activity}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Stats & Actions */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
              {/* Mini Trend */}
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Resource usage</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-semibold text-foreground">
                      {quickMetrics[quickMetrics.length - 1]}%
                    </span>
                    <TrendingUp className="w-4 h-4 text-chart-2" />
                  </div>
                </div>
                <Sparkline 
                  data={quickMetrics} 
                  width={60} 
                  height={20}
                  color="hsl(var(--chart-2))"
                />
              </div>

              {/* Quick Actions */}
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  className="bg-background/50 border-white/20 hover:bg-background/70"
                  onClick={() => onQuickAction('create-resource')}
                  data-testid="button-quick-create"
                >
                  Create resource
                </Button>
                <Button 
                  size="sm"
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => onQuickAction('view-costs')}
                  data-testid="button-quick-costs"
                >
                  View spending
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}