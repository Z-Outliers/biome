import AppSidebar from "@/components/AppSidebar"
import Navbar from "@/components/Navbar"
import Protector from "@/components/Protector"
import { SidebarProvider } from "@/components/ui/sidebar"
import Footer from "@/screens/Landing/Footer"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Protector>
      <SidebarProvider>
        <div className="dashboard-theme flex w-full">
          <AppSidebar />
          <div className="flex-1 min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </div>
      </SidebarProvider>
    </Protector>
  );
}