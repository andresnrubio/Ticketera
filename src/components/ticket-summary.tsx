'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getTicketSummary } from '@/app/actions';
import { Ticket } from '@/lib/types';
import { useEffect, useState, useTransition } from 'react';
import { Skeleton } from './ui/skeleton';
import { AlertTriangle, Clock, Smile, Ticket as TicketIcon, Info } from 'lucide-react';

type SummaryData = {
    openTickets: number;
    ticketsToday: number;
    resolutionTimeHours: number;
    satisfaction: number;
    summary: string;
}

export function TicketSummary({ tickets }: { tickets: Ticket[] }) {
    const [summary, setSummary] = useState<SummaryData | null>(null);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        startTransition(async () => {
            const result = await getTicketSummary(tickets);
            setSummary(result);
        })
    }, [tickets]);

    if (isPending) {
        return <TicketSummarySkeleton />;
    }

    if (!summary) {
        return null; // Or some error state
    }

    const summaryItems = [
        {
            title: 'Open Tickets',
            value: summary.openTickets,
            icon: <TicketIcon className="text-primary" />,
        },
        {
            title: 'New Today',
            value: summary.ticketsToday,
            icon: <AlertTriangle className="text-destructive" />,
        },
        {
            title: 'Avg. Resolution',
            value: `${summary.resolutionTimeHours}h`,
            icon: <Clock className="text-yellow-500" />,
        },
        {
            title: 'Satisfaction',
            value: `${summary.satisfaction}%`,
            icon: <Smile className="text-green-500" />,
        },
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <Card className="lg:col-span-4">
                <CardHeader>
                    <CardTitle>Ticket Overview</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {summaryItems.map((item, index) => (
                            <Card key={index} className="flex flex-col items-center justify-center p-4">
                                <div className="text-3xl font-bold">{item.value}</div>
                                <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                                    {item.icon} {item.title}
                                </p>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>
             <Card className="lg:col-span-1 bg-accent/50 border-accent">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                        <Info className="text-accent-foreground" />
                        AI Summary
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-accent-foreground">
                        {summary.summary}
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}

function TicketSummarySkeleton() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <Card className="lg:col-span-4">
                <CardHeader>
                    <Skeleton className="h-6 w-1/3" />
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[...Array(4)].map((_, index) => (
                            <Card key={index} className="p-4 space-y-2">
                                <Skeleton className="h-8 w-1/2 mx-auto" />
                                <Skeleton className="h-4 w-3/4 mx-auto" />
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>
            <Card className="lg:col-span-1">
                <CardHeader>
                    <Skeleton className="h-6 w-1/2" />
                </CardHeader>
                <CardContent className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                </CardContent>
            </Card>
        </div>
    );
}
