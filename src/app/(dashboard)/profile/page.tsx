import { DashboardHeader } from '@/components/dashboard-header';
import { ProfileForm } from '@/components/profile-form';
import { users } from '@/lib/data';

export default function ProfilePage() {
  // In a real app, you would get the currently logged-in user.
  // For this example, we'll use the first user from our mock data.
  const currentUser = users[0];

  return (
    <>
      <DashboardHeader title="My Profile" />
      <ProfileForm user={currentUser} />
    </>
  );
}
