import { MapViewerTypes } from "@/lib/types/types";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MarkerIcon2x from "/assets/images/marker-icon-2x.png";
import MarkerIcon from "/assets/images/marker-icon.svg";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: MarkerIcon2x,
  iconUrl: MarkerIcon,
  shadowUrl: "",
  //   shadowUrl: "assets/images/marker-shadow.png",
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
      className="w-full h-full absolute overflow-hidden z-10 rounded-b-xl"
      scrollWheelZoom
      zoomControl={false}
      {...mapProps}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {markers.map((m, idx) => (
        <Marker key={idx} position={[m.lat, m.lng]}>
          {m.popupText && <Popup>{m.popupText}</Popup>}
        </Marker>
      ))}
    </MapContainer>

    // <APIProvider apiKey={import.meta.env.XPLORA_GOOGLE_MAPS_KEY}>
    //   <Map
    //     defaultZoom={13}
    //     center={center}
    //     onCameraChanged={(ev: MapCameraChangedEvent) =>
    //       console.log(
    //         "camera changed:",
    //         ev.detail.center,
    //         "zoom:",
    //         ev.detail.zoom
    //       )
    //     }
    //   ></Map>
    // </APIProvider>
  );
};
