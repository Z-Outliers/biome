"use client";
import { authClient } from "@repo/auth/client";
import { Calendar, Home, Inbox, LogOut, Search, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import logo from "@/assets/logo.svg"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Publications",
    url: "/dashboard/papers",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "/search",
    icon: Search,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export default function AppSidebar() {
  const session = authClient.useSession();
  const user = session?.data?.user;

  const handleLogout = async () => {
    await authClient.signOut();
  };

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-accent">
            <img src={logo} alt="BioMe Logo" width={40} height={40} />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-sidebar-foreground">
              BioMe
            </span>
            <span className="text-xs text-muted-foreground">
              Explore the Universe of Biology
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active = true; // TODO: handle active
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      className="data-[active=true]:border-l-2 data-[active=true]:border-[var(--primary)] data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground"
                    >
                      <a
                        href={item.url}
                        aria-current={active ? "page" : undefined}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {user && (
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  {user?.image ? (
                    <AvatarImage src={user?.image} alt={user.name} />
                  ) : (
                    <AvatarFallback className="rounded-lg">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full justify-start"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign out</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
