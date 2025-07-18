import { DashboardHeader } from '@/components/dashboard-header';
import { UserList } from '@/components/user-list';
import { users } from '@/lib/data';

export default function UsersPage() {
  return (
    <>
      <DashboardHeader title="User Management" />
      <UserList users={users} />
    </>
  );
}
