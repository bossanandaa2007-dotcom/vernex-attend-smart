import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  Building, 
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
  AlertTriangle
} from "lucide-react";
import { FRTModule } from "@/components/FRTModule";

interface HODDashboardProps {
  activeView: string;
  email: string;
}

export function HODDashboard({ activeView, email }: HODDashboardProps) {
  const departmentStats = {
    totalFaculty: 12,
    totalStudents: 340,
    totalClasses: 28,
    avgAttendance: 82.4,
    lowAttendanceClasses: 3
  };

  const facultyData = [
    { name: "Dr. Sarah Wilson", classes: 3, avgAttendance: 87.2, students: 95 },
    { name: "Dr. Michael Brown", classes: 2, avgAttendance: 84.1, students: 72 },
    { name: "Dr. Emily Chen", classes: 3, avgAttendance: 89.5, students: 88 },
    { name: "Dr. Robert Davis", classes: 2, avgAttendance: 76.8, students: 65 },
  ];

  const classPerformance = [
    { code: "CS301", name: "Computer Networks", faculty: "Dr. Wilson", attendance: 87.2, trend: "up" },
    { code: "CS302", name: "Operating Systems", faculty: "Dr. Brown", attendance: 84.1, trend: "up" },
    { code: "CS401", name: "Machine Learning", faculty: "Dr. Chen", attendance: 89.5, trend: "up" },
    { code: "CS402", name: "Software Engineering", faculty: "Dr. Davis", attendance: 76.8, trend: "down" },
    { code: "CS303", name: "Database Systems", faculty: "Dr. Johnson", attendance: 74.2, trend: "down" },
  ];

  if (activeView === "profile") {
    return (
      <div className="space-y-6 animate-fade-in">
        <h1 className="text-3xl font-bold">Profile</h1>
        
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              Head of Department Information
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
                <Badge className="bg-gradient-primary">Head of Department</Badge>
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
                  <span>+1 (555) 111-2222</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Department:</span>
                  <span>Computer Science & Engineering</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-muted-foreground">Employee ID:</span>
                  <span>HOD2018001</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-muted-foreground">Office:</span>
                  <span>Room 101, Admin Block</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-muted-foreground">Experience:</span>
                  <span>15 Years</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (activeView === "department") {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Department Overview</h1>
          <Button className="bg-gradient-primary hover:opacity-90">
            <Download className="mr-2 h-4 w-4" />
            Export Department Report
          </Button>
        </div>

        {/* Faculty Performance */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Faculty Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {facultyData.map((faculty, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarFallback>{faculty.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{faculty.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {faculty.classes} classes • {faculty.students} students
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={faculty.avgAttendance >= 85 ? "default" : faculty.avgAttendance >= 75 ? "secondary" : "destructive"}>
                      {faculty.avgAttendance}% avg
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Class Performance */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5" />
              Class Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {classPerformance.map((cls, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-4 h-4 rounded-full ${cls.attendance >= 85 ? 'bg-green-500' : cls.attendance >= 75 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                    <div>
                      <p className="font-medium">{cls.name}</p>
                      <p className="text-sm text-muted-foreground">{cls.code} • {cls.faculty}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {cls.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <Badge variant={cls.attendance >= 85 ? "default" : cls.attendance >= 75 ? "secondary" : "destructive"}>
                      {cls.attendance}%
                    </Badge>
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
        <h1 className="text-3xl font-bold">Department Analytics</h1>

        {/* Trend Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Trend</p>
                  <p className="text-2xl font-bold text-green-600">+2.3%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Best Performing</p>
                  <p className="text-lg font-bold text-navy-500">CS401</p>
                </div>
                <BarChart3 className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Needs Attention</p>
                  <p className="text-lg font-bold text-red-600">3 Classes</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Faculty Rating</p>
                  <p className="text-2xl font-bold text-navy-500">4.6/5</p>
                </div>
                <Users className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Attendance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>January 2024</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-muted rounded-full h-2">
                      <div className="bg-gradient-primary h-2 rounded-full" style={{width: '84%'}}></div>
                    </div>
                    <span className="text-sm">84%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>December 2023</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-muted rounded-full h-2">
                      <div className="bg-gradient-primary h-2 rounded-full" style={{width: '81%'}}></div>
                    </div>
                    <span className="text-sm">81%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>November 2023</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-muted rounded-full h-2">
                      <div className="bg-gradient-primary h-2 rounded-full" style={{width: '79%'}}></div>
                    </div>
                    <span className="text-sm">79%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Subject-wise Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {classPerformance.slice(0, 4).map((cls, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">{cls.name}</span>
                      <span className="text-sm font-medium">{cls.attendance}%</span>
                    </div>
                    <Progress value={cls.attendance} className="h-2" />
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
        <h1 className="text-3xl font-bold">Department Dashboard</h1>
        <Badge className="bg-gradient-primary">Computer Science & Engineering</Badge>
      </div>

      {/* Department Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Faculty</p>
                <p className="text-2xl font-bold text-navy-500">{departmentStats.totalFaculty}</p>
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
                <p className="text-2xl font-bold text-navy-500">{departmentStats.totalStudents}</p>
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
                <p className="text-2xl font-bold text-navy-500">{departmentStats.totalClasses}</p>
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
                <p className="text-2xl font-bold text-navy-500">{departmentStats.avgAttendance}%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Low Attendance</p>
                <p className="text-2xl font-bold text-red-600">{departmentStats.lowAttendanceClasses}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Download className="h-6 w-6" />
              <span>Generate Department Report</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Users className="h-6 w-6" />
              <span>Faculty Performance Review</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <BarChart3 className="h-6 w-6" />
              <span>View Detailed Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}