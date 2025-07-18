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

export function SidebarNav() {
  const pathname = usePathname();

  const menuItems = [
    {
      href: '/',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      href: '/tickets/new',
      label: 'New Ticket',
      icon: Ticket,
    },
    {
      href: '/analytics',
      label: 'Analytics',
      icon: BarChart3,
      role: ['Admin'],
    },
    {
        href: '/users',
        label: 'User Management',
        icon: Users,
        role: ['Admin']
    },
    {
      href: '/settings',
      label: 'Settings',
      icon: Settings,
    },
  ];

  return (
    <div className="flex flex-col h-full">
        <div className="p-4 flex items-center gap-2">
            <Logo />
            <span className="font-semibold text-lg">Ticket AG</span>
        </div>
        <Separator />
        <SidebarMenu className="p-4 flex-1">
        {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
            <Link href={item.href} legacyBehavior passHref>
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
