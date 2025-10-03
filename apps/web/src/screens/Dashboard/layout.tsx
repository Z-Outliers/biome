import { SidebarProvider } from "@/components/ui/sidebar"
import { Outlet } from "react-router"
import Footer from "../LandingPage/Footer"
import AppSidebar from "./AppSidebar"
import Navbar from "./Navbar"

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className="dashboard-theme flex w-full">
        <AppSidebar />
        <div className="flex-1 min-h-screen flex flex-col">
          <Navbar />
          <div className="flex-1"><Outlet /></div>
        <Footer />
      </div>
    </div>
  </SidebarProvider>)
}