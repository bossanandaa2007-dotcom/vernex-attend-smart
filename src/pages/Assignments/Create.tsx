import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { createAssignment } from '@/api/assignments';
import { useToast } from '@/hooks/use-toast';

export function CreateAssignment() {
  const user = getCurrentUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('23:59');
  const [isCreating, setIsCreating] = useState(false);

  if (!user || user.role !== 'faculty') {
    return (
      <div className="space-y-6">
        <Card className="p-12 text-center">
          <h3 className="text-lg font-medium">Access Denied</h3>
          <p className="text-muted-foreground mt-2">Only faculty members can create assignments.</p>
        </Card>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !dueDate) return;

    setIsCreating(true);
    try {
      const dueDateTime = new Date(`${dueDate}T${dueTime}`).toISOString();
      
      await createAssignment({
        title: title.trim(),
        description: description.trim(),
        dueAt: dueDateTime,
        createdBy: user.email,
        createdByRole: user.role
      });

      toast({
        title: "Assignment created!",
        description: "Your assignment has been created successfully."
      });

      navigate('/assignments');
    } catch (error) {
      toast({
        title: "Creation failed",
        description: "There was an error creating your assignment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsCreating(false);
    }
  };

  // Set default due date to next week
  const getDefaultDueDate = () => {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    return nextWeek.toISOString().split('T')[0];
  };

  if (!dueDate) {
    setDueDate(getDefaultDueDate());
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link to="/assignments">
        <Button variant="ghost" className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Assignments
        </Button>
      </Link>

      {/* Create Form */}
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Save className="w-5 h-5" />
            Create New Assignment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Assignment Title</Label>
              <Input
                id="title"
                placeholder="Enter assignment title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Provide detailed instructions for the assignment..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[200px]"
                required
              />
              <p className="text-xs text-muted-foreground">
                Include objectives, requirements, submission format, and grading criteria.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dueTime">Due Time</Label>
                <Input
                  id="dueTime"
                  type="time"
                  value={dueTime}
                  onChange={(e) => setDueTime(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Preview</h4>
              <div className="space-y-2 text-sm">
                <p><strong>Title:</strong> {title || 'Enter title above'}</p>
                <p><strong>Due:</strong> {dueDate && dueTime ? new Date(`${dueDate}T${dueTime}`).toLocaleString() : 'Set date and time above'}</p>
                <p><strong>Created by:</strong> {user.email}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                type="submit"
                disabled={!title.trim() || !description.trim() || !dueDate || isCreating}
                className="bg-gradient-primary hover:opacity-90"
              >
                {isCreating ? 'Creating...' : 'Create Assignment'}
              </Button>
              
              <Link to="/assignments">
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Assignment Creation Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="space-y-1">
            <h4 className="font-medium">Clear Instructions</h4>
            <p className="text-muted-foreground">Provide detailed, step-by-step instructions to avoid confusion.</p>
          </div>
          
          <div className="space-y-1">
            <h4 className="font-medium">Learning Objectives</h4>
            <p className="text-muted-foreground">Clearly state what students should learn or demonstrate.</p>
          </div>
          
          <div className="space-y-1">
            <h4 className="font-medium">Submission Format</h4>
            <p className="text-muted-foreground">Specify expected format, length, and file types if applicable.</p>
          </div>
          
          <div className="space-y-1">
            <h4 className="font-medium">Grading Criteria</h4>
            <p className="text-muted-foreground">Include rubric or grading guidelines for transparency.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}