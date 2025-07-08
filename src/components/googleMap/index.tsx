import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useRef } from "react";

type Location = {
  lat: number;
  lng: number;
};

const containerStyle = {
  width: "100%",
  height: "500px",
  borderRadius: "1.5rem",
};

const MapWithMarkers = ({ locations }: { locations: Location[] }) => {
  const mapRef = useRef<google.maps.Map | null>(null);

  const center = locations[0] || { lat: 0, lng: 0 };

  const onLoad = (map: google.maps.Map) => {
    mapRef.current = map;

    const bounds = new window.google.maps.LatLngBounds();
    locations.forEach((loc) => bounds.extend(loc));
    map.fitBounds(bounds);
  };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY!}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
      >
        {locations.map((loc, index) => (
          <Marker key={index} position={loc} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapWithMarkers;
