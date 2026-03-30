import { redirect } from 'next/navigation';

export default function AnalyticsPage() {
  // For the purpose of this demo, the Overview page acts as the main Analytics dashboard.
  redirect('/dashboard');
}
