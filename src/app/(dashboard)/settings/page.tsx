import { DashboardHeader } from '@/components/dashboard-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  return (
    <>
      <DashboardHeader title="Settings" />
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Azure DevOps Integration</CardTitle>
            <CardDescription>
              Connect your Azure DevOps account to link tickets with work items.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ado-org">Organization URL</Label>
              <Input
                id="ado-org"
                placeholder="https://dev.azure.com/your-org"
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ado-pat">Personal Access Token</Label>
              <Input
                id="ado-pat"
                type="password"
                placeholder="Enter your PAT"
                disabled
              />
            </div>
            <Button disabled>Connect</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Email Notifications</CardTitle>
            <CardDescription>
              Manage your email notification preferences.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <Label>New Ticket Created</Label>
                <p className="text-xs text-muted-foreground">
                  Receive an email when a new ticket is created.
                </p>
              </div>
              <Switch disabled defaultChecked/>
            </div>
             <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <Label>Ticket Assigned to You</Label>
                <p className="text-xs text-muted-foreground">
                  Get notified when a ticket is assigned to you.
                </p>
              </div>
              <Switch disabled defaultChecked/>
            </div>
             <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <Label>Customer Replies</Label>
                <p className="text-xs text-muted-foreground">
                  Receive an email when a customer replies to a ticket.
                </p>
              </div>
              <Switch disabled />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
