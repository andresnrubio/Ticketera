export type TicketStatus = 'Open' | 'In Progress' | 'Resolved' | 'Closed';
export type TicketPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

export type Agent = {
  id: string;
  name: string;
  avatar: string;
};

export type Comment = {
  id: string;
  author: Agent;
  content: string;
  timestamp: string;
  type: 'Reply' | 'Note';
};

export type Ticket = {
  id: string;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  agent?: Agent;
  customer: {
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
};
