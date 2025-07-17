import { ThemeProvider } from "./components/theme-provider";
import { useAutoRefreshNavData } from "./lib/hooks/use-auto-refresh-nav";

import AppRoutes from "./routes/AppRoutes";
import Spinner from "./components/templates/generics/Spinner";

export default function App() {
  // Hooks
  useAutoRefreshNavData();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Spinner />
      <AppRoutes />
    </ThemeProvider>
  );
}
