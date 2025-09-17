import { motion, useReducedMotion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, DollarSign, Calendar, Download } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area, Tooltip } from "recharts";

// TODO: remove mock data
const mockData = [
  { month: 'Jan', cost: 120, services: 8 },
  { month: 'Feb', cost: 135, services: 9 },
  { month: 'Mar', cost: 98, services: 7 },
  { month: 'Apr', cost: 156, services: 11 },
  { month: 'May', cost: 189, services: 12 },
  { month: 'Jun', cost: 167, services: 10 },
];

const serviceBreakdown = [
  { name: 'EC2', cost: 89.45, percentage: 53.6, color: 'hsl(var(--chart-1))' },
  { name: 'S3', cost: 23.12, percentage: 13.8, color: 'hsl(var(--chart-2))' },
  { name: 'RDS', cost: 34.67, percentage: 20.8, color: 'hsl(var(--chart-3))' },
  { name: 'Lambda', cost: 19.76, percentage: 11.8, color: 'hsl(var(--chart-4))' },
];

interface BillingChartProps {
  onDownloadReport: () => void;
  onViewDetails: () => void;
}

export default function BillingChart({ onDownloadReport, onViewDetails }: BillingChartProps) {
  const currentMonthCost = 167;
  const lastMonthCost = 189;
  const costChange = ((currentMonthCost - lastMonthCost) / lastMonthCost) * 100;
  const isDecreasing = costChange < 0;
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
      animate={shouldReduceMotion ? false : { opacity: 1, y: 0 }}
      transition={shouldReduceMotion ? undefined : { delay: 0.2 }}
    >
      <Card className="bg-card/80 backdrop-blur-sm border-white/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold text-foreground flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-primary" />
              Cost & Billing
            </CardTitle>
            <p className="text-sm text-muted-foreground">Your AWS spending overview</p>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onDownloadReport}
              className="bg-background/50 border-white/20 hover:bg-background/70"
              data-testid="button-download-report"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onViewDetails}
              className="bg-background/50 border-white/20 hover:bg-background/70"
              data-testid="button-view-details"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Details
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Cost Summary */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">This Month</p>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-foreground">${currentMonthCost}</span>
                <Badge 
                  className={`${isDecreasing ? 'bg-chart-2/20 text-chart-2' : 'bg-destructive/20 text-destructive'} border-0`}
                >
                  {isDecreasing ? <TrendingDown className="w-3 h-3 mr-1" /> : <TrendingUp className="w-3 h-3 mr-1" />}
                  {Math.abs(costChange).toFixed(1)}%
                </Badge>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Projected</p>
              <span className="text-2xl font-bold text-primary">${(currentMonthCost * 1.1).toFixed(0)}</span>
            </div>
          </div>

          {/* Cost Trend Chart */}
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockData}>
                <defs>
                  <linearGradient id="costGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--popover))',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    backdropFilter: 'blur(12px)'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="cost"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fill="url(#costGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Service Breakdown */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Service Breakdown</h4>
            <div className="space-y-2">
              {serviceBreakdown.map((service, index) => (
                <motion.div
                  key={service.name}
                  initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
                  animate={shouldReduceMotion ? false : { opacity: 1, x: 0 }}
                  transition={shouldReduceMotion ? undefined : { delay: 0.1 * index }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: service.color }}
                    />
                    <span className="text-sm text-foreground">{service.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">{service.percentage}%</span>
                    <span className="text-sm font-medium text-foreground">${service.cost}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}