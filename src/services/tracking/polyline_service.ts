/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { apiFetch } from "@/lib/helpers/ApiFetch";
import { ApiFetchTypes, GoogleMapViewerTypes } from "@/lib/types/types";

export namespace PolylineService {
  export const fetchPolylineVector = (pos: GoogleMapViewerTypes.Position[]) => {
    const endpoint: ApiFetchTypes.ApiEndpoint = {
      controller: "v1",
      method: `car/${pos
        .map((p) => `${p.lng},${p.lat}`)
        .join(";")}?overview=full&geometries=geojson`,
    };

    return apiFetch<any>(
      endpoint,
      {
        method: "GET",
        log: true,
      },
      import.meta.env.XPLORA_POLYLINE_URL
    );
  };
}
