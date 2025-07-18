import type { Agent, Ticket } from './types';

export const agents: Agent[] = [
  { id: 'agent-1', name: 'Alice Johnson', avatar: 'https://i.pravatar.cc/150?u=agent-1' },
  { id: 'agent-2', name: 'Bob Williams', avatar: 'https://i.pravatar.cc/150?u=agent-2' },
  { id: 'agent-3', name: 'Charlie Brown', avatar: 'https://i.pravatar.cc/150?u=agent-3' },
  { id: 'agent-4', name: 'Diana Miller', avatar: 'https://i.pravatar.cc/150?u=agent-4' },
];

export const tickets: Ticket[] = [
  {
    id: 'TICKET-001',
    subject: 'Login issue on mobile app',
    description: 'I am unable to log in to my account using the mobile app on my Android device. It keeps showing "Authentication Failed". I have tried resetting my password, but the issue persists. My device is a Samsung Galaxy S21 running Android 13. The app version is 2.5.1.',
    status: 'Open',
    priority: 'High',
    agent: agents[0],
    customer: { name: 'John Doe', email: 'john.doe@example.com' },
    createdAt: '2024-05-20T10:00:00Z',
    updatedAt: '2024-05-22T14:30:00Z',
    comments: [
      { id: 'comment-1', author: agents[0], content: 'Looking into this. Have you tried clearing the app cache?', timestamp: '2024-05-20T11:00:00Z', type: 'Reply' },
      { id: 'comment-2', author: agents[1], content: 'Checked the auth logs, see a spike in failures from the EU region.', timestamp: '2024-05-21T09:20:00Z', type: 'Note' },
    ],
  },
  {
    id: 'TICKET-002',
    subject: 'Billing query about last invoice',
    description: 'I have a question about my last invoice (INV-12345). There is a charge for "Service B" which I believe I did not subscribe to. Can you please clarify this?',
    status: 'In Progress',
    priority: 'Medium',
    agent: agents[1],
    customer: { name: 'Jane Smith', email: 'jane.smith@example.com' },
    createdAt: '2024-05-19T15:20:00Z',
    updatedAt: '2024-05-21T11:00:00Z',
    comments: [],
  },
  {
    id: 'TICKET-003',
    subject: 'Feature request: Dark mode',
    description: 'The application is great, but it would be even better with a dark mode option. It would be much easier on the eyes, especially when working at night.',
    status: 'Resolved',
    priority: 'Low',
    agent: agents[2],
    customer: { name: 'Peter Jones', email: 'peter.jones@example.com' },
    createdAt: '2024-05-18T09:00:00Z',
    updatedAt: '2024-05-20T18:00:00Z',
    comments: [],
  },
  {
    id: 'TICKET-004',
    subject: 'Cannot upload files',
    description: 'When I try to upload a PDF file to my project, I get an "Upload Failed: File type not supported" error. The file is only 2MB.',
    status: 'Closed',
    priority: 'Urgent',
    customer: { name: 'Mary Garcia', email: 'mary.garcia@example.com' },
    createdAt: '2024-05-15T12:00:00Z',
    updatedAt: '2024-05-16T10:00:00Z',
    comments: [],
  },
  {
    id: 'TICKET-005',
    subject: 'How to reset my API key?',
    description: 'I need to reset my API key for security reasons, but I cannot find the option in my account settings. Can you please guide me on how to do this?',
    status: 'Open',
    priority: 'Medium',
    agent: agents[3],
    customer: { name: 'David Wilson', email: 'david.wilson@example.com' },
    createdAt: '2024-05-23T08:30:00Z',
    updatedAt: '2024-05-23T08:30:00Z',
    comments: [],
  },
];

export const getTicketById = (id: string) => tickets.find(ticket => ticket.id === id);
