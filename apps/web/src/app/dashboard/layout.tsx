import AppSidebar from "@/components/AppSidebar"
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
          {children}
          <Footer />
        </div>
      </SidebarProvider>
    </Protector>
  );
}