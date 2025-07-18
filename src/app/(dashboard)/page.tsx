import { DashboardHeader } from '@/components/dashboard-header';
import { TicketList } from '@/components/ticket-list';
import { tickets } from '@/lib/data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader title="Dashboard">
        <Link href="/tickets/new" legacyBehavior passHref>
          <Button>
            <PlusCircle />
            New Ticket
          </Button>
        </Link>
      </DashboardHeader>
      <TicketList tickets={tickets} />
    </>
  );
}
