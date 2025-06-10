import { AppMapViewer } from "@/components/templates/AppMapViewer";
import { MapViewerTypes } from "@/lib/types/types";

export default function Tracking() {
  const center: [number, number] = [-12.0464, -77.0428];
  const zoom = 13;
  const markers: MapViewerTypes.MarkerData[] = [
    { lat: -12.0464, lng: -77.0428, popupText: "Aquí estoy 📍" },
    { lat: -12.05, lng: -77.03, popupText: "Otro punto" },
  ];
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <AppMapViewer center={center} zoom={zoom} markers={markers} />
    </div>
  );
}
