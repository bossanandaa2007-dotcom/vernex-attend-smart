import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Gamepad2, 
  MessageSquare, 
  MessageCircle, 
  User, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getCurrentUser, clearCurrentUser, getUserDisplayName } from '@/lib/auth';
import vernexLogo from '@/assets/vernex-logo.jpg';

interface SidebarProps {
  onLogout: () => void;
}

export function Sidebar({ onLogout }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    clearCurrentUser();
    onLogout();
    navigate('/');
  };

  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/assignments', icon: BookOpen, label: 'Assignments' },
    { to: '/games', icon: Gamepad2, label: 'Games' },
    { to: '/feedback', icon: MessageSquare, label: 'Feedback' },
    { to: '/chat', icon: MessageCircle, label: 'Chat Assistant' },
    { to: '/profile', icon: User, label: 'Profile' }
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <aside className={`
        fixed md:static top-0 left-0 h-full z-40
        ${isCollapsed ? '-translate-x-full md:w-16' : 'translate-x-0 w-64'}
        transition-all duration-300 ease-in-out
        bg-card border-r border-border shadow-card
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg shadow-elegant p-1 flex items-center justify-center flex-shrink-0">
                <img 
                  src={vernexLogo} 
                  alt="VERNEX Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              {!isCollapsed && (
                <div>
                  <h2 className="font-bold text-lg text-foreground">VERNEX</h2>
                  <p className="text-xs text-muted-foreground">Smart Learning</p>
                </div>
              )}
            </div>
          </div>

          {/* User Info */}
          {!isCollapsed && user && (
            <div className="p-4">
              <Card className="p-3 bg-gradient-card">
                <div className="text-sm">
                  <p className="font-medium text-foreground truncate">{user.email}</p>
                  <p className="text-xs text-muted-foreground">{getUserDisplayName(user.role)}</p>
                </div>
              </Card>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 p-2">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) => `
                      flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                      ${isActive 
                        ? 'bg-primary text-primary-foreground shadow-elegant' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                      }
                      ${isCollapsed ? 'justify-center' : ''}
                    `}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-2 border-t border-border">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className={`w-full text-muted-foreground hover:text-foreground hover:bg-destructive/10 ${
                isCollapsed ? 'justify-center px-2' : 'justify-start'
              }`}
            >
              <LogOut className="w-4 h-4 flex-shrink-0" />
              {!isCollapsed && <span className="ml-2">Sign Out</span>}
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}
    </>
  );
}