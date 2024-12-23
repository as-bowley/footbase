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
import { Home, Star, Users, Trophy } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import useThemeStore from "@/stores/themeStore";
import React from "react";

const navItems = [
  { icon: Home, label: "Home", url: "/" },
  { icon: Star, label: "Favourites", url: "/favourites" },
  { icon: Users, label: "Players", url: "/players" },
  { icon: Trophy, label: "Teams", url: "/teams" },
];

export function AppSidebar() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <Sidebar>
      <SidebarHeader className="mb-8">
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
      <SidebarFooter className="flex flex-row items-center">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="w-full">
              <Avatar className="mr-2 h-6 w-6">
                <AvatarImage src="/avatars/user.png" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <span className="flex-grow text-left">John Doe</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <Switch
          checked={theme === "dark"}
          onCheckedChange={toggleTheme}
        ></Switch>
      </SidebarFooter>
    </Sidebar>
  );
}
