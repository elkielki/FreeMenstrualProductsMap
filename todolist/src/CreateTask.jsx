import React, { useState, useEffect, useContext } from 'react';
import Axios from './axiosSetup'
//import axios from "axios";
import {Input, Flex, HStack, Box, VStack, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Text, Menu, MenuItem, MenuButton, MenuList, Button, PopoverTrigger, Popover, PopoverBody, PopoverContent, PopoverArrow, PopoverCloseButton} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons'
import { UserContext } from '../context/userContext';
import {toast} from 'react-hot-toast'

function CreateTask({update}) {
    //const {user} = useContext(UserContext)
    const {user, setUser} = useContext(UserContext);
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
        const taskReq = await Axios.put(`/dashboard/newtask/${user.email}`, {
            id: user._id,
            todos: newTask,
        });
        if (taskReq.error) {    
            toast.error(taskReq.error);
        } else {
            setTask('');
            update(taskReq.data.todos);
        //    navigate('/dashboard')
        }
//        next();
    }

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
                                    {user.categories.map((cat, index) => 
                                        <MenuItem key={"categoryMenu: " + cat + ', ' + index} onClick={() => setCategory(cat)}>{cat}</MenuItem>
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


  /*  useEffect(() => {
        Axios.get('/getCategories')
        .then(result => {
            setCategories(result.data);
        })
        .catch(err => console.log(err))
    }, [])

    const handleAdd = (updater) => {
        Axios.post('/add', {
            task: task,
            category: category
        })
        .then(result => {
            updater(result.data);
            //location.reload()
        })
        .catch(err => console.log(err))
    }
*/

/* 

                                <MenuList minWidth='240px'>
                                    {user.categories.map((option, index) => 
                                        <MenuItem key={"categoryMenu: " + option.category + ', ' + index} onClick={() => setCategory(option.category)}>{option.category}</MenuItem>
                                    )}
                                </MenuList>

<Select 
                defaultValue={category} 
                onChange={setCategory}
                options={categories}
                getOptionLabel={(options) => options.label}
                getOptionValue={(options) => options.val}
                className="react-select" 
                classNamePrefix="react-select"
                styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      borderColor: state.isFocused ? 'grey' : 'red',
                    }),
                    input:(baseStyles) => ({
                        ...baseStyles,
                        color:'#000000',
                        opacity: '100%'
                        
                      }),
                  }}
            />  
*/
export default CreateTask;