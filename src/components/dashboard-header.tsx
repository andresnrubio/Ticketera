import { SidebarTrigger } from '@/components/ui/sidebar';

type DashboardHeaderProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
};

export function DashboardHeader({ title, description, children }: DashboardHeaderProps) {
  return (
    <header className="flex items-start justify-between mb-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="md:hidden" />
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
      </div>
      <div className="flex items-center gap-2">{children}</div>
    </header>
  );
}
