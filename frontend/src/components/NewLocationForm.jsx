import React, {useState, useContext} from 'react';
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
    FormLabel,
    Input,
    NumberInput,
    NumberInputField,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInputStepper,
    Box,
    Flex,
    Button,
    useDisclosure,
    HStack,
    Center
} from '@chakra-ui/react'
import Axios from '../axiosSetup';
import { UserContext } from '../context/userContext';

export default function NewLocationForm() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [name, setName] = useState('');
    const [pads, setPads] = useState(0);
    const [tampons, setTampons] = useState(0);
    const [other, setOther] = useState(0);
    const [lat, setLat] = useState(0);
    const [long, setLong] = useState(0);
    const {
        user, setUser, 
        loggedIn, setLoggedIn, 
        stationList, setStationList
    } =  useContext(UserContext);

    const handleFormSubmit = () => {
        Axios.post('/addNewStation', {
            name: name, 
            pads: pads, 
            tampons: tampons, 
            other: other,
            lat: lat,
            long: long,
        })
        .then(res => {
            console.log("Hello");
            onClose();
            setName('');
            setPads(0);
            setTampons(0);
            setOther(0);
            setLat(0);
            setLong(0);
            setStationList([...stationList, res.data]);
        }).catch(err => console.log(err))
    }

    return (
        <Box>
            <Button onClick={onOpen}>Create</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Add New Period Product Station</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel>Location Name</FormLabel>
                        <FormHelperText>Location names must be unique.</FormHelperText>
                        <Input type='text' value={name} onChange={(e) => setName(e.target.value)} />
                        <Flex width='100%' justifyContent='space-between' marginTop='3px'>
                            <FormLabel>Latitude, Longitude</FormLabel>
                            <Center width='50%' justifyContent='end'>
                                <NumberInput max={90} min={-90} value={lat} onChange={(e) => setLat(e)} marginRight='4px'>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                                <NumberInput max={180} min={-180} value={long} onChange={(e) => setLong(e)}>
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