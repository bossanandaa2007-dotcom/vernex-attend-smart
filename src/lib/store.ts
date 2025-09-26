export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueAt: string;
  createdBy: string;
  createdByRole: string;
  createdAt: string;
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentEmail: string;
  content: string;
  fileUrl?: string;
  submittedAt: string;
  grade?: number;
  feedback?: string;
}

export interface GameSession {
  id: string;
  userEmail: string;
  gameKey: string;
  gameName: string;
  seconds: number;
  score?: number;
  playedAt: string;
}

export interface FeedbackST {
  id: string;
  studentEmail: string;
  teacherEmail: string;
  teacherName: string;
  rating: number;
  comments: string;
  createdAt: string;
}

export interface FeedbackTS {
  id: string;
  teacherEmail: string;
  studentEmail: string;
  studentName: string;
  comments: string;
  createdAt: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface Chat {
  id: string;
  userEmail: string;
  userRole: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface StoreData {
  assignments: Assignment[];
  submissions: Submission[];
  games: GameSession[];
  feedbackST: FeedbackST[];
  feedbackTS: FeedbackTS[];
  chats: Chat[];
}

const STORE_KEY = 'vernex_mock_db_v1';

const defaultData: StoreData = {
  assignments: [
    {
      id: '1',
      title: 'Database Design Assignment',
      description: 'Create an ERD for a library management system with at least 5 entities.',
      dueAt: '2025-01-15T23:59:59Z',
      createdBy: 'prof.smith@university.edu',
      createdByRole: 'faculty',
      createdAt: '2025-01-01T10:00:00Z'
    },
    {
      id: '2',
      title: 'React Components Lab',
      description: 'Build a todo application using React hooks and TypeScript.',
      dueAt: '2025-01-20T23:59:59Z',
      createdBy: 'prof.johnson@university.edu',
      createdByRole: 'faculty',
      createdAt: '2025-01-02T14:30:00Z'
    }
  ],
  submissions: [
    {
      id: '1',
      assignmentId: '1',
      studentEmail: 'student1@university.edu',
      content: 'I have completed the ERD with 6 entities including Book, Author, Member, etc.',
      submittedAt: '2025-01-10T15:30:00Z'
    }
  ],
  games: [
    {
      id: '1',
      userEmail: 'student1@university.edu',
      gameKey: 'memory-game',
      gameName: 'Memory Challenge',
      seconds: 180,
      score: 85,
      playedAt: '2025-01-05T16:20:00Z'
    },
    {
      id: '2',
      userEmail: 'student1@university.edu',
      gameKey: 'puzzle-game',
      gameName: 'Logic Puzzle',
      seconds: 240,
      score: 92,
      playedAt: '2025-01-06T14:15:00Z'
    }
  ],
  feedbackST: [
    {
      id: '1',
      studentEmail: 'student1@university.edu',
      teacherEmail: 'prof.smith@university.edu',
      teacherName: 'Prof. Smith',
      rating: 5,
      comments: 'Excellent teaching methodology and very helpful during office hours.',
      createdAt: '2025-01-03T12:00:00Z'
    }
  ],
  feedbackTS: [
    {
      id: '1',
      teacherEmail: 'prof.smith@university.edu',
      studentEmail: 'student1@university.edu',
      studentName: 'John Doe',
      comments: 'Very attentive in class and asks thoughtful questions. Excellent participation.',
      createdAt: '2025-01-04T11:30:00Z'
    }
  ],
  chats: []
};

export function getStore(): StoreData {
  try {
    const stored = localStorage.getItem(STORE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.warn('Failed to parse store data:', error);
  }
  
  // Initialize with default data
  setStore(defaultData);
  return defaultData;
}

export function setStore(data: StoreData): void {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save store data:', error);
  }
}

export function resetStore(): void {
  setStore(defaultData);
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}