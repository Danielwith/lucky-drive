import { MapViewerTypes } from "@/lib/types/types";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/images/marker-icon-2x.png",
  iconUrl: "/images/marker-icon.png",
  shadowUrl: "/images/marker-shadow.png",
});

export const AppMapViewer: React.FC<MapViewerTypes.MapViewerProps> = ({
  center = [0, 0],
  zoom = 2,
  markers = [],
  mapProps = {},
}) => {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{
        width: "inherit",
        height: "100%",
        position: "absolute",
        overflow: "hidden",
      }}
      scrollWheelZoom
      zoomControl={false}
      {...mapProps}
    >
      <TileLayer
        attribution=""
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {markers.map((m, idx) => (
        <Marker key={idx} position={[m.lat, m.lng]}>
          {m.popupText && <Popup>{m.popupText}</Popup>}
        </Marker>
      ))}
    </MapContainer>
  );
};
