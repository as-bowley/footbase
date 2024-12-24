import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Home, Star, Users, Trophy, LogOut } from "lucide-react";
import React from "react";
import useAuthStore from "@/stores/authStore";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { icon: Home, label: "Home", url: "/" },
  { icon: Star, label: "Favourites", url: "/favourites" },
  { icon: Users, label: "Players", url: "/players" },
  { icon: Trophy, label: "Teams", url: "/teams" },
];

export function AppSidebar() {
  const { user, signOut } = useAuthStore();

  return (
    <aside aria-label="Sidebar Navigation">
      <Sidebar>
        <SidebarHeader className="mb-8 flex flex-row justify-between items-center">
          <h1 className="px-4 text-2xl font-bold">Footbase</h1>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu className="px-4">
            {navItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter
          className="flex flex-row items-center"
          aria-label="User Actions"
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start space-x-2"
              >
                <Avatar className="mr-2 h-6 w-6">
                  <AvatarImage src="/avatars/user.png" alt="User" />
                  <AvatarFallback>
                    {user?.email?.split("")[0].toUpperCase() ?? "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="flex-grow text-left">{user?.email}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem onClick={signOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </Sidebar>
    </aside>
  );
}
