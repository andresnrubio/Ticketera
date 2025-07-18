import { DashboardHeader } from '@/components/dashboard-header';
import { TicketList } from '@/components/ticket-list';
import { tickets } from '@/lib/data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import { TicketSummary } from '@/components/ticket-summary';

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader title="Dashboard">
        <Link href="/dashboard/tickets/new">
          <Button>
            <PlusCircle />
            New Ticket
          </Button>
        </Link>
      </DashboardHeader>
      <div className="space-y-6">
        <TicketSummary tickets={tickets} />
        <TicketList tickets={tickets} />
      </div>
    </>
  );
}
