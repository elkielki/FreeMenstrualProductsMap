import React, { useState, useContext, useEffect } from 'react';
import { ChakraProvider, Button, Box, Text, IconButton, VStack } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import theme from './theme/Theme';
import Axios from './axiosSetup';
import { UserContext } from './context/userContext';
//import { useAuth } from '../context/AuthContext';
import CreateTask from './components/CreateTask';
import CreateCategory from './components/CreateCategory';
import Task from './components/Task';
import Logout from './components/Logout';

export default function Dashboard() {
  //  const {user} = useContext(UserContext)
//    const {user, setUser} = useContext(UserContext);
    const {user} =  useContext(UserContext);//useAuth();
    const navigate = useNavigate();
    const [todos, setTodos] = useState(user.todos);
    const [categories, setCategories] = useState(user.categories);
    const [filter, setFilter] = useState(user.filter);
    const [hover, setHover] = useState(false);

    const callbackNewCategory = (newCategoriesList) => {
        setCategories(newCategoriesList);
    }

    const callbackNewTodos = (newTodosList) => {
        setTodos(newTodosList);
    }

    const handleFilter = async () => {
        const changeFilter = await Axios.put('/dashboard/updateFilter/' + user.email, {
            //    email: user.email,,
                id: user._id, 
                filter: !filter,
        })
        if (changeFilter.error) {
            toast.error(changeFilter.error)
        }
        else {
           setFilter(changeFilter.data.filter);
        }
    }

// edit all the errors to toast.error 
    const handleStatusChange = (event, taskId) => {
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
        Axios.put('/updateStatus/' + user.email, {
            id: user._id,
            taskId: taskId,
            status: newStatus,
        })
        .then(result => {
            setTodos(result.data.todos);
            //console.log(result.data);
               //   location.reload()
        })
        .catch(err => console.log(err))
    }

    const handleDelete = (id) => {
        Axios.put('/delete/' + user.email, {
            id: user._id,
            taskId: id
        })
        .then(result => {
         //   setTodos(result.data)
        //    console.log(result.data);
            setTodos(result.data.todos);
        })
        .catch(err => console.log(err))
    }

    const handleDeleteCategory = (cat) => {
        Axios.put('/deleteCategory/' + user.email, {
            id: user._id,
            category: cat
        })
        .then(result => {
            setCategories(result.data.categories);
            // create a modal that asks to delete all tasks or just the category
        //    location.reload()
        })
        .catch(err => console.log(err))
    } 
//!!user
    return (
        <ChakraProvider theme={theme} >
        <VStack>
            <h1>Dashboard</h1>
            {!!user ? (
                <Box>
                    <h1>Hello {user.email}!</h1>
                    <Logout />
                </Box>
            ) : 
            (<h2>Hello! Tasks will not be saved. Please create an account to save your tasks.</h2>)}
            <h2>Todo List</h2>
        </VStack>
    </ChakraProvider>
    )
}

/* 
            
            <h2>{'filter' + filter}</h2>
            <Button onClick={handleFilter}>Filter</Button>
            <CreateCategory update={callbackNewCategory} />
            <CreateTask update={callbackNewTodos} />
            {filter ?
                categories.map((category, index) => (
                    <VStack key={"filteredByCategory:" + category + ', ' + index}>
                        {(category == 'Uncategorized') ? 
                            <Text>Uncategorized</Text>
                            :
                            <Box onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} >
                            <Text>{category}</Text>
                            {hover && <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteCategory(category)} />}
                        </Box>}
                        {Object.values(todos).filter((element) => (element.category === category)).map((todo, index) => (
                            <Task 
                                key={"todolistcategorized" + index} 
                                onClick={() => handleDelete(todo._id)} 
                                onChange={(ev) => handleStatusChange(ev, todo._id)} 
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
                            key={"todolistuncategorized" + index} 
                            onClick={() => handleDelete(todo._id)} 
                            onChange={(ev) => handleStatusChange(ev, todo._id)} 
                            value={todo.status} 
                            task={todo.task}
                        />
                    ))}
                </VStack>
            }
        </VStack>





            
            

            
{
            todos.length === 0 ?
                <div><h2>No Tasks</h2></div>
            :
            //    filter ?
                    categories.map((category, index) => (
                        <VStack key={"filteredByCategory: " + category.category + ', ' + index}>
                            <Box onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} >
                                <Text>{category.category}</Text>
                                {hover && <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteCategory(index)} />}
                            </Box>
                            {Object.values(todos).filter((element) => (element.category === category.category)).map((todo, index) => (
                                <Task 
                                    key={"todolistcategorized" + index} 
                                    onClick={() => handleDelete(todo._id)} 
                                    onChange={(ev) => handleStatusChange(ev, index)} 
                                    value={todo.status} 
                                    task={todo.task}
                                />
                            ))}
                        </VStack>
                    ))
                
            }

*/