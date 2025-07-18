'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  ArrowUpDown,
  Search,
} from 'lucide-react';
import type { Ticket, TicketPriority, TicketStatus } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { format, parseISO } from 'date-fns';

type SortConfig = {
  key: keyof Ticket | 'customer' | 'agent';
  direction: 'ascending' | 'descending';
} | null;

const priorityVariant: Record<TicketPriority, 'destructive' | 'secondary' | 'default'> = {
  'Urgent': 'destructive',
  'High': 'destructive',
  'Medium': 'secondary',
  'Low': 'default'
}

const statusVariant: Record<TicketStatus, 'default' | 'secondary' | 'outline'> = {
    'Open': 'default',
    'In Progress': 'secondary',
    'Resolved': 'outline',
    'Closed': 'outline'
}

export function TicketList({ tickets }: { tickets: Ticket[] }) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<TicketStatus[]>([]);
  const [priorityFilter, setPriorityFilter] = React.useState<TicketPriority[]>([]);
  const [sortConfig, setSortConfig] = React.useState<SortConfig>({ key: 'updatedAt', direction: 'descending' });

  const handleSort = (key: keyof Ticket | 'customer' | 'agent') => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  const sortedAndFilteredTickets = React.useMemo(() => {
    let filteredTickets = tickets
      .filter((ticket) => {
        const searchLower = searchTerm.toLowerCase();
        return (
          ticket.subject.toLowerCase().includes(searchLower) ||
          ticket.id.toLowerCase().includes(searchLower) ||
          ticket.customer.name.toLowerCase().includes(searchLower)
        );
      })
      .filter(
        (ticket) => statusFilter.length === 0 || statusFilter.includes(ticket.status)
      )
      .filter(
        (ticket) => priorityFilter.length === 0 || priorityFilter.includes(ticket.priority)
      );

    if (sortConfig !== null) {
      filteredTickets.sort((a, b) => {
        let aValue: any, bValue: any;

        if (sortConfig.key === 'customer') {
          aValue = a.customer.name;
          bValue = b.customer.name;
        } else if (sortConfig.key === 'agent') {
            aValue = a.agent?.name || '';
            bValue = b.agent?.name || '';
        } else {
            aValue = a[sortConfig.key as keyof Ticket];
            bValue = b[sortConfig.key as keyof Ticket];
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return filteredTickets;
  }, [tickets, searchTerm, statusFilter, priorityFilter, sortConfig]);

  const toggleFilter = <T extends string>(
    filter: T[],
    setFilter: React.Dispatch<React.SetStateAction<T[]>>,
    value: T
  ) => {
    if (filter.includes(value)) {
      setFilter(filter.filter((v) => v !== value));
    } else {
      setFilter([...filter, value]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by keyword, ID, customer..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Status</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {(['Open', 'In Progress', 'Resolved', 'Closed'] as TicketStatus[]).map((status) => (
                <DropdownMenuCheckboxItem
                  key={status}
                  checked={statusFilter.includes(status)}
                  onSelect={(e) => e.preventDefault()}
                  onClick={() => toggleFilter(statusFilter, setStatusFilter, status)}
                >
                  {status}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Priority</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {(['Low', 'Medium', 'High', 'Urgent'] as TicketPriority[]).map((priority) => (
                <DropdownMenuCheckboxItem
                  key={priority}
                  checked={priorityFilter.includes(priority)}
                  onSelect={(e) => e.preventDefault()}
                  onClick={() => toggleFilter(priorityFilter, setPriorityFilter, priority)}
                >
                  {priority}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('id')}>
                  Ticket ID <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('subject')}>
                  Subject <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('customer')}>
                  Customer <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('agent')}>
                  Agent <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('priority')}>
                  Priority <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('status')}>
                  Status <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('updatedAt')}>
                  Last Update <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedAndFilteredTickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell className="font-medium">
                  <Link href={`/tickets/${ticket.id}`} className="text-primary hover:underline">
                    {ticket.id}
                  </Link>
                </TableCell>
                <TableCell>{ticket.subject}</TableCell>
                <TableCell>{ticket.customer.name}</TableCell>
                <TableCell>{ticket.agent?.name || 'Unassigned'}</TableCell>
                <TableCell>
                  <Badge variant={priorityVariant[ticket.priority]}>{ticket.priority}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={statusVariant[ticket.status]} className={cn(ticket.status === 'Open' && 'bg-primary/20 text-primary-foreground border-primary/50 hover:bg-primary/30')}>{ticket.status}</Badge>
                </TableCell>
                <TableCell>{format(parseISO(ticket.updatedAt), 'PPp')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
