'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Pie, PieChart, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { type Ticket } from '@/lib/types';
import { ChartTooltipContent, ChartContainer, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { useMemo } from 'react';
import { format, subDays, startOfDay } from 'date-fns';

export function AnalyticsCharts({ tickets }: { tickets: Ticket[] }) {
  const chartDataByDay = useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => subDays(startOfDay(new Date()), i)).reverse();
    const data = last7Days.map(day => {
      const dayTickets = tickets.filter(t => new Date(t.createdAt).toDateString() === day.toDateString());
      return {
        date: format(day, 'MMM d'),
        open: dayTickets.filter(t => t.status === 'Open' || t.status === 'In Progress').length,
        closed: dayTickets.filter(t => t.status === 'Resolved' || t.status === 'Closed').length,
      };
    });
    return data;
  }, [tickets]);

  const chartDataByPriority = useMemo(() => {
    const priorities = ['Low', 'Medium', 'High', 'Urgent'];
    const data = priorities.map(p => ({
      name: p,
      value: tickets.filter(t => t.priority === p).length,
    }));
    return data;
  }, [tickets]);

  const COLORS = {
    'Low': 'hsl(var(--chart-1))',
    'Medium': 'hsl(var(--chart-2))',
    'High': 'hsl(var(--chart-3))',
    'Urgent': 'hsl(var(--chart-4))'
  };

  const chartConfig = {
    open: {
      label: 'Open',
      color: 'hsl(var(--chart-1))',
    },
    closed: {
      label: 'Closed',
      color: 'hsl(var(--chart-2))',
    },
    Low: {
        label: 'Low',
        color: COLORS.Low
    },
    Medium: {
        label: 'Medium',
        color: COLORS.Medium
    },
    High: {
        label: 'High',
        color: COLORS.High
    },
    Urgent: {
        label: 'Urgent',
        color: COLORS.Urgent
    }
  };


  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Ticket Volume</CardTitle>
          <CardDescription>Open vs. Closed tickets over the last 7 days.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <ResponsiveContainer>
              <BarChart data={chartDataByDay}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="date" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="open" fill="var(--color-open)" radius={4} />
                <Bar dataKey="closed" fill="var(--color-closed)" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Tickets by Priority</CardTitle>
          <CardDescription>Distribution of tickets across priority levels.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartDataByPriority}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {chartDataByPriority.map((entry) => (
                    <Cell key={`cell-${entry.name}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltipContent nameKey="name" />} />
                <ChartLegend content={<ChartLegendContent nameKey="name" />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
