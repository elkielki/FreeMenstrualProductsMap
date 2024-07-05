import React, { useState, useContext, useEffect } from 'react';
import {Button, Center, SimpleGrid, IconButton, HStack, VStack, Image, Menu, MenuButton, MenuList, MenuItem, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon,Text, Box, ButtonGroup, Flex} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import Axios from '../axiosSetup';
import EditLocationForm from './EditLocationForm';
import { UserContext } from '../context/userContext';
import MapView from './MapView';
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"; 
import padImg from '../assets/pad.png';
import tamponImg from '../assets/tampon.png';
import extraImg from '../assets/extra.png';

export default function StationItem({handleMapPin}) {
    const {
        user, setUser, 
        loggedIn, setLoggedIn, 
        stationList, setStationList
    } =  useContext(UserContext);

    const [currPosition, setCurrPosition] = useState(null);

    const handleDeleteStation = (stationName) => {
        Axios.put('/deleteStation', {name: stationName})
        .then(function(response) {
            setStationList((list) => list.filter((stat) => {
                return stat.locationName != stationName;
            }));
        }).catch(function (error) {
            console.log(error);
        })
    }

    return (
        !!stationList ?   
            (stationList.length == 0 ?
                <Text>No locations!</Text>
            :
                <Box>
                    <VStack marginY='1vh' overflowY='scroll' paddingY='1vh' width='90vw' height='50vh'>
                        {stationList.map((station, idx) => (
                            <Flex key={'stationList' + idx} justifyContent='space-between' paddingX='1vw' paddingY='1vh' borderRadius='10px' border='1px' borderColor='#EDF2F7' width='98%'>
                                <HStack>
                                    {loggedIn &&
                                        <Center>
                                            <EditLocationForm station={station} idx={idx} />
                                            <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteStation(station.locationName)} />
                                        </Center>        
                                    }
                                    <Text>{station.name}</Text>
                                </HStack>
                                <SimpleGrid columns={6}>
                                    <Center backgroundColor='#EDF2F7'  border='1px' borderColor='#EDF2F7' borderTopLeftRadius='10px' borderBottomLeftRadius='10px' paddingY='2px' paddingX='2px'>
                                        <Image src={padImg} alt='pad image' boxSize='38px' />
                                    </Center>
                                    <Center border='1px' borderColor='#EDF2F7' paddingY='2px' paddingX='2px'>
                                        <Text>{station.padQuantity}</Text>
                                    </Center>
                                    <Center backgroundColor='#EDF2F7'  border='1px' borderColor='#EDF2F7' paddingY='2px' paddingX='2px'>
                                        <Image src={tamponImg} alt='tampon image' boxSize='34px' />
                                    </Center>
                                    <Center border='1px' borderColor='#EDF2F7' paddingY='2px' paddingX='2px'>
                                        <Text>{station.tamponQuantity}</Text>
                                    </Center>
                                    <Center backgroundColor='#EDF2F7' border='1px' borderColor='#EDF2F7' paddingY='2px' paddingX='2px'>
                                        <Image src={extraImg} alt='Extra image' boxSize='34px' />
                                    </Center>
                                    <Center  border='1px' borderColor='#EDF2F7' borderTopRightRadius='10px' borderBottomRightRadius='10px' paddingY='2px' paddingX='2px'>
                                        <Text>{station.otherQuantity}</Text>
                                    </Center>
                                </SimpleGrid>
                            </Flex>
                        ))}
                    </VStack>    
                </Box>
            )
        :
        <Text>Please refresh this page.</Text>
    )
}

//<MapView coordinates={handleCurrPositionCallback} />
//<a href="https://www.flaticon.com/free-icons/menstrual-cycle" title="menstrual cycle icons">Menstrual cycle icons created by Soremba - Flaticon</a>
// <a href="https://www.flaticon.com/free-icons/tampon" title="tampon icons">Tampon icons created by Freepik - Flaticon</a>
//<a href="https://www.flaticon.com/free-icons/extra" title="extra icons">Extra icons created by Freepik - Flaticon</a>