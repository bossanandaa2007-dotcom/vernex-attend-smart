import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';

interface ShellProps {
  children: ReactNode;
  onLogout: () => void;
}

export function Shell({ children, onLogout }: ShellProps) {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar onLogout={onLogout} />
      <main className="flex-1 md:ml-0 overflow-hidden">
        <div className="h-full pt-16 md:pt-0 px-4 md:px-6 py-6">
          {children}
        </div>
      </main>
    </div>
  );
}