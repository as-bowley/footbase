import React, { useState } from "react";
import { Moon, Sun, Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import useThemeStore from "@/stores/themeStore";

export function HeaderBar() {
  const [search, setSearch] = useState("");
  const { theme, toggleTheme } = useThemeStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", search);
  };

  return (
    <header className="flex items-center justify-between p-4 border-b">
      <form onSubmit={handleSearch} className="flex-1 mr-4">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 w-full max-w-sm"
          />
        </div>
      </form>
      <div className="flex items-center space-x-2">
        <Sun className="h-4 w-4 text-muted-foreground" />
        <Switch
          checked={theme === "dark"}
          onCheckedChange={toggleTheme}
        ></Switch>
        <Moon className="h-4 w-4 text-muted-foreground" />
      </div>
    </header>
  );
}
