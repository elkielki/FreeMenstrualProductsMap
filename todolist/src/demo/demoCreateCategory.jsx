import React, { useState, useRef } from 'react';
import { Button, Input, Popover, PopoverCloseButton, PopoverHeader, PopoverTrigger, PopoverBody, PopoverContent } from '@chakra-ui/react';
import { toast } from 'react-hot-toast';

export default function DemoCreateCategory({update, data}) {
    const [categoryInput, setCategoryInput] = useState('');
    const initRef = useRef();

 //   const { onOpen, onClose, isOpen } = useDisclosure()
    const handleNewCategory = async () => {
        if (categoryInput.length == 0) {
            return toast.error('Category must be at least one character long.');
        }
        var categoryNotFound = true;
        for (let i = 0; i < data.length; i++) {
            var element = data[i].trim().toLowerCase();
            if (categoryInput.trim().toLowerCase() == element) {
                categoryNotFound = false;
                toast.error('Category already exists');
                break;
            }
        }
        if (categoryNotFound) {
                update(categoryInput);
                setCategoryInput('');
           //     navigate('/dashboard')            
        }
    }

    return (
        <Popover closeOnBlur={true} initialFocusRef={initRef}>
     {({ onClose }) => (
        <>
          <PopoverTrigger>
            <Button>Create Category</Button>
          </PopoverTrigger>

            <PopoverContent>
               <PopoverHeader>Create Category</PopoverHeader>
               <PopoverCloseButton />
               <PopoverBody>

                <Input type='text' id='inputBox' value={categoryInput} onChange={(e) => setCategoryInput(e.target.value)} placeholder='New Category' />
                <Button
                  mt={4}
                  colorScheme='blue'
                  onClick={() => {onClose(); handleNewCategory();}}
                  ref={initRef}
                >
                  Close
                </Button>
              </PopoverBody>
            </PopoverContent>

        </>
    )}
    </Popover>
    /*    
    <Popover initialFocusRef={initRef} >
                <>
            <PopoverTrigger>
                <Button>Create Category</Button>
            </PopoverTrigger>
                <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                    <Input type='text' onChange={(e) => setCategoryInput(e.target.value)} placeholder='New Category' />
                    <Button colorScheme='blue' onClick={() => {onClose; handleNewCategory;}} ref={initRef}>Submit</Button>
                </PopoverBody>
            </PopoverContent> 
            </>
        </Popover>*/
    )        
}


/*
        

*/