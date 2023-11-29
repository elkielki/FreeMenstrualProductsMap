import React, { useState, useEffect, useContext } from 'react';
//import Axios from './axiosSetup'
//import axios from "axios";
import {Input, Flex, HStack, Box, VStack, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Text, Menu, MenuItem, MenuButton, MenuList, Button, PopoverTrigger, Popover, PopoverBody, PopoverContent, PopoverArrow, PopoverCloseButton} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons'
//import { UserContext } from '../context/userContext';
//import {toast} from 'react-hot-toast'

function DemoCreateTask({update, dataCategories}) {
    const [taskStr, setTask] = useState('');
    const [category, setCategory] = useState('Uncategorized');
//    const [categories, setCategories] = useState(user.categories);    
// !!!! have to set to automatically close popover

    const handleAdd = async () => {
        if (taskStr.length == 0) {
            return
        }
        const newTask = {
            task: taskStr,
            status: "Not Started",
            category: category
        }
        setTask('');
        update(newTask);
        //    navigate('/dashboard')
    }
//        next();

    return (
        <Popover className="create_form" allowToggle>
            <PopoverTrigger>
                <Button>Create Task</Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                    <VStack>
                        <HStack>
                            <Input type="text" placeholder='Enter Task' value={taskStr} onChange={(e) => setTask(e.target.value)} />
                            <Menu closeOnSelect={true}>
                                <MenuButton as={Button} colorScheme='blue' rightIcon={<ChevronDownIcon />}>
                                    {category}
                                </MenuButton>
                                <MenuList minWidth='240px'>
                                    {dataCategories.map((cat, index) => 
                                        <MenuItem key={"demoCategoryMenu: " + cat + ', ' + index} onClick={() => setCategory(cat)}>{cat}</MenuItem>
                                    )}
                                </MenuList>
                            </Menu>
                        </HStack>
                        <Button onClick={handleAdd}>Add</Button> 
                    </VStack>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}

export default DemoCreateTask;