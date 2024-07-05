import React, { useState, useEffect, useContext } from 'react';
import {    
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader, 
    ModalFooter, 
    ModalBody, 
    ModalCloseButton,
    FormControl,
    FormHelperText,
    FormErrorMessage,
    FormLabel,
    Input,
    NumberInput,
    NumberInputField,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInputStepper,
    Box,
    Center,
    Flex,
    Button,
    useDisclosure,
    HStack,
    IconButton
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import Axios from '../axiosSetup';
import { UserContext } from '../context/userContext';

export default function EditLocationForm({station, idx}) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [pads, setPads] = useState(station.padQuantity);
    const [tampons, setTampons] = useState(station.tamponQuantity);
    const [other, setOther] = useState(station.otherQuantity);

    const {
        user, setUser, 
        loggedIn, setLoggedIn, 
        stationList, setStationList
    } =  useContext(UserContext);

    const handleFormSubmit = () => {
        Axios.put('/editStation', {
            name: station.name,
            pads: pads, 
            tampons: tampons, 
            other: other,
        })
        .then(res => {
            onClose();
            setStationList((prevList) => 
                prevList.map(stat => {
                    if (stat.name == station.name) {
                        return res.data;
                    } else {
                        return stat;
                    }
                }
            ))
            setPads(res.data.padQuantity);
            setTampons(res.data.tamponQuantity);
            setOther(res.data.otherQuantity);
            setInvalid(false);
        }).catch(err => console.log(err))
    }

    return (
        <Box>
            <IconButton icon={<EditIcon />} onClick={onOpen} />
            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Edit Period Product Station</ModalHeader>
                <ModalCloseButton />
                <ModalBody >
                    <FormControl>
                        <FormHelperText>Location names and coordinates cannot be edited.<br/>The max quantity for each product is 1000.</FormHelperText>
                        <FormLabel>Location Name</FormLabel>
                        <Input type='text' value={station.name} disabled />
                        <Flex width='100%' justifyContent='space-between' marginTop='3px'>
                            <FormLabel>Latitude, Longitude</FormLabel>
                            <Center width='50%' justifyContent='end'>
                                <NumberInput max={90} min={-90} value={station.location.coordinates[1]} disabled marginRight='4px'>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                                <NumberInput max={180} min={-180} value={station.location.coordinates[0]} disabled >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </Center>
                        </Flex>
                        <Flex width='100%' justifyContent='space-between' marginTop='3px'>
                            <FormLabel>Pad Quantity</FormLabel>
                            <NumberInput max={1000} min={0} value={pads} onChange={(e) => setPads(e)} width='25%'>
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </Flex>
                        <Flex width='100%' justifyContent='space-between' marginTop='3px'>
                            <FormLabel>Tampon Quantity</FormLabel>
                            <NumberInput max={1000} min={0} value={tampons} onChange={(e) => setTampons(e)} width='25%'>
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </Flex>
                        <Flex width='100%' justifyContent='space-between' marginTop='3px'>
                            <FormLabel>Other Quantity</FormLabel>
                            <NumberInput max={1000} min={0} value={other} onChange={(e) => setOther(e)} width='25%'>
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </Flex>
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={handleFormSubmit} variant='ghost'>Submit</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}