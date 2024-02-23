import React from "react";
import HPlatform, { HMap, HMapCircle } from "react-here-map";

const Map = ({ lat, long, zoom = 10, radius = 10000 }) => {
  return (
    <HPlatform
      options={{
        apiKey: "TIAGlD6jic7l9Aa8Of8IFxo3EUemmcZlHm_agfAm6Ew", // Replace with your API key
        appId: "EF8K24SYpkpXUO9rkbfA", // Replace with your App ID
        includePlaces: false,
        includeUI: true,
        interactive: true,
        version: "v3/3.1",
      }}
    >
      <HMap
        options={{
          center: {
            lat,
            lng: long,
          },
        }}
        style={{
          height: "480px",
          width: "100%",
        }}
        useEvents
      >
        <HMapCircle
          coords={{
            lat,
            lng: long,
          }}
          options={{
            style: {
              fillColor: "rgba(0, 128, 0, 0.7)",
              lineWidth: 4,
              strokeColor: "rgba(55, 85, 170, 0.6)",
            },
          }}
          radius={radius}
          setVisibility
          zoom={zoom}
        />
      </HMap>
    </HPlatform>
  );
};

export default Map;
