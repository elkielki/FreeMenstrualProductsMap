import React, { useState, useEffect, useContext } from 'react'
import Axios from './axiosSetup'
import { Button, Input, Checkbox, Select, Text, Popover, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverTrigger, PopoverBody, PopoverContent, IconButton, HStack, VStack, useDisclosure } from '@chakra-ui/react'
import { UserContext } from '../context/userContext';
import {toast} from 'react-hot-toast'
import Task from './Task';
import theme from './Theme';

export default function CreateCategory({update}) {
    //const {user} = useContext(UserContext)
    const {user, setUser} = useContext(UserContext);
    const [categoryInput, setCategoryInput] = useState('');
    const [close, setClosed] = useState(false);

    const handleNewCategory = async () => {
        if (categoryInput.length == 0) {
            return toast.error('Category must be at least one character long.');
        }
        var categoryNotFound = true;
        for (let i = 0; i < user.categories.length; i++) {
            var element = user.categories[i].trim().toLowerCase();
            if (categoryInput.trim().toLowerCase() == element) {
                categoryNotFound = false;
                toast.error('Category already exists');
                break;
            }
        }
        if (categoryNotFound) {
            const categoryPost = await Axios.put('/dashboard/newcategory/' + user.email, {
                //    email: user.email,,
                id: user._id, 
                category: categoryInput,
            })
            if (categoryPost.error) {
                toast.error(categoryPost.error)
            } else {
                setCategoryInput('');
                update(categoryPost.data.categories);
           //     navigate('/dashboard')
            }
        }
        setClosed(true);
    }

    return (
        <Popover
            onClose={close}
        >
            <PopoverTrigger>
                <Button>Create Category</Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                    <Input type='text' value={categoryInput} onChange={(e) => setCategoryInput(e.target.value)} placeholder='New Category' />
                    <Button colorScheme='blue' onClick={handleNewCategory}>Submit</Button>
                </PopoverBody>
            </PopoverContent>       
        </Popover>
    )
}