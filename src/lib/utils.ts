import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { PlayerStatsAPIResponse } from "@/types/api/player-stats";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dateConversion(date: Date | string) {
  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const isGoalkeeper = (stats: Partial<PlayerStatsAPIResponse>) => {
  if (!stats.statistics || !Array.isArray(stats.statistics)) {
    return false;
  }
  return stats.statistics.some((stat) => stat.games.position === "Goalkeeper");
};

export const getAge = (birthDate: string) =>
  Math.floor(
    (new Date().getTime() - new Date(birthDate).getTime()) / 3.15576e10,
  );
