import { TopBar } from "@/shared/components/TopBar";
import { Sidebar } from "@/shared/components/Sidebar";
import { DnaProfileBanner } from "@/shared/components/DnaProfileBanner";
import { AuthGuard } from "@/shared/components/AuthGuard";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="h-screen flex flex-col overflow-hidden bg-kairos-paper">
        <TopBar />
        <DnaProfileBanner />
        <div className="flex-1 flex min-h-0">
          <Sidebar />
          <main className="flex-1 min-w-0 overflow-hidden flex flex-col">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
