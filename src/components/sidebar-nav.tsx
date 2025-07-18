'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Settings, Ticket, BarChart3 } from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/icons';
import { Separator } from './ui/separator';
import { useAuth } from '@/hooks/use-auth';
import type { UserRole } from '@/lib/types';

export function SidebarNav() {
  const pathname = usePathname();
  const { user } = useAuth();

  const menuItems = [
    {
      href: '/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      roles: ['Admin', 'Analyst', 'Standard'],
    },
    {
      href: '/tickets/new',
      label: 'New Ticket',
      icon: Ticket,
      roles: ['Admin', 'Standard'],
    },
    {
      href: '/analytics',
      label: 'Analytics',
      icon: BarChart3,
      roles: ['Admin', 'Analyst'],
    },
    {
        href: '/users',
        label: 'User Management',
        icon: Users,
        roles: ['Admin']
    },
    {
      href: '/settings',
      label: 'Settings',
      icon: Settings,
      roles: ['Admin', 'Analyst', 'Standard'],
    },
  ];

  const filteredMenuItems = menuItems.filter(item => user && item.roles.includes(user.role));

  return (
    <div className="flex flex-col h-full">
        <div className="p-4 flex items-center gap-2">
            <Logo />
            <span className="font-semibold text-lg">Ticket AG</span>
        </div>
        <Separator />
        <SidebarMenu className="p-4 flex-1">
        {filteredMenuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
            <Link href={item.href}>
                <SidebarMenuButton
                isActive={pathname === item.href}
                tooltip={item.label}
                >
                <item.icon />
                <span>{item.label}</span>
                </SidebarMenuButton>
            </Link>
            </SidebarMenuItem>
        ))}
        </SidebarMenu>
    </div>
  );
}
