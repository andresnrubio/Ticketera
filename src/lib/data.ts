import type { Agent, Ticket, User, UserRole } from './types';

export const agents: Agent[] = [
  { id: 'agent-1', name: 'Alice Johnson', avatar: 'https://i.pravatar.cc/150?u=agent-1' },
  { id: 'agent-2', name: 'Bob Williams', avatar: 'https://i.pravatar.cc/150?u=agent-2' },
  { id: 'agent-3', name: 'Charlie Brown', avatar: 'https://i.pravatar.cc/150?u=agent-3' },
  { id: 'agent-4', name: 'Diana Miller', avatar: 'https://i.pravatar.cc/150?u=agent-4' },
];

export const users: User[] = [
    { id: 'user-1', name: 'Admin User', email: 'admin@example.com', avatar: 'https://i.pravatar.cc/150?u=admin', role: 'Admin' },
    { id: 'user-2', name: 'Analyst User', email: 'analyst@example.com', avatar: 'https://i.pravatar.cc/150?u=analyst', role: 'Analyst' },
    { id: 'user-3', name: 'Standard User', email: 'user@example.com', avatar: 'https://i.pravatar.cc/150?u=standard', role: 'Standard' },
    ...agents.map((agent, index) => ({
        id: `user-${index + 4}`,
        name: agent.name,
        email: `${agent.name.toLowerCase().replace(' ', '.')}@example.com`,
        avatar: agent.avatar,
        role: 'Standard' as UserRole
    }))
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
   {
    id: 'TICKET-006',
    subject: 'Website is down',
    description: 'Our main website is not accessible. We are seeing a 503 Service Unavailable error.',
    status: 'Open',
    priority: 'Urgent',
    agent: agents[0],
    customer: { name: 'Tech Solutions Inc.', email: 'support@techsolutions.com' },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    comments: [],
  },
  {
    id: 'TICKET-007',
    subject: 'Question about API limits',
    description: 'What are the rate limits for the API? I could not find it in the documentation.',
    status: 'Open',
    priority: 'Low',
    agent: agents[2],
    customer: { name: 'Dev Ops', email: 'dev@company.com' },
    createdAt: subDays(new Date(), 1).toISOString(),
    updatedAt: subDays(new Date(), 1).toISOString(),
    comments: [],
  },
  {
    id: 'TICKET-008',
    subject: 'Password reset not working',
    description: 'The password reset link seems to be expired, although I just requested it.',
    status: 'In Progress',
    priority: 'High',
    agent: agents[1],
    customer: { name: 'Mark Cuban', email: 'mark@dallasmavericks.com' },
    createdAt: subDays(new Date(), 2).toISOString(),
    updatedAt: new Date().toISOString(),
    comments: [],
  },
  {
    id: 'TICKET-009',
    subject: 'Export data feature',
    description: 'It would be great to have an option to export all my data to a CSV file.',
    status: 'Resolved',
    priority: 'Medium',
    customer: { name: 'Elon Musk', email: 'elon@x.com' },
    createdAt: subDays(new Date(), 5).toISOString(),
    updatedAt: subDays(new Date(), 3).toISOString(),
    comments: [],
  },
  {
    id: 'TICKET-010',
    subject: 'App crashes on startup',
    description: 'The iOS app crashes immediately after I open it. I am on the latest version of iOS and the app.',
    status: 'Closed',
    priority: 'High',
    customer: { name: 'Steve Wozniak', email: 'woz@apple.com' },
    createdAt: subDays(new Date(), 6).toISOString(),
    updatedAt: subDays(new Date(), 5).toISOString(),
    comments: [],
  },
];

function subDays(date: Date, days: number) {
    const result = new Date(date);
    result.setDate(result.getDate() - days);
    return result;
}

export const getTicketById = (id: string) => tickets.find(ticket => ticket.id === id);
