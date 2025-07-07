import { GoogleMapViewerTypes } from "@/lib/types/types";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

export const AppGoogleMapViewer: React.FC<
  GoogleMapViewerTypes.MapViewerProps
> = ({
  center = { lat: 0, lng: 0 },
  zoom = 2,
  markers = [],
  mapProps = {},
}) => {
  return (
    <APIProvider
      apiKey={import.meta.env.XPLORA_GOOGLE_MAPS_KEY}
      language="es-419"
    >
      <Map
        defaultZoom={zoom}
        defaultCenter={center}
        {...mapProps}
        renderingType="VECTOR"
      >
        {markers.map((m, i) => (
          <Marker key={i} position={m.position} title={m.popupText} />
        ))}
      </Map>
    </APIProvider>
  );
};
