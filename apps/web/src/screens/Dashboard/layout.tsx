import { authClient } from "@repo/auth/client";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import LoadingOverlay from "@/components/LoadingOverlay";
import { SidebarProvider } from "@/components/ui/sidebar";
import Footer from "../LandingPage/Footer";
import AppSidebar from "./AppSidebar";
import Navbar from "./Navbar";

export default function DashboardLayout() {
  const { data: authData, isPending } = authClient.useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isPending && !authData?.user) navigate("/login");
  }, [isPending, authData?.user, navigate]);

  if (isPending)
    return (
      <LoadingOverlay
        show={true}
        fullscreen={true}
        text="Loading dashboard..."
      />
    );

  return (
    <SidebarProvider>
      <div className="dashboard-theme flex w-full">
        <AppSidebar />
        <div className="flex-1 min-h-screen flex flex-col">
          <Navbar />
          <div className="flex-1">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
}
