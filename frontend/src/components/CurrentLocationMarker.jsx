import React, { useEffect, useState } from "react";
import { Text } from '@chakra-ui/react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

export default function CurrentLocationMarker({coordinates}) {
    const [position, setPosition] = useState(null);
//    const [bbox, setBbox] = useState([]);

    const map = useMap();

    useEffect(() => {
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        coordinates(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
        const radius = e.accuracy;
        const circle = L.circle(e.latlng, {radius: radius});
        circle.addTo(map);
    //    setBbox(e.bounds.toBBoxString().split(","));
      });
    }, [map]);
// icon={icon}
    return position === null ? null : (
      <Marker position={position} >
        <Popup>
            <Text>Current Location</Text>
        </Popup>
      </Marker>
    );
}