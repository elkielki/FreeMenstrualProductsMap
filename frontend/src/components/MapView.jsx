import React, { useState, useEffect, useContext } from 'react';
import {Button, HStack, VStack, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon,Text, Box, ButtonGroup} from '@chakra-ui/react';
import Axios from '../axiosSetup';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { UserContext } from '../context/userContext';
import { useNavigate } from "react-router-dom";
import EditLocationForm from './EditLocationForm';
import CurrentLocationMarker from './CurrentLocationMarker';
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch';
import MapSearchBar from './MapSearchBar';

export default function MapView({coordinates}) {
    const {
        user, setUser, 
        loggedIn, setLoggedIn, 
        stationList, setStationList
    } =  useContext(UserContext);

    return (
            <Box height='40vh' width='90vw' marginBottom='2vh'>
                <MapContainer center={[32.88103, -117.23758]} zoom={70} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MapSearchBar />
                    {stationList.map((station, idx) => (
                        <Marker key={'mapMarker' + idx} position={[station.location.coordinates[1], station.location.coordinates[0]]}>
                            <Popup>
                                <Text>{station.locationName}</Text>
                            </Popup>
                        </Marker>
                    ))}
                    
                </MapContainer>
            </Box>
    )
}


/*
<CurrentLocationMarker coordinates={coordinates} />


<HStack>
                                <Text>Pads</Text>
                                <Text>{station.padQuantity}</Text>
                                <Text>Tampons</Text>
                                <Text>{station.tamponQuantity}</Text>
                                <Text>Other</Text>
                                <Text>{station.otherQuantity}</Text>
                            </HStack>
*/