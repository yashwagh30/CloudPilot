import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Home, 
  Server, 
  Database, 
  DollarSign, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Cloud,
  BarChart3,
  Users,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: number;
  isActive?: boolean;
}

interface GlassSidebarProps {
  onItemSelect: (itemId: string) => void;
  activeItem?: string;
}

const sidebarItems: SidebarItem[] = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "resources", label: "Resources", icon: Server, badge: 12 },
  { id: "databases", label: "Databases", icon: Database, badge: 3 },
  { id: "costs", label: "Cost & Billing", icon: DollarSign },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "users", label: "IAM Users", icon: Users, badge: 8 },
  { id: "security", label: "Security", icon: Shield },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function GlassSidebar({ onItemSelect, activeItem = "dashboard" }: GlassSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "h-full bg-sidebar/80 backdrop-blur-xl border-r border-white/10 transition-all duration-300 relative",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
            <Cloud className="w-5 h-5 text-primary" />
          </div>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col"
            >
              <span className="font-semibold text-sidebar-foreground text-sm">AWS Manager</span>
              <span className="text-xs text-muted-foreground">Cloud Dashboard</span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="p-2 space-y-1">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          
          return (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start text-left h-10 hover-elevate",
                  isCollapsed ? "px-2" : "px-3",
                  isActive && "bg-sidebar-accent text-sidebar-accent-foreground"
                )}
                onClick={() => onItemSelect(item.id)}
                data-testid={`sidebar-${item.id}`}
              >
                <Icon className={cn("w-4 h-4 flex-shrink-0", isCollapsed ? "" : "mr-3")} />
                {!isCollapsed && (
                  <>
                    <span className="flex-1 text-sm">{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Button>
            </motion.div>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="absolute bottom-4 left-2 right-2">
        <Button
          variant="ghost"
          size="sm"
          className="w-full hover-elevate"
          onClick={() => setIsCollapsed(!isCollapsed)}
          data-testid="button-toggle-sidebar"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4 mr-2" />
              <span className="text-sm">Collapse</span>
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
}