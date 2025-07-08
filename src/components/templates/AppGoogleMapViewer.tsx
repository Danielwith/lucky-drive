import { GoogleMapViewerTypes, TaskBoardTypes } from "@/lib/types/types";
import {
  GoogleMap,
  GoogleMapApiLoader,
  Marker,
  Polyline,
} from "react-google-map-wrapper";

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
            icon={getColoredMarker(m.color)}
          />
        ))}
      </GoogleMap>
    </GoogleMapApiLoader>
  );
};

function getColoredMarker(status: TaskBoardTypes.TaskStatus) {
  const StatusColor: Record<TaskBoardTypes.TaskStatus, string> = {
    Pendiente: "#C00F0C",
    "En curso": "#E8B931",
    Terminados: "#14AE5C",
  };

  const fill = StatusColor[status] || "#000000";

  const svg = `
  <svg width="53" height="67" viewBox="0 0 53 67" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_dd_64308_15734)">
      <path
        d="M26.4583 53.1667C25.9431 53.1667 25.5014 53.0194 25.1333 52.725C24.7653 52.4306 24.4892 52.0441 24.3052 51.5656C23.6059 49.5045 22.7226 47.5722 21.6552 45.7687C20.6247 43.9653 19.1708 41.849 17.2938 39.4198C15.4167 36.9906 13.8892 34.6719 12.7115 32.4635C11.5705 30.2552 11 27.5868 11 24.4583C11 20.1521 12.4906 16.5083 15.4719 13.5271C18.4899 10.509 22.1521 9 26.4583 9C30.7646 9 34.4083 10.509 37.3896 13.5271C40.4076 16.5083 41.9167 20.1521 41.9167 24.4583C41.9167 27.8076 41.2726 30.6049 39.9844 32.85C38.733 35.0583 37.2792 37.2483 35.6229 39.4198C33.6354 42.0698 32.1264 44.2781 31.0958 46.0448C30.1021 47.7747 29.274 49.6149 28.6115 51.5656C28.4274 52.0809 28.133 52.4858 27.7281 52.7802C27.3601 53.0378 26.9368 53.1667 26.4583 53.1667Z"
        fill="${fill}"
      />
      <path
        d="M26.458 7.5C31.1585 7.5 35.1892 9.1645 38.457 12.4727H38.4561C41.7558 15.7382 43.4169 19.7637 43.417 24.458C43.417 27.9909 42.7368 31.0605 41.2881 33.5889L41.2891 33.5898C40.0037 35.858 38.5134 38.1002 36.8223 40.3184L36.8232 40.3193C34.852 42.9476 33.3809 45.1048 32.3916 46.8008C31.45 48.4411 30.6634 50.1895 30.0322 52.0479L30.0283 52.0596L30.0244 52.0703C29.7488 52.8421 29.2819 53.5047 28.6104 53.9932L28.5996 54.001L28.5879 54.0088C27.951 54.4546 27.223 54.667 26.458 54.667C25.6361 54.6669 24.8555 54.4238 24.1963 53.8965C23.6026 53.4216 23.1762 52.8086 22.9053 52.1045L22.8945 52.0762L22.8848 52.0479C22.2175 50.0813 21.3767 48.2439 20.3643 46.5332L20.3584 46.5225L20.3525 46.5127C19.3685 44.7906 17.959 42.7343 16.1064 40.3369C14.1891 37.8556 12.6127 35.4657 11.3877 33.1689L11.3838 33.1611L11.3789 33.1523C10.1032 30.6832 9.5 27.7655 9.5 24.458C9.50008 19.7637 11.1421 15.7359 14.4111 12.4668C17.7132 9.16471 21.7581 7.50008 26.458 7.5ZM26.458 20.4375C25.2994 20.4376 24.3781 20.8211 23.5996 21.5996C22.8211 22.3781 22.4376 23.2994 22.4375 24.458C22.4375 25.6168 22.8211 26.5388 23.5996 27.3174C24.3781 28.0958 25.2995 28.4794 26.458 28.4795C27.6168 28.4795 28.5388 28.0959 29.3174 27.3174C30.0959 26.5388 30.4795 25.6168 30.4795 24.458C30.4794 23.2995 30.0958 22.3781 29.3174 21.5996C28.5388 20.8211 27.6168 20.4375 26.458 20.4375Z"
        stroke="white"
        stroke-width="3"
      />
    </g>
    <defs>
      <filter id="filter0_dd_64308_15734" x="0" y="0" width="52.9165" height="66.166" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feMorphology radius="2" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_64308_15734"/>
        <feOffset dy="2"/>
        <feGaussianBlur stdDeviation="3"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_64308_15734"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="1"/>
        <feGaussianBlur stdDeviation="1"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"/>
        <feBlend mode="normal" in2="effect1_dropShadow_64308_15734" result="effect2_dropShadow_64308_15734"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_64308_15734" result="shape"/>
      </filter>
    </defs>
  </svg>
`.trim();

  return {
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
    // Punto de anclaje (el “cono” está en la punta)
    anchor: { x: 53 / 2, y: 67 },
    // scaledSize en píxeles
    scaledSize: { width: 50, height: 90 },
  } as google.maps.Icon;
}
