import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  QrCode, 
  Calendar, 
  Users, 
  BookOpen, 
  Download,
  User,
  Mail,
  Phone,
  Building,
  Clock,
  BarChart3
} from "lucide-react";
import { FRTModule } from "@/components/FRTModule";

interface FacultyDashboardProps {
  activeView: string;
  email: string;
}

export function FacultyDashboard({ activeView, email }: FacultyDashboardProps) {
  const [selectedClass, setSelectedClass] = useState("CS301");

  const classes = [
    { 
      code: "CS301", 
      name: "Computer Networks", 
      students: 45, 
      avgAttendance: 87.2,
      schedule: "Mon, Wed, Fri - 9:00 AM"
    },
    { 
      code: "CS405", 
      name: "Database Systems", 
      students: 38, 
      avgAttendance: 82.1,
      schedule: "Tue, Thu - 11:00 AM"
    },
  ];

  const studentsData = [
    { id: "CS2024001", name: "John Smith", attendance: 92.5, present: 37, total: 40 },
    { id: "CS2024002", name: "Sarah Johnson", attendance: 87.5, present: 35, total: 40 },
    { id: "CS2024003", name: "Mike Chen", attendance: 80.0, present: 32, total: 40 },
    { id: "CS2024004", name: "Emily Davis", attendance: 95.0, present: 38, total: 40 },
  ];

  if (activeView === "profile") {
    return (
      <div className="space-y-6 animate-fade-in">
        <h1 className="text-3xl font-bold">Profile</h1>
        
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              Faculty Information
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
                <Badge className="bg-gradient-primary">Faculty</Badge>
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
                  <span>+1 (555) 987-6543</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Department:</span>
                  <span>Computer Science</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-muted-foreground">Employee ID:</span>
                  <span>FAC2019042</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-muted-foreground">Office:</span>
                  <span>Room 304, CS Block</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-muted-foreground">Experience:</span>
                  <span>8 Years</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (activeView === "classes") {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">My Classes</h1>
          <Button className="bg-gradient-primary hover:opacity-90">
            <Download className="mr-2 h-4 w-4" />
            Export Reports
          </Button>
        </div>

        {/* Class Selection */}
        <div className="grid md:grid-cols-2 gap-6">
          {classes.map((cls) => (
            <Card 
              key={cls.code} 
              className={`shadow-card cursor-pointer transition-all ${
                selectedClass === cls.code ? 'ring-2 ring-accent' : ''
              }`}
              onClick={() => setSelectedClass(cls.code)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{cls.name}</h3>
                    <p className="text-sm text-muted-foreground">{cls.code}</p>
                  </div>
                  <Badge className="bg-gradient-primary">{cls.students} students</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Average Attendance</span>
                    <span className="font-medium">{cls.avgAttendance}%</span>
                  </div>
                  <Progress value={cls.avgAttendance} className="h-2" />
                  <p className="text-sm text-muted-foreground">{cls.schedule}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Student List */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Students - {classes.find(c => c.code === selectedClass)?.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {studentsData.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">{student.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={student.attendance >= 85 ? "default" : student.attendance >= 75 ? "secondary" : "destructive"}>
                      {student.attendance}%
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-1">
                      {student.present}/{student.total} classes
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (activeView === "generate-qr") {
    return (
      <div className="space-y-6 animate-fade-in">
        <h1 className="text-3xl font-bold">Generate QR Code</h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Create New Session</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Class</label>
                <select className="w-full p-2 border rounded-md">
                  {classes.map((cls) => (
                    <option key={cls.code} value={cls.code}>
                      {cls.name} ({cls.code})
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Session Duration</label>
                <select className="w-full p-2 border rounded-md">
                  <option value="5">5 minutes</option>
                  <option value="10">10 minutes</option>
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                </select>
              </div>
              <Button className="w-full bg-gradient-primary hover:opacity-90">
                <QrCode className="mr-2 h-4 w-4" />
                Generate QR Code
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-8 text-center">
              <div className="space-y-6">
                <div className="w-48 h-48 mx-auto bg-muted border-2 border-dashed border-muted-foreground/25 rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <QrCode className="w-12 h-12 mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">QR Code will appear here</p>
                  </div>
                </div>
                <div>
                  <p className="font-medium">Session Status: Inactive</p>
                  <p className="text-sm text-muted-foreground">Generate a QR code to start attendance</p>
                </div>
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
        <h1 className="text-3xl font-bold">Welcome, Dr. {email.split('@')[0]}!</h1>
        <Badge className="bg-gradient-primary">Faculty Portal</Badge>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Classes</p>
                <p className="text-2xl font-bold text-navy-500">{classes.length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold text-navy-500">
                  {classes.reduce((sum, cls) => sum + cls.students, 0)}
                </p>
              </div>
              <Users className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Attendance</p>
                <p className="text-2xl font-bold text-navy-500">84.7%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Sessions</p>
                <p className="text-2xl font-bold text-navy-500">0</p>
              </div>
              <Clock className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Schedule */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            Today's Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {classes.map((cls) => (
              <div key={cls.code} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-4 bg-gradient-primary rounded-full"></div>
                  <div>
                    <p className="font-medium">{cls.name}</p>
                    <p className="text-sm text-muted-foreground">{cls.code} • {cls.students} students</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">9:00 AM - 10:30 AM</p>
                  <Button size="sm" variant="outline" className="mt-2">
                    <QrCode className="mr-1 h-3 w-3" />
                    Start Session
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}