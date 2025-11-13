import { AdvisorDashboardSidebar } from "@/components/advisor-dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";

export default function AdvisorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen bg-gray-50 dark:bg-black overflow-hidden">
      <DashboardHeader />
      <div className="h-[65px]"></div>
      <div className="flex h-[calc(100vh-65px)]">
        <AdvisorDashboardSidebar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
