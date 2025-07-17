import { Redirect, Route, Switch } from "wouter";
import Login from "@/pages/Login";
import DashboardRoutes from "./DashboardRoutes";
import { PATH } from "@/lib/constants/route_path";
import { useAuth } from "@/lib/hooks/use-auth";

export default function App() {
  const { isLoggedIn } = useAuth();
  return (
    <Switch>
      <Route path={PATH.LOGIN}>
        {isLoggedIn ? (
          <Redirect to={`${PATH.DASHBOARD}/request-reception`} />
        ) : (
          <Login />
        )}
      </Route>

      {/* Rutas protegidas */}
      <Route path={`${PATH.DASHBOARD}/:rest*`}>
        <DashboardRoutes />
      </Route>

      {/* Por defecto */}
      <Route>
        <Redirect
          to={isLoggedIn ? `${PATH.DASHBOARD}/request-reception` : PATH.LOGIN}
        />
      </Route>
    </Switch>
  );
}
