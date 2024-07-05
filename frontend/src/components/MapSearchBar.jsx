import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch';
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import "leaflet-geosearch/dist/geosearch.umd.js";

export default function MapSearchBar() {
    const map = useMap();

    useEffect(() => {
        const provider = new OpenStreetMapProvider();

        const searchControl = new GeoSearchControl({
            provider: provider,
            style: "bar",
            autoClose: true,
            autoComplete: true,
            autoCompleteDelay: 250, 
            notFoundMessage: 'Sorry, that address could not be found.',
        });

        map.addControl(searchControl);

        return () => map.removeControl(searchControl);
    }, []);

    return null;
}