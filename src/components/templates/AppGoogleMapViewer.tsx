import { GoogleMapViewerTypes } from "@/lib/types/types";
import {
  GoogleMap,
  GoogleMapApiLoader,
  Marker,
  Polyline,
} from "react-google-map-wrapper";
import taxiSVG from "/assets/icon/taxi_ico.svg?raw";
import expressTaxiSVG from "/assets/icon/ex_taxi_ico.svg?raw";
import courierSVG from "/assets/icon/courier_ico.svg?raw";

// https://pyjun01.github.io/react-google-map-wrapper/docs/installation/
export const AppGoogleMapViewer: React.FC<
  GoogleMapViewerTypes.MapViewerProps
> = ({
  center = { lat: 0, lng: 0 },
  zoom = 2,
  markers = [],
  mapProps = {},
  polyline = [],
}) => {
  return (
    <GoogleMapApiLoader
      apiKey={import.meta.env.XPLORA_GOOGLE_MAPS_KEY}
      language="es-419"
    >
      <GoogleMap
        className="h-full"
        initialZoom={zoom}
        initialCenter={center}
        {...mapProps}
      >
        <Polyline
          path={polyline}
          strokeColor="#FF0000"
          strokeOpacity={0.7}
          strokeWeight={3}
          geodesic
        />
        {markers.map((m, i) => (
          <Marker
            key={i}
            lat={m.position.lat}
            lng={m.position.lng}
            title={m.popupText}
            icon={getMarkerIcon(m)}
          />
        ))}
      </GoogleMap>
    </GoogleMapApiLoader>
  );
};

function getMarkerIcon(data: GoogleMapViewerTypes.MarkerData) {
  // const StatusColor: Record<TaskBoardTypes.TaskStatus, string> = {
  //   Pendiente: "#C00F0C",
  //   "En curso": "#E8B931",
  //   Terminados: "#14AE5C",
  // };

  const SVGIcon: Record<GoogleMapViewerTypes.MarkerType, string> = {
    Taxi: taxiSVG,
    Courier: courierSVG,
    "Taxi express": expressTaxiSVG,
  };

  // const fill = StatusColor[data.color] || "#000000";
  const fill = "#6750A4";
  const icon = SVGIcon[data.mode];

  const svg = `
<svg width="60" height="75" viewBox="0 0 60 75" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_dd_64648_16318)">
<rect x="11" y="7" width="38" height="38" rx="19" fill="${fill}"/>
<path d="M32.5981 58.5C31.4434 60.5 28.5566 60.5 27.4019 58.5L12.6795 33C11.5248 31 12.9682 28.5 15.2776 28.5L44.7224 28.5C47.0318 28.5 48.4752 31 47.3205 33L32.5981 58.5Z" fill="${fill}"/>
</g>
<text
    x="50%"
    y="26"
    text-anchor="middle"
    dominant-baseline="middle"
    alignment-baseline="middle"
    fill="white"
    font-size="14"
    font-family="Arial, sans-serif"
    font-weight="bold"
  >
    ${data.popupText}
</text>
<g transform="translate(0, 60) scale(0.15)">
    ${icon}
  </g>
<defs>
<filter id="filter0_dd_64648_16318" x="0" y="0" width="60" height="75" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="1.5"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_64648_16318"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feMorphology radius="3" operator="dilate" in="SourceAlpha" result="effect2_dropShadow_64648_16318"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="4"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
<feBlend mode="normal" in2="effect1_dropShadow_64648_16318" result="effect2_dropShadow_64648_16318"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_64648_16318" result="shape"/>
</filter>
</defs>
</svg>
  `.trim();

  return {
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
    anchor: { x: 25, y: 75 },
    scaledSize: { width: 50, height: 120 },
  } as google.maps.Icon;
}
