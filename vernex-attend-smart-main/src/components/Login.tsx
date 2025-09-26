import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff } from "lucide-react";
import vernexLogo from "@/assets/vernex-logo.jpg";

interface LoginProps {
  onLogin: (role: string, email: string) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password && role) {
      onLogin(role, email);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        <Card className="shadow-elegant border-0 bg-card/95 backdrop-blur-md">
          <CardHeader className="text-center space-y-6 pb-8">
            <div className="flex justify-center">
              <div className="w-24 h-24 bg-white rounded-2xl shadow-elegant p-2 flex items-center justify-center">
                <img 
                  src={vernexLogo} 
                  alt="VERNEX Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold text-foreground">
                Welcome to VERNEX
              </CardTitle>
              <p className="text-muted-foreground text-sm">
                Advanced Attendance Management System
              </p>
            </div>
          </CardHeader>
          
          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@domain.com"
                  className="h-12 bg-background/50 border-border/50 focus:border-primary transition-colors"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="h-12 bg-background/50 border-border/50 focus:border-primary transition-colors pr-12"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-sm font-medium text-foreground">
                  Select Role
                </Label>
                <Select value={role} onValueChange={setRole} required>
                  <SelectTrigger className="h-12 bg-background/50 border-border/50 focus:border-primary">
                    <SelectValue placeholder="Choose your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="faculty">Faculty</SelectItem>
                    <SelectItem value="hod">Head of Department</SelectItem>
                    <SelectItem value="dean">Dean</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-primary hover:opacity-90 transition-all duration-200 font-medium text-base shadow-elegant"
                disabled={!email || !password || !role}
              >
                Sign In to VERNEX
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}