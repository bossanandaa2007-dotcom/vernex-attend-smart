import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  QrCode, 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle, 
  BarChart3,
  User,
  Mail,
  Phone,
  BookOpen
} from "lucide-react";
import { FRTModule } from "@/components/FRTModule";

interface StudentDashboardProps {
  activeView: string;
  email: string;
}

export function StudentDashboard({ activeView, email }: StudentDashboardProps) {
  const attendanceData = [
    { subject: "Computer Networks", present: 28, total: 32, percentage: 87.5 },
    { subject: "Database Systems", present: 24, total: 30, percentage: 80 },
    { subject: "Software Engineering", present: 22, total: 28, percentage: 78.6 },
    { subject: "Machine Learning", present: 26, total: 30, percentage: 86.7 },
  ];

  const recentAttendance = [
    { date: "2024-01-15", subject: "Computer Networks", status: "present", time: "09:00 AM" },
    { date: "2024-01-15", subject: "Database Systems", status: "present", time: "11:00 AM" },
    { date: "2024-01-14", subject: "Software Engineering", status: "absent", time: "02:00 PM" },
    { date: "2024-01-14", subject: "Machine Learning", status: "present", time: "04:00 PM" },
  ];

  if (activeView === "profile") {
    return (
      <div className="space-y-6 animate-fade-in">
        <h1 className="text-3xl font-bold">Profile</h1>
        
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              Personal Information
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
                <h3 className="text-2xl font-semibold">{email.split('@')[0]}</h3>
                <Badge className="bg-gradient-primary">Student</Badge>
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
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Program:</span>
                  <span>Computer Science Engineering</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-muted-foreground">Student ID:</span>
                  <span>CS2024001</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-muted-foreground">Year:</span>
                  <span>3rd Year</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-muted-foreground">Semester:</span>
                  <span>6th Semester</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (activeView === "attendance") {
    return (
      <div className="space-y-6 animate-fade-in">
        <h1 className="text-3xl font-bold">My Attendance</h1>
        
        <div className="grid gap-6">
          {attendanceData.map((subject) => (
            <Card key={subject.subject} className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{subject.subject}</h3>
                  <Badge variant={subject.percentage >= 85 ? "default" : subject.percentage >= 75 ? "secondary" : "destructive"}>
                    {subject.percentage.toFixed(1)}%
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{subject.present} of {subject.total} classes attended</span>
                    <span>{subject.total - subject.present} absent</span>
                  </div>
                  <Progress value={subject.percentage} className="h-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (activeView === "scan") {
    return (
      <div className="space-y-6 animate-fade-in">
        <h1 className="text-3xl font-bold">Scan QR Code</h1>
        
        <Card className="shadow-card">
          <CardContent className="p-8 text-center">
            <div className="max-w-md mx-auto space-y-6">
              <div className="w-32 h-32 mx-auto bg-gradient-primary rounded-full flex items-center justify-center">
                <QrCode className="w-16 h-16 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Ready to Scan</h3>
                <p className="text-muted-foreground">
                  Position the QR code within the frame to mark your attendance
                </p>
              </div>
              <Button className="bg-gradient-primary hover:opacity-90 transition-opacity">
                <QrCode className="mr-2 h-4 w-4" />
                Open Camera
              </Button>
            </div>
          </CardContent>
        </Card>
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
        <h1 className="text-3xl font-bold">Welcome back, {email.split('@')[0]}!</h1>
        <Badge className="bg-gradient-primary">Student Portal</Badge>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overall Attendance</p>
                <p className="text-2xl font-bold text-navy-500">83.2%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Classes Today</p>
                <p className="text-2xl font-bold text-navy-500">4</p>
              </div>
              <Calendar className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Present Streak</p>
                <p className="text-2xl font-bold text-navy-500">7 days</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Attendance */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="mr-2 h-5 w-5" />
            Recent Attendance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAttendance.map((record, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  {record.status === "present" ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                  <div>
                    <p className="font-medium">{record.subject}</p>
                    <p className="text-sm text-muted-foreground">{record.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={record.status === "present" ? "default" : "destructive"}>
                    {record.status}
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-1">{record.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}