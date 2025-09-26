export type UserRole = 'student' | 'faculty' | 'hod' | 'dean';

export interface User {
  email: string;
  role: UserRole;
}

const AUTH_KEY = 'vernex_current_user';

export function getCurrentUser(): User | null {
  try {
    const stored = localStorage.getItem(AUTH_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.warn('Failed to parse auth data:', error);
  }
  return null;
}

export function setCurrentUser(user: User): void {
  try {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Failed to save auth data:', error);
  }
}

export function clearCurrentUser(): void {
  localStorage.removeItem(AUTH_KEY);
}

export function getUserDisplayName(role: UserRole): string {
  switch (role) {
    case 'student':
      return 'Student';
    case 'faculty':
      return 'Faculty';
    case 'hod':
      return 'Head of Department';
    case 'dean':
      return 'Dean';
    default:
      return 'User';
  }
}