import { apiFetch } from "@/lib/helpers/ApiFetch";
import { ApiFetchTypes, DriversManagementTypes } from "@/lib/types/types";

export namespace DriverManagementService {
  export const fetchDriverManagementData = () => {
    const endpoint: ApiFetchTypes.ApiEndpoint = {
      controller: "Administrador",
      method: "listaConductor",
    };

    return apiFetch<any>(endpoint, {
      method: "GET",
      log: true,
    });
  };

  export const postInsertDriver = (form: DriversManagementTypes.form) => {
    const endpoint: ApiFetchTypes.ApiEndpoint = {
      controller: "Administrador",
      method: "insertarNuevoConductor",
    };

    return apiFetch<any>(endpoint, {
      method: "POST",
      body: form,
      log: true,
    });
  };
}
