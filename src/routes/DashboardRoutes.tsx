import { Redirect, Route, Switch } from "wouter";
import { GuardianRoute } from "./GuardianRoute";
import DashboardLayout from "@/components/templates/DashboardLayout";
import UserManagement from "@/pages/dashboard/UserManagement";
import { PATH } from "@/lib/constants/route_path";
import Tracking from "@/pages/dashboard/Tracking";
import DriversManagement from "@/pages/dashboard/DriversManagement";
import RequestTaxi from "@/pages/dashboard/RequestTaxi";
import TripHistory from "@/pages/dashboard/TripHistory";
import RequestCourier from "@/pages/dashboard/RequestCourier";
import RequestTaxiExpress from "@/pages/dashboard/RequestTaxiExpress";

export default function DashboardRoutes() {
  return (
    <GuardianRoute>
      <DashboardLayout>
        <Switch>
          <Route
            path={`${PATH.DASHBOARD}/request-taxi`}
            component={RequestTaxi}
          />
          <Route
            path={`${PATH.DASHBOARD}/request-courier`}
            component={RequestCourier}
          />
          <Route
            path={`${PATH.DASHBOARD}/request-taxi-express`}
            component={RequestTaxiExpress}
          />
          <Route path={`${PATH.DASHBOARD}/tracking`} component={Tracking} />
          <Route
            path={`${PATH.DASHBOARD}/trip-history`}
            component={TripHistory}
          />
          <Route
            path={`${PATH.DASHBOARD}/drivers-management`}
            component={DriversManagement}
          />
          <Route
            path={`${PATH.DASHBOARD}/users-management`}
            component={UserManagement}
          />
          <Route>
            <Redirect to={`${PATH.DASHBOARD}/request-taxi`} />
            {/* Redirige a una ruta válida */}
          </Route>
        </Switch>
      </DashboardLayout>
    </GuardianRoute>
  );
}
