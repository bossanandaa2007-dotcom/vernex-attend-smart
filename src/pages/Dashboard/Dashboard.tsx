import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Clock, 
  Star, 
  MessageSquare, 
  TrendingUp,
  Users,
  Award,
  Calendar
} from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { getAssignments, getSubmissionsByStudent } from '@/api/assignments';
import { getGameStats } from '@/api/games';
import { getFeedbackByTeacher, getFeedbackByStudent, getFeedbackStats } from '@/api/feedback';

export function Dashboard() {
  const user = getCurrentUser();
  if (!user) return null;

  const assignments = getAssignments();
  const gameStats = getGameStats(user.email);
  const feedbackStats = getFeedbackStats();

  const renderStudentStats = () => {
    const submissions = getSubmissionsByStudent(user.email);
    const pendingAssignments = assignments.filter(a => 
      !submissions.some(s => s.assignmentId === a.id)
    );

    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{pendingAssignments.length}</div>
            <p className="text-xs text-muted-foreground">
              {pendingAssignments.length === 1 ? 'assignment' : 'assignments'} due soon
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Assignments</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{submissions.length}</div>
            <p className="text-xs text-muted-foreground">
              submissions made
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Games Played</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{gameStats.totalGames}</div>
            <p className="text-xs text-muted-foreground">
              avg score: {gameStats.averageScore}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {Math.round(gameStats.totalTime / 60)}m
            </div>
            <p className="text-xs text-muted-foreground">
              total game time
            </p>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderFacultyStats = () => {
    const myAssignments = assignments.filter(a => a.createdBy === user.email);
    const teacherFeedback = getFeedbackByTeacher(user.email);

    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Assignments</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{myAssignments.length}</div>
            <p className="text-xs text-muted-foreground">
              assignments created
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Student Feedback</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{teacherFeedback.length}</div>
            <p className="text-xs text-muted-foreground">
              feedback received
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {teacherFeedback.length > 0 
                ? (teacherFeedback.reduce((acc, f) => acc + f.rating, 0) / teacherFeedback.length).toFixed(1)
                : 'N/A'
              }
            </div>
            <p className="text-xs text-muted-foreground">
              out of 5 stars
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {myAssignments.filter(a => 
                new Date(a.createdAt).getMonth() === new Date().getMonth()
              ).length}
            </div>
            <p className="text-xs text-muted-foreground">
              new assignments
            </p>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderHODStats = () => {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Department Faculty</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">12</div>
            <p className="text-xs text-muted-foreground">
              active faculty members
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">240</div>
            <p className="text-xs text-muted-foreground">
              enrolled students
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Feedback Score</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{feedbackStats.averageRating}</div>
            <p className="text-xs text-muted-foreground">
              average department rating
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Assignments</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{assignments.length}</div>
            <p className="text-xs text-muted-foreground">
              across all courses
            </p>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderDeanStats = () => {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Departments</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">8</div>
            <p className="text-xs text-muted-foreground">
              academic departments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Institution Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">1,840</div>
            <p className="text-xs text-muted-foreground">
              total enrollment
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{feedbackStats.averageRating}</div>
            <p className="text-xs text-muted-foreground">
              institution-wide average
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">94%</div>
            <p className="text-xs text-muted-foreground">
              satisfaction score
            </p>
          </CardContent>
        </Card>
      </div>
    );
  };

  const getWelcomeMessage = () => {
    switch (user.role) {
      case 'student':
        return 'Welcome back! Ready to learn something new today?';
      case 'faculty':
        return 'Welcome to your teaching dashboard. Inspire minds today!';
      case 'hod':
        return 'Department overview ready. Leading with excellence!';
      case 'dean':
        return 'Institution insights at your fingertips. Shaping the future!';
      default:
        return 'Welcome to VERNEX!';
    }
  };

  const renderStats = () => {
    switch (user.role) {
      case 'student': return renderStudentStats();
      case 'faculty': return renderFacultyStats();
      case 'hod': return renderHODStats();
      case 'dean': return renderDeanStats();
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">{getWelcomeMessage()}</p>
      </div>

      {/* Role Badge */}
      <div className="flex items-center gap-4">
        <Badge variant="secondary" className="px-3 py-1">
          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
        </Badge>
        <span className="text-sm text-muted-foreground">{user.email}</span>
      </div>

      {/* Stats Cards */}
      {renderStats()}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {user.role === 'student' && (
              <>
                <Card className="p-4 hover:shadow-card transition-shadow cursor-pointer">
                  <div className="text-center space-y-2">
                    <BookOpen className="w-8 h-8 mx-auto text-primary" />
                    <p className="font-medium">View Assignments</p>
                    <p className="text-xs text-muted-foreground">Check pending work</p>
                  </div>
                </Card>
                <Card className="p-4 hover:shadow-card transition-shadow cursor-pointer">
                  <div className="text-center space-y-2">
                    <Star className="w-8 h-8 mx-auto text-primary" />
                    <p className="font-medium">Play Games</p>
                    <p className="text-xs text-muted-foreground">Boost your IQ</p>
                  </div>
                </Card>
              </>
            )}
            
            {user.role === 'faculty' && (
              <>
                <Card className="p-4 hover:shadow-card transition-shadow cursor-pointer">
                  <div className="text-center space-y-2">
                    <BookOpen className="w-8 h-8 mx-auto text-primary" />
                    <p className="font-medium">Create Assignment</p>
                    <p className="text-xs text-muted-foreground">Add new task</p>
                  </div>
                </Card>
                <Card className="p-4 hover:shadow-card transition-shadow cursor-pointer">
                  <div className="text-center space-y-2">
                    <MessageSquare className="w-8 h-8 mx-auto text-primary" />
                    <p className="font-medium">Give Feedback</p>
                    <p className="text-xs text-muted-foreground">Rate students</p>
                  </div>
                </Card>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}