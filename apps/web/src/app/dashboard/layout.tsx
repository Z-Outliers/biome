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
        <AppSidebar />
        <div>
          <Navbar />
          {children}
          <Footer />
        </div>
      </SidebarProvider>
    </Protector>
  );
}