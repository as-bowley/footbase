import "../index.css";
import { AppProvider } from "./provider";
import { AppRouter } from "./router";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import useAuthStore from "@/stores/authStore";

const App = () => {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <AppProvider>
      <AppRouter />
      <Toaster />
    </AppProvider>
  );
};

export default App;
