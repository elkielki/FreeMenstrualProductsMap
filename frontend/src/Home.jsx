import React, { useContext, useState, useEffect, createContext } from 'react'
import { ChakraProvider, Center, Flex, ButtonGroup, Spacer, Icon, Heading, Input, Button, Box, Select, Text, IconButton, HStack, VStack, Menu, MenuButton, MenuList, MenuItem, MenuItemOption, MenuGroup, MenuDivider } from '@chakra-ui/react'
import { DeleteIcon, ChevronRightIcon, ChevronDownIcon, AddIcon, EditIcon } from '@chakra-ui/icons'
import theme from './theme/Theme';
import { useNavigate } from "react-router-dom";
import { FaFilter, FaCheckCircle, FaClock } from "react-icons/fa";
import Axios from './axiosSetup';
import Logout from './components/Logout';
import { UserContext } from './context/userContext';
import NewLocationForm from './components/NewLocationForm';
import StationList from './components/StationList';
import MapView from './components/MapView';
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import SearchBar from './components/SearchBar';

export default function Home() {
    const {
        user, setUser, 
        loggedIn, setLoggedIn, 
        stationList, setStationList
    } =  useContext(UserContext);

    const [currPosition, setCurrPosition] = useState(null);
    const [viewName, setViewName] = useState('Map View');

    const navigate = useNavigate();

    const handleRegisterPage = () => {
        navigate('/register');
    }

    const handleLoginPage = () => {
        navigate('/login');
    }

    const handleCurrPositionCallback = (coords) => {
        setCurrPosition(coords);
    }

   /* const map = useMap();
    const showMapPin = (coordArray) => {
        console.log('Hello');
        map.flyTo([coordArray[1], coordArray[0]], map.getZoom());
    } */

    const switchViewButton = () => {
        if (viewName == 'Map View') {
            setViewName('List View');
        } else {
            setViewName('Map View');
        }
    }

    const sortAlphabetical = () => {
        Axios.get('/sortAlphabetical')
        .then(function(response) {
            setStationList(response.data);
            console.log("data: " + JSON.stringify(response.data));
        }).catch(function (error) {
            console.log(error);
        })
    }

    const sortDistance = () => {
        Axios.get('/sortDistance', {params: {long: currPosition.lng, lat: currPosition.lat}})
        .then(function(response) {
            setStationList(response.data);
        }).catch(function (error) {
            console.log(error);
        })
    }

    return (
        <Center>
            <VStack>
                <HStack width='90vw' justifyContent='end' marginTop='1vh'>
                    {!loggedIn && <Button onClick={handleRegisterPage}>Register</Button>}
                    {!loggedIn && <Button onClick={handleLoginPage}>Login</Button>}
                    {loggedIn && <Logout />}
                </HStack>
                {loggedIn && 
                    <Flex justifyContent='space-between' width='90vw' marginTop='3vh'>    
                            <Menu>
                                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                                    Sort
                                </MenuButton>
                                <MenuList>
                                    <MenuItem onClick={sortAlphabetical}>Alphabetical</MenuItem>
                                    <MenuItem onClick={sortDistance}>Distance</MenuItem>
                                </MenuList>
                            </Menu>
                            <NewLocationForm />
                        
                    </Flex>
                }
                <SearchBar />
                <StationList />
                <MapView coordinates={handleCurrPositionCallback} />
            </VStack>
        </Center>
    )
}
/*
            {viewName == 'Map View' ? 
                <StationList handleMapPin={showMapPin} />
            :
                <MapView coordinates={handleCurrPositionCallback} />
            }    

*/




























   /* useEffect(() => {
        Axios.get('/get')
        .then(result => setTodos(result.data))
        .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        Axios.get('/getCategories')
        .then(result => setCategories(result.data))
        .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        Axios.get('/getFilter')
        .then(result => setFilter(result.data))
        .catch(err => console.log(err))
    }, [])
/*
    const handleCategoriesState = (newCategory) => {
        let newList = categories.push(newCategory);
        setCategories(newList);
    }

    const handleNewTask = (newTask) => {
        let newTodos = [...todos]
        newTodos = newTodos.push(newTask);
        setTodos(newTodos);
    }

    const handleStatusChange = (event, index) => {
        let newStatus = '';
        if (event.target.value === 'option3') {
            newStatus = "Completed";
        }
        else if (event.target.value === 'option2') {
            newStatus = "In Progress";
        }
        else {
            newStatus = "Not Started";
        }
        Axios.put(`/update/${todos[index]._id}`, {
            status: newStatus,
            category: todos[index].category
        })
        .then(result => {
            location.reload()
        })
        .catch(err => console.log(err))
    }

/*    const handleEditTask = (event, index) => {
        axios.put(`http://localhost:5173/update/${todos[index]._id}`, {
            task: event.target.value,
            status: todos[index].status,
            category: todos[index].category
        })
        .then(result => {
            location.reload()
        })
        .catch(err => console.log(err))        
    }  

    const handleDelete = (id) => {
        Axios.delete('/delete/' + id)
        .then(result => {
            setTodos(result.data)
            console.log(result.data);
        })
        .catch(err => console.log(err))
    }
    
    const handleFilter = () => {
        Axios.put('/updateFilter'), {
            filter: !filter,
        }
        .then(result => {
            location.reload()
        })
        .catch(err => console.log(err))
    }

    const handleDeleteCategory = (index) => {
        Axios.delete('/deleteCategory/' + categories[index]._id)
        .then(result => {
            
            // create a modal that asks to delete all tasks or just the category
            location.reload()
        })
        .catch(err => console.log(err))
    }
*/
    // <ThemeContext.Provider value={todos}>
/*
categories.map((category, index) => (
                        <VStack key={"demoFilterCategory: " + category.category + ', ' + index}>
                            <Box onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} >
                                <Text>{category.category}</Text>
                                {hover && <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteCategory(category)} />}
                            </Box>
                            {Object.values(todos).filter((element) => (element.category === category.category)).map((todo, index) => (
                                <Task 
                                    key={"demoCategorized" + index} 
                                    onClick={() => handleDelete(todo)} 
                                    onChange={(ev) => handleStatusChange(ev, index)} 
                                    value={todo.status} 
                                    task={todo.task}
                                />
                            ))}
                        </VStack>
                    ))




<HStack key={"todolistcategorized" + index}>
                                            <Text>{todo.task}</Text>
                                            <Select  value={todo.status} onChange={(ev) => handleStatusChange(ev, index)}>
                                                <option value='option1'>Not Started</option>
                                                <option value='option2'>In Progress</option>
                                                <option value='option3'>Completed</option>
                                            </Select>
                                            <IconButton icon={<DeleteIcon />} onClick={() => handleDelete(todo._id)} />
                                    </HStack>



:
                        todos.map((todo, index) => (
                            <Box className="task" key={"todolistuncategorized" + index}>
                                <Flex>
                                    <Text fontSize="lg" mb="5"> {todo.task} </Text>
                                    <Select placeholder={todo.status} value={todo.status} onChange={(ev) => handleStatusChange(ev, index)}>
                                            <option value='option1'>Not Started</option>
                                            <option value='option2'>In Progress</option>
                                            <option value='option3'>Completed</option>
                                    </Select>
                                    <IconButton icon={<DeleteIcon />} onClick={() => handleDelete(todo._id)} />
                                </Flex>

                            </Box>
                        ))





                                <Modal isOpen={isOpen} onClose={onClose}>
                                    <ModalOverlay />
                                    <ModalContent>
                                    <ModalHeader>Edit</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        { onSubmit can be used to post the updated data to the server. }
                                        <HStack>
                                            <Editable defaultValue={todo.task} startWithEditView={true} onChange={(ev) => set} >
                                                <EditablePreview />
                                                <EditableInput />
                                            </Editable>    
                                        </HStack>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button mr={3} onClick={onClose}>
                                        Close
                                        </Button>
                                        <Button variant="ghost">Update</Button>
                                    </ModalFooter>
                                    </ModalContent>
                                </Modal>










                        <Button
                            mt={4}
                            colorScheme='blue'
                            onClick={(e) handleNewCategory}
                        >
                            Submit
                        </Button>


<Calendar view='month' onClickDay={formatDayHeader} />
<IconButton icon={<AddIcon />} aria-label='New Task'> </IconButton>



<Checkbox
                                isChecked={todo.status}
                                onChange={() => handleStatusChange(index)}>
                                <Text
                                  as={todo.done ? 's' : '' }>
                                    {todo.task}
                                </Text>
                                <IconButton aria-label='Delete Task' icon={<DeleteIcon />} onClick={() => handleDelete(todo._id)} />
                            </Checkbox>
                            */