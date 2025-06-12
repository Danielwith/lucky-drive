import { useAutoRefreshNavData } from "./lib/hooks/use-auto-refresh-nav";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  // Hooks
  useAutoRefreshNavData();

  return <AppRoutes />;
}
