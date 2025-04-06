import { Redirect, Route, Switch } from "wouter"
import Login from "@/pages/Login"
import DashboardRoutes from "./DashboardRoutes"
import { PATH } from "@/lib/constants/route_path"

export default function App() {
  return (
    <Switch>
      {/* Rutas públicas */}
      <Route path={`${PATH.LOGIN}`} component={Login} />

      {/* Rutas protegidas */}
      <Route path={`${PATH.DASHBOARD}/:rest*`}>
        <DashboardRoutes />
      </Route>

      <Route>
        <Redirect to="/login" />
      </Route>
    </Switch>
  )
}
