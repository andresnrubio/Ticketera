import { DashboardHeader } from '@/components/dashboard-header';
import { NewTicketForm } from '@/components/new-ticket-form';

export default function NewTicketPage() {
  return (
    <>
      <DashboardHeader title="New Ticket" />
      <NewTicketForm />
    </>
  );
}
