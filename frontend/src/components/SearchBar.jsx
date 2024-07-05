import React, { useContext, useState, useEffect, createContext } from 'react'
import { ChakraProvider, Flex, Icon, Heading, Input, Button, Box, Select, Text, IconButton, HStack, VStack, Menu, MenuButton, MenuList, MenuItem, MenuItemOption, MenuGroup, MenuDivider } from '@chakra-ui/react'
import { DeleteIcon, ChevronRightIcon, AddIcon, EditIcon } from '@chakra-ui/icons'
import Axios from '../axiosSetup';
import { UserContext } from '../context/userContext';

export default function SearchBar() {

    const {
        user, setUser, 
        loggedIn, setLoggedIn, 
        stationList, setStationList
    } =  useContext(UserContext);

    const handleInput = (val) => {
        if (val.length == 0) {
            Axios.get('/getStations')  
            .then(function (response) {
                setStationList(response.data);  
            })
            .catch(function (error) {
                console.log(error);
            })
        }
        else if (val.length > 2) {
            Axios.get('/getSearch', {params: {searchInput: val}})
            .then(function(response) {
                setStationList(response.data);
            }).catch(function (error) {
                console.log(error);
            })
        } else {
            return;
        }  
    }

    return (
        <Input placeholder='Search' onChange={(e) => handleInput(e.target.value)} />
    )
}