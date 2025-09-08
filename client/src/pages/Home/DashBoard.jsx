import {  Box, Button, Center, Flex, Heading, Image, Modal, ModalBody, ModalCloseButton, ModalContent, 
  ModalOverlay, SimpleGrid, Skeleton, SkeletonText, Spinner, useDisclosure, 
  useToast} from '@chakra-ui/react';
import axios from 'axios';
import { useState ,useEffect } from 'react';
import SessionCard from '../../components/Cards/SessionCard';
import CreateSessionForm from '../../components/Inputs/CreateSessionForm';
import nodata from "../../assets/no_data.jpg"

const DashBoard = () => {
  const {isOpen , onOpen , onClose} = useDisclosure();
  const [sessionloading , setSessionLoading] = useState(false);
  const [sessions , setSessions] = useState([]);
  const headers = {
      authorization : `Bearer ${localStorage.getItem("token")}`
  }

  const Toast = useToast();
  const fetchAllSessions = async () => {
  try{
    setSessionLoading(true);
    const response = await axios.get("http://localhost:8081/api/sessions/my-sessions",{headers});
    setSessions(response.data.data);

  }catch(err){
    console.log("Error while fetching the sessions", err);
  }finally{
    setSessionLoading(false);
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
        (sessionloading)? (
          <>
            <Center h={'100vh'} w="100vw">

                <h1>
                  <Spinner size="sm" /> Loading...</h1>
            </Center>
          </>
        )
        : (sessions.length==0)?(
          <Flex
              w="100vw" h="80vh" direction="column"
              justify="center" align="center"
              p={6} textAlign="center"
              >
  {/* Image Section */}
        <Box maxW={{ base: "150px", md: "250px", lg: "300px" }} mb={6}>
          <Image src={nodata} objectFit="contain" alt="No data" />
        </Box>

  {/* Text and Button */}
          <Box>
            <Heading as="h1" size="2xl" color="blue.800" mb={6}>
              Start your interview preparation by adding a session
            </Heading>

            <Button
              bg="#ff9411ff"
              color="white"
              borderRadius="full"
              size="lg"
              px={8}
              py={6}
              boxShadow="md"
              _hover={{ bg: "#ff8000", boxShadow: "xl" }}
              onClick={onOpen}
            >
              + Create a Session
            </Button>
          </Box>
</Flex>

        ):
        sessions.map((session, index)=>(
          
            <SessionCard data={session}  key={session._id} index={index} onDelete={onDelete} isLoading = {sessionloading}/>
          
            
       ))}
       </SimpleGrid>
      
       {
        sessions.length>0 &&
            <Button position={'fixed'} bg= "#ff9411ff" onClick={()=>onOpen()} borderRadius={'full'} color = "white" bottom={'6'} right={'4'} >
                + Add New
            </Button>
      }

      
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