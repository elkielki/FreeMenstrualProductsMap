import React, { useState, useEffect } from 'react'
import CreateTask from './CreateTask'
import axios from 'axios'
import { BsCircleFill, BsFillTrashFill, BsFillCheckCircleFill } from "react-icons/bs"
import { ChakraProvider, Flex, Button, Box, Select, Text, IconButton, HStack } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'

export default function Task({onClick, onChange, value, task}) {
    return (
        <HStack>
            <Text>{task}</Text>
            <Select  value={value} onChange={onChange}>
            <option value='option1'>Not Started</option>
                <option value='option2'>In Progress</option>
                <option value='option3'>Completed</option>
            </Select>
            <IconButton icon={<DeleteIcon />} onClick={onClick} />
        </HStack>
    )

}