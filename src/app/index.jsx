import "../App.css";
import React from "react";
import { AppProvider } from "./provider";
import { AppRouter } from "./router";
import { Toaster } from "@/components/ui/toaster";

const App = () => {
  return (
    <AppProvider>
      <AppRouter />
      <Toaster />
    </AppProvider>
  );
};

export default App;
