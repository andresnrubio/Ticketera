import { DashboardHeader } from '@/components/dashboard-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { tickets } from '@/lib/data';
import { AnalyticsCharts } from '@/components/analytics-charts';

export default function AnalyticsPage() {
  return (
    <>
      <DashboardHeader
        title="Analytics"
        description="Insights into your support performance."
      />
      <AnalyticsCharts tickets={tickets} />
    </>
  );
}
