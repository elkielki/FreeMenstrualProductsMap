import React, { useState, useEffect, createContext } from 'react'
import { BsCircleFill, BsFillTrashFill, BsFillCheckCircleFill } from "react-icons/bs"
import { ChakraProvider, Flex, Button, Box, Select, Text, IconButton, HStack, VStack, Menu, MenuButton, MenuList, MenuItem, MenuItemOption, MenuGroup, MenuDivider } from '@chakra-ui/react'
import { DeleteIcon, ChevronRightIcon, AddIcon, EditIcon } from '@chakra-ui/icons'
import Task from './Task';
import DemoCreateCategory from './demo/demoCreateCategory';
import DemoCreateTask from './demo/demoCreateTask';
import theme from './Theme';
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    const [todos, setTodos] = useState([
        {
            task: 'Call mom',
            status: 'Not Started',
            category: 'Uncategorized',
        }, 
        {
            task: 'Edit presentation',
            status: 'In Progress',
            category: 'Work',
        }, 
        {
            task: 'Send emails about upcoming meeting',
            status: 'Not Started',
            category: 'Work',
        }, 
        {
            task: 'Buy some more yarn',
            status: 'Completed',
            category: 'Hobbies',
        }, 

    ]);
    const [categories, setCategories] = useState(['Uncategorized', 'Hobbies', 'Work']);
    const [filter, setFilter] = useState(false);
    const [hover, setHover] = useState(false);
    
    const demoCallbackNewCat = (newCategory) => {
        setCategories([...categories, newCategory]);
    }

    const demoCallbackNewTodos = (newTask) => {
        setTodos([...todos, newTask]);
    }

// edit all the errors to toast.error 
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
        let updatedList = [...todos];
        let updatedElement = {...todos[index], status: newStatus};
        updatedList[index] = updatedElement;
        setTodos({updatedList});
    }

    const handleDelete = (task) => {
        setTodos(todos.filter(function(todo) {
            return todo !== task
        }));
    }

    const handleDeleteCategory = (cat) => {
        setCategories(categories.filter(function(element) {
            return element !== cat
        }));
    } 

    const handleRegisterPage = () => {
        navigate('/register')
    }

    const handleLoginPage = () => {
        navigate('/login')
    }

    return (
        <ChakraProvider theme={theme} >
            <VStack>
                <HStack>
                    <Button onClick={handleRegisterPage}>Register</Button>
                    <Button onClick={handleLoginPage}>Login</Button>
                </HStack>
                <h2>Todo List</h2>
                <h2>{'filter' + filter}</h2>
                <Button onClick={() => setFilter(!filter)}>Filter</Button>
                
                <DemoCreateTask update={demoCallbackNewTodos} dataCategories={categories} />
                <DemoCreateCategory update={demoCallbackNewCat} data={categories} />
                {filter ?
                    categories.map((category, index) => (
                        <VStack key={"demoFilterCategory:" + category + ', ' + index}>
                            {(category == 'Uncategorized') ? 
                                <Text>Uncategorized</Text>
                                :
                                <Box onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} >
                                <Text>{category}</Text>
                                {hover && <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteCategory(category)} />}
                            </Box>}
                            {Object.values(todos).filter((element) => (element.category === category)).map((todo, index) => (
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
                    :
                    <VStack>
                        {todos.map((todo, index) => (
                            <Task 
                                key={"demoUncategorized" + index} 
                                onClick={() => handleDelete(todo)} 
                                onChange={(ev) => handleStatusChange(ev, todo)} 
                                value={todo.status} 
                                task={todo.task}
                            />
                        ))}
                    </VStack>
                }
            </VStack>
        </ChakraProvider>
    )
}
















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