
'use client';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/sidebar-nav';
import { UserNav } from '@/components/user-nav';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Logo } from '@/components/icons';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
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
            <p className="text-muted-foreground mt-2">Loading your dashboard...</p>
        </div>
    );
  }

  if (!user) {
    // This case will be hit after loading is false and user is null.
    // The useEffect will have already initiated the redirect.
    // Returning null prevents a flash of unstyled content.
    return null;
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarNav />
      </Sidebar>
      <SidebarInset>
        <div className="absolute top-4 right-4">
            <UserNav />
        </div>
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
