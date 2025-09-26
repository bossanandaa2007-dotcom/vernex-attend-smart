import { getStore, setStore, generateId, Assignment, Submission } from '@/lib/store';

export function getAssignments(): Assignment[] {
  return getStore().assignments;
}

export function getAssignmentById(id: string): Assignment | undefined {
  return getStore().assignments.find(a => a.id === id);
}

export function createAssignment(assignment: Omit<Assignment, 'id' | 'createdAt'>): Assignment {
  const store = getStore();
  const newAssignment: Assignment = {
    ...assignment,
    id: generateId(),
    createdAt: new Date().toISOString()
  };
  
  store.assignments.push(newAssignment);
  setStore(store);
  return newAssignment;
}

export function getSubmissions(): Submission[] {
  return getStore().submissions;
}

export function getSubmissionsByAssignment(assignmentId: string): Submission[] {
  return getStore().submissions.filter(s => s.assignmentId === assignmentId);
}

export function getSubmissionsByStudent(studentEmail: string): Submission[] {
  return getStore().submissions.filter(s => s.studentEmail === studentEmail);
}

export function createSubmission(submission: Omit<Submission, 'id' | 'submittedAt'>): Submission {
  const store = getStore();
  const newSubmission: Submission = {
    ...submission,
    id: generateId(),
    submittedAt: new Date().toISOString()
  };
  
  store.submissions.push(newSubmission);
  setStore(store);
  return newSubmission;
}

export function gradeSubmission(submissionId: string, grade: number, feedback?: string): void {
  const store = getStore();
  const submission = store.submissions.find(s => s.id === submissionId);
  if (submission) {
    submission.grade = grade;
    submission.feedback = feedback;
    setStore(store);
  }
}