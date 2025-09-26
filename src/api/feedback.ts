import { getStore, setStore, generateId, FeedbackST, FeedbackTS } from '@/lib/store';

export function getStudentToTeacherFeedback(): FeedbackST[] {
  return getStore().feedbackST;
}

export function getTeacherToStudentFeedback(): FeedbackTS[] {
  return getStore().feedbackTS;
}

export function getFeedbackByTeacher(teacherEmail: string): FeedbackST[] {
  return getStore().feedbackST.filter(f => f.teacherEmail === teacherEmail);
}

export function getFeedbackByStudent(studentEmail: string): FeedbackTS[] {
  return getStore().feedbackTS.filter(f => f.studentEmail === studentEmail);
}

export function createStudentToTeacherFeedback(
  feedback: Omit<FeedbackST, 'id' | 'createdAt'>
): FeedbackST {
  const store = getStore();
  const newFeedback: FeedbackST = {
    ...feedback,
    id: generateId(),
    createdAt: new Date().toISOString()
  };
  
  store.feedbackST.push(newFeedback);
  setStore(store);
  return newFeedback;
}

export function createTeacherToStudentFeedback(
  feedback: Omit<FeedbackTS, 'id' | 'createdAt'>
): FeedbackTS {
  const store = getStore();
  const newFeedback: FeedbackTS = {
    ...feedback,
    id: generateId(),
    createdAt: new Date().toISOString()
  };
  
  store.feedbackTS.push(newFeedback);
  setStore(store);
  return newFeedback;
}

export function getFeedbackStats() {
  const stFeedback = getStudentToTeacherFeedback();
  const tsFeedback = getTeacherToStudentFeedback();
  
  const avgRating = stFeedback.length > 0
    ? stFeedback.reduce((acc, f) => acc + f.rating, 0) / stFeedback.length
    : 0;
  
  const ratingDistribution = [1, 2, 3, 4, 5].map(rating => ({
    rating,
    count: stFeedback.filter(f => f.rating === rating).length
  }));
  
  return {
    totalSTFeedback: stFeedback.length,
    totalTSFeedback: tsFeedback.length,
    averageRating: Math.round(avgRating * 10) / 10,
    ratingDistribution
  };
}