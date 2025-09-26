import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, User, Clock, Send, FileText } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { getAssignmentById, getSubmissionsByAssignment, createSubmission, getSubmissionsByStudent } from '@/api/assignments';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

export function AssignmentDetail() {
  const { id } = useParams<{ id: string }>();
  const user = getCurrentUser();
  const { toast } = useToast();
  
  const [submissionContent, setSubmissionContent] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!user || !id) return null;

  const assignment = getAssignmentById(id);
  if (!assignment) {
    return (
      <div className="space-y-6">
        <Link to="/assignments">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Assignments
          </Button>
        </Link>
        <Card className="p-12 text-center">
          <h3 className="text-lg font-medium">Assignment not found</h3>
          <p className="text-muted-foreground mt-2">The assignment you're looking for doesn't exist.</p>
        </Card>
      </div>
    );
  }

  const submissions = getSubmissionsByAssignment(id);
  const mySubmissions = user.role === 'student' ? getSubmissionsByStudent(user.email) : [];
  const hasSubmitted = mySubmissions.some(s => s.assignmentId === id);
  const mySubmission = mySubmissions.find(s => s.assignmentId === id);

  const isOverdue = new Date(assignment.dueAt) < new Date();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionContent.trim()) return;

    setIsSubmitting(true);
    try {
      await createSubmission({
        assignmentId: id,
        studentEmail: user.email,
        content: submissionContent,
        fileUrl: fileUrl || undefined
      });

      toast({
        title: "Submission successful!",
        description: "Your assignment has been submitted successfully."
      });

      setSubmissionContent('');
      setFileUrl('');
      window.location.reload(); // Refresh to show submission
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "There was an error submitting your assignment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link to="/assignments">
        <Button variant="ghost" className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Assignments
        </Button>
      </Link>

      {/* Assignment Details */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start gap-4">
            <div className="space-y-2">
              <CardTitle className="text-2xl">{assignment.title}</CardTitle>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Due: {format(new Date(assignment.dueAt), 'MMMM dd, yyyy HH:mm')}
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {assignment.createdBy}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Created {format(new Date(assignment.createdAt), 'MMM dd, yyyy')}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {isOverdue && <Badge variant="destructive">Overdue</Badge>}
              {hasSubmitted && (
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                  Submitted
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <p className="text-foreground leading-relaxed">{assignment.description}</p>
          </div>
        </CardContent>
      </Card>

      {/* Student Submission Form */}
      {user.role === 'student' && !hasSubmitted && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="w-5 h-5" />
              Submit Assignment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="content">Your Response</Label>
                <Textarea
                  id="content"
                  placeholder="Write your assignment response here..."
                  value={submissionContent}
                  onChange={(e) => setSubmissionContent(e.target.value)}
                  className="min-h-[200px]"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="file">File URL (Optional)</Label>
                <Input
                  id="file"
                  type="url"
                  placeholder="https://drive.google.com/your-file..."
                  value={fileUrl}
                  onChange={(e) => setFileUrl(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Add a link to any files (Google Drive, Dropbox, etc.)
                </p>
              </div>
              
              <Button 
                type="submit" 
                disabled={!submissionContent.trim() || isSubmitting || isOverdue}
                className="bg-gradient-primary hover:opacity-90"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Assignment'}
              </Button>
              
              {isOverdue && (
                <p className="text-sm text-destructive">
                  This assignment is overdue. Late submissions may not be accepted.
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      )}

      {/* Student's Submission */}
      {user.role === 'student' && hasSubmitted && mySubmission && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <FileText className="w-5 h-5" />
              Your Submission
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">
                Submitted on {format(new Date(mySubmission.submittedAt), 'MMMM dd, yyyy HH:mm')}
              </p>
              <p className="text-foreground">{mySubmission.content}</p>
              {mySubmission.fileUrl && (
                <div className="mt-3">
                  <a 
                    href={mySubmission.fileUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-sm"
                  >
                    View attached file →
                  </a>
                </div>
              )}
            </div>
            {mySubmission.grade && (
              <div className="p-4 border border-border rounded-lg">
                <h4 className="font-medium text-foreground mb-2">Grade: {mySubmission.grade}/100</h4>
                {mySubmission.feedback && (
                  <p className="text-sm text-muted-foreground">{mySubmission.feedback}</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Faculty: View All Submissions */}
      {user.role === 'faculty' && assignment.createdBy === user.email && (
        <Card>
          <CardHeader>
            <CardTitle>Student Submissions ({submissions.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {submissions.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No submissions yet.
              </p>
            ) : (
              <div className="space-y-4">
                {submissions.map((submission) => (
                  <div key={submission.id} className="border border-border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium">{submission.studentEmail}</h4>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(submission.submittedAt), 'MMM dd, yyyy HH:mm')}
                        </p>
                      </div>
                      {submission.grade && (
                        <Badge variant="secondary">Grade: {submission.grade}/100</Badge>
                      )}
                    </div>
                    <p className="text-sm mb-3">{submission.content}</p>
                    {submission.fileUrl && (
                      <a 
                        href={submission.fileUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-sm"
                      >
                        View attachment →
                      </a>
                    )}
                    {submission.feedback && (
                      <div className="mt-3 p-3 bg-muted/50 rounded">
                        <p className="text-sm"><strong>Feedback:</strong> {submission.feedback}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}