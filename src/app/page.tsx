'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Logo } from '@/components/icons';

export default function RootPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace('/dashboard');
      } else {
        router.replace('/login');
      }
    }
  }, [user, loading, router]);

  // Render a loading state while checking auth status
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <div className="flex items-center gap-2 mb-4">
            <Logo />
            <span className="text-xl font-semibold">Ticket AG</span>
        </div>
        <div className="w-64">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary animate-pulse w-full"></div>
            </div>
        </div>
        <p className="text-muted-foreground mt-2">Loading...</p>
    </div>
  );
}
