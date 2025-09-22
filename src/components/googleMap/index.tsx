import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
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

    if (locations.length) {
      const center = {
        lat: locations[0].location.latitude,
        lng: locations[0].location.longitude,
      };
      map.setCenter(center);
    }
  };

  return (
    <Fragment>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY!}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{
            lat: center.location.latitude,
            lng: center.location.longitude,
          }}
          zoom={11}
          onLoad={onLoad}
        >
          {locations
            .sort((a, b) => {
              const dateA = new Date(`${a.date}T${a.time}`);
              const dateB = new Date(`${b.date}T${b.time}`);

              return dateA.getTime() - dateB.getTime();
            })
            .map((loc, index) => (
              <Marker
                key={index}
                position={{
                  lat: loc.location.latitude,
                  lng: loc.location.longitude,
                }}
                onClick={() => setActiveMarker(index)}
                label={{
                  text: String(index + 1),
                  color: "white",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                {activeMarker === index && (
                  <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                    <Fragment>
                      <small>
                        {loc.date} @ {loc.time}
                      </small>

                      <div>
                        <strong>{loc.name}</strong>
                      </div>

                      <a
                        href={`tel:966${loc.phoneNumber}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        966{loc.phoneNumber}
                      </a>
                    </Fragment>
                  </InfoWindow>
                )}
              </Marker>
            ))}
        </GoogleMap>
      </LoadScript>
    </Fragment>
  );
};

export default MapWithMarkers;
