import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  QrCode, 
  BarChart3, 
  Calendar, 
  Users, 
  Building, 
  LogOut,
  Menu,
  X
} from "lucide-react";
import { StudentDashboard } from "./dashboards/StudentDashboard";
import { FacultyDashboard } from "./dashboards/FacultyDashboard";
import { HODDashboard } from "./dashboards/HODDashboard";
import { DeanDashboard } from "./dashboards/DeanDashboard";
import vernexLogo from "@/assets/vernex-logo.jpg";

interface DashboardProps {
  role: string;
  email: string;
  onLogout: () => void;
}

export function Dashboard({ role, email, onLogout }: DashboardProps) {
  const [activeView, setActiveView] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getRoleDisplay = (role: string) => {
    switch (role) {
      case "student": return "Student";
      case "faculty": return "Faculty";
      case "hod": return "Head of Department";
      case "dean": return "Dean";
      default: return role;
    }
  };

  const getNavItems = (role: string) => {
    const baseItems = [
      { id: "overview", label: "Overview", icon: BarChart3 },
      { id: "profile", label: "Profile", icon: User },
      { id: "frt", label: "FRT", icon: User },
    ];

    switch (role) {
      case "student":
        return [
          ...baseItems,
          { id: "attendance", label: "My Attendance", icon: Calendar },
          { id: "scan", label: "Scan QR", icon: QrCode },
        ];
      case "faculty":
        return [
          ...baseItems,
          { id: "classes", label: "My Classes", icon: Users },
          { id: "generate-qr", label: "Generate QR", icon: QrCode },
        ];
      case "hod":
        return [
          ...baseItems,
          { id: "department", label: "Department", icon: Building },
          { id: "analytics", label: "Analytics", icon: BarChart3 },
        ];
      case "dean":
        return [
          ...baseItems,
          { id: "institution", label: "Institution", icon: Building },
          { id: "analytics", label: "Global Analytics", icon: BarChart3 },
        ];
      default:
        return baseItems;
    }
  };

  const renderDashboard = () => {
    switch (role) {
      case "student":
        return <StudentDashboard activeView={activeView} email={email} />;
      case "faculty":
        return <FacultyDashboard activeView={activeView} email={email} />;
      case "hod":
        return <HODDashboard activeView={activeView} email={email} />;
      case "dean":
        return <DeanDashboard activeView={activeView} email={email} />;
      default:
        return <div>Invalid role</div>;
    }
  };

  const navItems = getNavItems(role);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-lg shadow-card p-1 flex items-center justify-center">
                  <img 
                    src={vernexLogo} 
                    alt="VERNEX Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <h1 className="text-xl font-bold text-foreground">
                  VERNEX
                </h1>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-4 flex items-center space-x-3">
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                  {email.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{email.split('@')[0]}</p>
                <Badge variant="secondary" className="text-xs">
                  {getRoleDisplay(role)}
                </Badge>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Button
                    variant={activeView === item.id ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      activeView === item.id 
                        ? "bg-gradient-primary text-primary-foreground" 
                        : ""
                    }`}
                    onClick={() => {
                      setActiveView(item.id);
                      setSidebarOpen(false);
                    }}
                  >
                    <item.icon className="mr-3 h-4 w-4" />
                    {item.label}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-border">
            <Button
              variant="ghost"
              className="w-full justify-start text-destructive hover:text-destructive"
              onClick={onLogout}
            >
              <LogOut className="mr-3 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <div className="lg:hidden bg-card border-b border-border p-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-4 w-4" />
          </Button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-lg shadow-card p-1 flex items-center justify-center">
              <img 
                src={vernexLogo} 
                alt="VERNEX Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-lg font-semibold text-foreground">
              VERNEX
            </h1>
          </div>
          <div></div>
        </div>

        {/* Dashboard content */}
        <main className="p-6">
          {renderDashboard()}
        </main>
      </div>
    </div>
  );
}