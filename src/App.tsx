import { ThemeProvider } from "./components/theme-provider";
import { useAutoRefreshNavData } from "./lib/hooks/use-auto-refresh-nav";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  // Hooks
  useAutoRefreshNavData();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AppRoutes />
    </ThemeProvider>
  );
}
