import { Redirect, Route, Switch } from "wouter";
import { GuardianRoute } from "./GuardianRoute";
import DashboardLayout from "@/components/templates/DashboardLayout";
import RequestReception from "@/pages/dashboard/RequestReception";
import DriverStatus from "@/pages/dashboard/DriverStatus";
import TripPlanning from "@/pages/dashboard/TripPlanning";
import TripHistory from "@/pages/dashboard/TripHistory";
import DriversManagement from "@/pages/dashboard/DriversManagement";
import UserManagement from "@/pages/dashboard/UserManagement";
import { PATH } from "@/lib/constants/route_path";
import Tracking from "@/pages/dashboard/Tracking";

export default function DashboardRoutes() {
  return (
    <GuardianRoute>
      <DashboardLayout>
        <Switch>
          <Route
            path={`${PATH.DASHBOARD}/request-reception`}
            component={RequestReception}
          />
          <Route path={`${PATH.DASHBOARD}/tracking`} component={Tracking} />
          <Route
            path={`${PATH.DASHBOARD}/driver-status`}
            component={DriverStatus}
          />
          <Route
            path={`${PATH.DASHBOARD}/trip-planning`}
            component={TripPlanning}
          />
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
            <Redirect to={`${PATH.DASHBOARD}/driver-status`} />{" "}
            {/* Redirige a una ruta válida */}
          </Route>
        </Switch>
      </DashboardLayout>
    </GuardianRoute>
  );
}
