import React, { useState } from "react";
import { Moon, Sun, Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import useThemeStore from "@/stores/themeStore";
import { Link, useLocation } from "react-router";
import apiService from "@/services/apiService";

const PLACEHOLDERS = {
  player: "Search for player by surname...",
  team: "Search for teams...",
  default: "Search...",
};

export function HeaderBar() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { theme, toggleTheme } = useThemeStore();
  const location = useLocation();
  const currentParentPath = location.pathname.split("/")[1];

  const shouldShowSearch =
    currentParentPath === "player" || currentParentPath === "team";

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    await apiService.searchPlayers(search).then((res) => {
      console.log(res);
      setSearchResults(res);
    });
  };

  return (
    <header className="flex items-center justify-between p-4 border-b sticky top-0 bg-background z-10">
      <div className="relative">
        <form onSubmit={handleSearch} className="flex-1 mr-4">
          {shouldShowSearch && (
            <div className="relative w-full">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder={PLACEHOLDERS[currentParentPath]}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 w-full max-w-sm"
              />
            </div>
          )}
        </form>
        <div className="absolute top-1/2">
          {searchResults &&
            searchResults.map((item) => (
              <Link
                to={{ pathname: `/player/${item?.player.id}` }}
                key={item?.player.id}
                className=" p-2 hover:bg-muted rounded flex items-center min-w-[200px] bg-white"
              >
                <img
                  src={item.player.photo}
                  alt={item.player.name}
                  className="size-8 mr-2"
                />
                <span>{item?.player.name}</span>
              </Link>
            ))}
        </div>
      </div>
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
