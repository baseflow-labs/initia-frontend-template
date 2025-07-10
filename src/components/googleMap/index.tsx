import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { Fragment, useRef, useState } from "react";
import { LocationProps } from "../card/mapCard";

const containerStyle = {
  width: "100%",
  height: "500px",
  borderRadius: "1.5rem",
};

const MapWithMarkers = ({ locations }: { locations: LocationProps[] }) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [activeMarker, setActiveMarker] = useState<number | null>(null);

  const center = locations[0] || { lat: 0, lng: 0 };

  const onLoad = (map: google.maps.Map) => {
    mapRef.current = map;

    const bounds = new window.google.maps.LatLngBounds();
    locations.forEach((loc) =>
      bounds.extend({ lat: loc.latitude, lng: loc.longitude })
    );
    map.fitBounds(bounds);
  };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY!}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: center.latitude, lng: center.longitude }}
        zoom={10}
        onLoad={onLoad}
      >
        {locations.map((loc, index) => (
          <Marker
            key={index}
            position={{ lat: loc.latitude, lng: loc.longitude }}
            onClick={() => setActiveMarker(index)}
          >
            {activeMarker === index && (
              <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                <Fragment>
                  <strong>{loc.name}</strong>
                  <br />
                  <a
                    href={`tel:966${loc.phoneNumber}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {loc.phoneNumber}
                  </a>
                </Fragment>
              </InfoWindow>
            )}
          </Marker>
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapWithMarkers;
