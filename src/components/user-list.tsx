'use client';

import * as React from 'react';
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
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import type { User, UserRole } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const roleVariant: Record<UserRole, 'default' | 'secondary' | 'outline'> = {
  Admin: 'default',
  Analyst: 'secondary',
  Standard: 'outline',
};

export function UserList({ users }: { users: User[] }) {
    const { toast } = useToast();

    const handleRoleChange = (userId: string, role: UserRole) => {
        // In a real app, you would make an API call here.
        console.log(`Changing role for user ${userId} to ${role}`);
        toast({
            title: "User Role Updated",
            description: `The user's role has been changed to ${role}.`,
        });
    };

    const handleUserDelete = (userId: string) => {
        // In a real app, you would make an API call here.
        console.log(`Deleting user ${userId}`);
        toast({
            title: "User Deleted",
            description: "The user has been successfully deleted.",
            variant: "destructive"
        });
    }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={roleVariant[user.role]} className={cn(user.role === 'Admin' && 'bg-primary/20 text-primary-foreground border-primary/50 hover:bg-primary/30')}>{user.role}</Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit User
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>Change Role</DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                            {(['Admin', 'Analyst', 'Standard'] as UserRole[]).map(role => (
                                <DropdownMenuItem key={role} onClick={() => handleRoleChange(user.id, role)}>
                                    {role}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive" onClick={() => handleUserDelete(user.id)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete User
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
