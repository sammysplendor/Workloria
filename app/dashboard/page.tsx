import { Suspense } from "react";
import DashboardContent from "@/components/DashboardContent";

const DashboardPage = async () => {
  return (
    <main className="min-h-screen bg-slate-50">
      <Suspense
        fallback={
          <p className="text-center text-2xl mt-12">Loading Dashboard...</p>
        }
      >
        <DashboardContent />
      </Suspense>
    </main>
  );
};

export default DashboardPage;
