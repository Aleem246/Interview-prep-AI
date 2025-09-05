import {  Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, 
  ModalOverlay, SimpleGrid, useDisclosure, 
  useToast} from '@chakra-ui/react';
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import SessionCard from '../../components/Cards/SessionCard';
import CreateSessionForm from '../../components/Inputs/CreateSessionForm';
import { Link  } from 'react-router-dom';


const DashBoard = () => {
  const {isOpen , onOpen , onClose} = useDisclosure();
  const {isOpen:isOpenAlert , onOpen : onOpenAlert , onClose : onCloseAlert} = useDisclosure();
  const [sessions , setSessions] = useState([]);
  const headers = {
      authorization : `Bearer ${localStorage.getItem("token")}`
  }

  const Toast = useToast();
  const fetchAllSessions = async () => {
  try{
    const response = await axios.get("http://localhost:8081/api/sessions/my-sessions",{headers});
    setSessions(response.data.data);

  }catch(err){
    console.log("Error while fetching the sessions", err);
  }
}

const onDelete = async(session_id)=>{
 try{
    const response = await axios.delete(`http://localhost:8081/api/sessions/${session_id}`,{headers});
    fetchAllSessions();
    Toast({
      title: 'Session Deleted',
      description: "You have successfully deleted the session",
      status: 'success',
      position: 'top',
      duration: 9000,
      isClosable: true,
    })
 }catch(err){
  Toast({
    title: 'Error',
    description: err?.response?.data?.message || err?.message|| 'An error occurred',
    status: 'error',
    position: 'top',
    duration: 9000,
    isClosable: true,
  })
  console.log("Error while deleting the session", err);
 }
}
  useEffect(()=>{
    fetchAllSessions();
},[])
  return (
    <Box  minH = {'85vh'} position = {'relative'}>
      {/* //session cards  */}
      <SimpleGrid direction={'column'} columns={{base : 1 , md : 2 , lg : 3}} spacing={5} p={5}>
      {
        sessions.map((session)=>(
          <Link to={`/interview-prep/${session._id}`} key={session._id}>
            <SessionCard data={session}  onDelete={onDelete}/>
          </Link>
            
       ))}
       </SimpleGrid>
      

      <Button position={'fixed'} bg= "#ff9411ff" onClick={()=>onOpen()} borderRadius={'full'} color = "white" bottom={'6'} right={'4'} >
          + Add New
      </Button>

      
       {/* createSession form modal  */}
       <Modal isOpen = {isOpen} onClose = {onClose} isCentered size = "lg">
          <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(1px)" />
          <ModalContent  borderRaduis = "xl" overflow = "hidden">

            <ModalCloseButton/>
            <ModalBody pb={6}>
               <CreateSessionForm/>
            </ModalBody>
          </ModalContent>
       </Modal>
      

      

    </Box>
       
  )
}

export default DashBoard