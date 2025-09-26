import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  Building2, 
  Users, 
  BookOpen, 
  TrendingUp,
  TrendingDown,
  Download,
  User,
  Mail,
  Phone,
  Calendar,
  BarChart3,
  Globe,
  Award,
  AlertTriangle
} from "lucide-react";
import { FRTModule } from "@/components/FRTModule";

interface DeanDashboardProps {
  activeView: string;
  email: string;
}

export function DeanDashboard({ activeView, email }: DeanDashboardProps) {
  const institutionStats = {
    totalDepartments: 8,
    totalFaculty: 156,
    totalStudents: 2840,
    totalClasses: 487,
    avgAttendance: 81.2,
    topPerformingDept: "Computer Science"
  };

  const departmentData = [
    { name: "Computer Science", hod: "Dr. Johnson", students: 340, avgAttendance: 82.4, trend: "up" },
    { name: "Electronics", hod: "Dr. Smith", students: 285, avgAttendance: 79.8, trend: "down" },
    { name: "Mechanical", hod: "Dr. Brown", students: 410, avgAttendance: 85.1, trend: "up" },
    { name: "Civil", hod: "Dr. Wilson", students: 375, avgAttendance: 78.9, trend: "down" },
    { name: "Chemical", hod: "Dr. Davis", students: 220, avgAttendance: 83.7, trend: "up" },
    { name: "Biotech", hod: "Dr. Garcia", students: 180, avgAttendance: 81.3, trend: "up" },
  ];

  const monthlyTrends = [
    { month: "Jan 2024", attendance: 81.2, students: 2840, classes: 487 },
    { month: "Dec 2023", attendance: 79.8, students: 2795, classes: 481 },
    { month: "Nov 2023", attendance: 78.4, students: 2751, classes: 475 },
    { month: "Oct 2023", attendance: 80.1, students: 2720, classes: 468 },
  ];

  if (activeView === "profile") {
    return (
      <div className="space-y-6 animate-fade-in">
        <h1 className="text-3xl font-bold">Profile</h1>
        
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              Dean Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src="" />
                <AvatarFallback className="bg-gradient-primary text-primary-foreground text-2xl">
                  {email.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold">Dr. {email.split('@')[0]}</h3>
                <Badge className="bg-gradient-primary">Dean</Badge>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Email:</span>
                  <span>{email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Phone:</span>
                  <span>+1 (555) 000-1111</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Institution:</span>
                  <span>Engineering College</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-muted-foreground">Employee ID:</span>
                  <span>DEAN2015001</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-muted-foreground">Office:</span>
                  <span>Dean's Office, Main Block</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-muted-foreground">Experience:</span>
                  <span>20+ Years</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (activeView === "institution") {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Institution Overview</h1>
          <Button className="bg-gradient-primary hover:opacity-90">
            <Download className="mr-2 h-4 w-4" />
            Export Global Report
          </Button>
        </div>

        {/* Department Performance */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building2 className="mr-2 h-5 w-5" />
              Department Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departmentData.map((dept, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-4 h-4 rounded-full ${dept.avgAttendance >= 85 ? 'bg-green-500' : dept.avgAttendance >= 80 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                    <div>
                      <p className="font-medium">{dept.name}</p>
                      <p className="text-sm text-muted-foreground">
                        HOD: {dept.hod} • {dept.students} students
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {dept.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <Badge variant={dept.avgAttendance >= 85 ? "default" : dept.avgAttendance >= 80 ? "secondary" : "destructive"}>
                      {dept.avgAttendance}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Trends */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Institution Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyTrends.map((trend, index) => (
                <div key={index} className="grid md:grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Month</p>
                    <p className="font-medium">{trend.month}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Attendance</p>
                    <p className="font-medium">{trend.attendance}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Students</p>
                    <p className="font-medium">{trend.students.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Active Classes</p>
                    <p className="font-medium">{trend.classes}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (activeView === "analytics") {
    return (
      <div className="space-y-6 animate-fade-in">
        <h1 className="text-3xl font-bold">Global Analytics</h1>

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Overall Growth</p>
                  <p className="text-2xl font-bold text-green-600">+5.2%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Top Department</p>
                  <p className="text-lg font-bold text-navy-500">Mechanical</p>
                </div>
                <Award className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Faculty Efficiency</p>
                  <p className="text-2xl font-bold text-navy-500">87.3%</p>
                </div>
                <Users className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Risk Departments</p>
                  <p className="text-2xl font-bold text-red-600">2</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Department Rankings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departmentData
                  .sort((a, b) => b.avgAttendance - a.avgAttendance)
                  .map((dept, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        index === 0 ? 'bg-gold-500 text-white' : 
                        index === 1 ? 'bg-gray-400 text-white' : 
                        index === 2 ? 'bg-amber-600 text-white' : 
                        'bg-muted text-muted-foreground'
                      }`}>
                        {index + 1}
                      </div>
                      <span className="font-medium">{dept.name}</span>
                    </div>
                    <Badge variant={dept.avgAttendance >= 85 ? "default" : dept.avgAttendance >= 80 ? "secondary" : "destructive"}>
                      {dept.avgAttendance}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Student Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departmentData.map((dept, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">{dept.name}</span>
                      <span className="text-sm font-medium">{dept.students} students</span>
                    </div>
                    <Progress value={(dept.students / institutionStats.totalStudents) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (activeView === "frt") {
    return <FRTModule />;
  }

  // Overview (default)
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Institution Dashboard</h1>
        <Badge className="bg-gradient-primary">Dean Portal</Badge>
      </div>

      {/* Institution Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Departments</p>
                <p className="text-2xl font-bold text-navy-500">{institutionStats.totalDepartments}</p>
              </div>
              <Building2 className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Faculty</p>
                <p className="text-2xl font-bold text-navy-500">{institutionStats.totalFaculty}</p>
              </div>
              <Users className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Students</p>
                <p className="text-2xl font-bold text-navy-500">{institutionStats.totalStudents.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Classes</p>
                <p className="text-2xl font-bold text-navy-500">{institutionStats.totalClasses}</p>
              </div>
              <BookOpen className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Attendance</p>
                <p className="text-2xl font-bold text-navy-500">{institutionStats.avgAttendance}%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Top Dept</p>
                <p className="text-lg font-bold text-navy-500">Mech</p>
              </div>
              <Award className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Strategic Overview */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="mr-2 h-5 w-5" />
            Strategic Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-lg">
              <TrendingUp className="h-12 w-12 mx-auto text-green-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Improving Departments</h3>
              <p className="text-3xl font-bold text-green-600">4</p>
              <p className="text-sm text-muted-foreground">Showing positive trends</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900 rounded-lg">
              <BarChart3 className="h-12 w-12 mx-auto text-yellow-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Stable Departments</h3>
              <p className="text-3xl font-bold text-yellow-600">2</p>
              <p className="text-sm text-muted-foreground">Maintaining standards</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 rounded-lg">
              <AlertTriangle className="h-12 w-12 mx-auto text-red-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Needs Attention</h3>
              <p className="text-3xl font-bold text-red-600">2</p>
              <p className="text-sm text-muted-foreground">Require intervention</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}