import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Calendar, User, Clock, BookOpen } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { getAssignments, getSubmissionsByStudent } from '@/api/assignments';
import { format } from 'date-fns';

export function AssignmentsList() {
  const user = getCurrentUser();
  const assignments = getAssignments();
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  
  if (!user) return null;

  const submissions = user.role === 'student' ? getSubmissionsByStudent(user.email) : [];
  
  const filteredAssignments = assignments.filter(assignment => {
    if (user.role === 'faculty' && assignment.createdBy !== user.email) return false;
    
    if (user.role === 'student') {
      const hasSubmission = submissions.some(s => s.assignmentId === assignment.id);
      if (filter === 'pending' && hasSubmission) return false;
      if (filter === 'completed' && !hasSubmission) return false;
    }
    
    return true;
  });

  const getStatusBadge = (assignmentId: string) => {
    if (user.role !== 'student') return null;
    
    const hasSubmission = submissions.some(s => s.assignmentId === assignmentId);
    return hasSubmission ? (
      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
        Completed
      </Badge>
    ) : (
      <Badge variant="destructive">Pending</Badge>
    );
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground">Assignments</h1>
          <p className="text-muted-foreground">
            {user.role === 'student' ? 'View and submit your assignments' : 'Manage your assignments'}
          </p>
        </div>
        
        {user.role === 'faculty' && (
          <Link to="/assignments/create">
            <Button className="bg-gradient-primary hover:opacity-90">
              <Plus className="w-4 h-4 mr-2" />
              Create Assignment
            </Button>
          </Link>
        )}
      </div>

      {/* Filters */}
      {user.role === 'student' && (
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'pending' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('pending')}
          >
            Pending
          </Button>
          <Button
            variant={filter === 'completed' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('completed')}
          >
            Completed
          </Button>
        </div>
      )}

      {/* Assignments Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredAssignments.map((assignment) => (
          <Card key={assignment.id} className="hover:shadow-elegant transition-all duration-200">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start gap-2">
                <CardTitle className="text-lg font-semibold leading-tight">
                  {assignment.title}
                </CardTitle>
                {getStatusBadge(assignment.id)}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {assignment.description}
              </p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>Due: {format(new Date(assignment.dueAt), 'MMM dd, yyyy')}</span>
                  {isOverdue(assignment.dueAt) && (
                    <Badge variant="destructive" className="text-xs">Overdue</Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span>{assignment.createdBy}</span>
                </div>
                
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>Created {format(new Date(assignment.createdAt), 'MMM dd')}</span>
                </div>
              </div>
              
              <div className="pt-2">
                <Link to={`/assignments/${assignment.id}`}>
                  <Button className="w-full" variant="outline">
                    View Details
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAssignments.length === 0 && (
        <Card className="p-12 text-center">
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">No assignments found</h3>
              <p className="text-muted-foreground">
                {user.role === 'student' 
                  ? filter === 'pending' 
                    ? "You're all caught up! No pending assignments."
                    : filter === 'completed'
                    ? "No completed assignments yet."
                    : "No assignments available at the moment."
                  : "You haven't created any assignments yet."
                }
              </p>
            </div>
            {user.role === 'faculty' && (
              <Link to="/assignments/create">
                <Button className="bg-gradient-primary hover:opacity-90">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Assignment
                </Button>
              </Link>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}