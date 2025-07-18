import { notFound } from 'next/navigation';
import { getTicketById, agents } from '@/lib/data';
import { DashboardHeader } from '@/components/dashboard-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AiSuggestions } from '@/components/ai-suggestions';
import { TicketCommunication } from '@/components/ticket-communication';
import { format, parseISO } from 'date-fns';
import { Separator } from '@/components/ui/separator';

export default function TicketDetailPage({ params }: { params: { id: string } }) {
  const ticket = getTicketById(params.id);

  if (!ticket) {
    notFound();
  }

  return (
    <>
      <DashboardHeader title={`Ticket: ${ticket.id}`} />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{ticket.subject}</CardTitle>
              <CardDescription>
                From: {ticket.customer.name} ({ticket.customer.email})
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {ticket.description}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
                <CardTitle>Communication</CardTitle>
            </CardHeader>
            <CardContent>
                <TicketCommunication initialComments={ticket.comments} />
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Priority</span>
                    <Badge variant={ticket.priority === 'High' || ticket.priority === 'Urgent' ? 'destructive' : 'secondary'}>{ticket.priority}</Badge>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Status</span>
                    <Select defaultValue={ticket.status}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Set status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Open">Open</SelectItem>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="Resolved">Resolved</SelectItem>
                            <SelectItem value="Closed">Closed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Separator />
                 <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Agent</span>
                     <Select defaultValue={ticket.agent?.id}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Assign agent" />
                        </SelectTrigger>
                        <SelectContent>
                            {agents.map(agent => (
                                <SelectItem key={agent.id} value={agent.id}>{agent.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Separator />
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Created</span>
                    <span>{format(parseISO(ticket.createdAt), 'PP')}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Update</span>
                    <span>{format(parseISO(ticket.updatedAt), 'PP')}</span>
                </div>
            </CardContent>
          </Card>
          <AiSuggestions ticketContent={ticket.description} />
        </div>
      </div>
    </>
  );
}
