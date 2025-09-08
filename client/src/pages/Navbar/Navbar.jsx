import { Box, Button, Container, Flex, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import { authActions } from '../../store/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import Login from '../Auth/login'
import SignUp from '../Auth/signUp'
import { authActions } from '../../store/auth'
import AuthModal from '../InterviewPrep/components/AuthModal'
const Navbar = () => {
  const disPatch = useDispatch();
  const Navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();

  const [activeTab , setActiveTab] = useState(0); //0 for login , 1 for signup

  
  const isLoggedin = useSelector((state) => state.auth.isLoggedIn);
    const handleLogout = (e)=>{
       
       localStorage.clear();
       disPatch(authActions.logout());
        Navigate('/');
     }
  return (
    <Box as="nav" bgGradient="linear(to-r, #ffe0a6ff , #fff4b3ff  , #ffdc9aff)" py={4} boxShadow="lg" borderBlockEnd={"1px solid #000000ff"}>
            <Container maxW="container.2xl">
              <Flex justify="space-between" align="center">
                
                  <Heading as="h1" size="md" color="black" onClick={() => Navigate("/")}>  
                    Interview Prep AI
                  </Heading>
                
                <Flex gap={4}>
                  {
                    isLoggedin?
                    <Button colorScheme="orange"  to="/" onClick={() => handleLogout()} borderRadius={'full'} >Logout</Button>:
    
                    <Button colorScheme="orange" onClick={onOpen} borderRadius={'full'} >Login / Sign In</Button>
                  }
                </Flex>
              </Flex>
            </Container>
          
          {/* login / signup modal  */}
          <AuthModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} activeTab={activeTab} setActiveTab={setActiveTab}></AuthModal>
          {/* <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
            <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(1px)" />
            <ModalContent borderRadius="xl" overflow="hidden">
              <ModalHeader bgGradient="linear(to-r, #ffc1e0ff, #d8b3ffff)" py={6}>
                  <Heading as="h3" size="lg" color="blue.800">
                    {activeTab===0? "Welcome Back" : "Create New Account" }
                  </Heading>
              </ModalHeader>
    
              <ModalCloseButton />
    
              <ModalBody pb={6}>
                {
                    (activeTab === 0) ? <Login  setActiveTab={setActiveTab} onclose={onClose}/> :
                    <SignUp setActiveTab={setActiveTab} onclose={onclose}/>
                }
    
               
              </ModalBody>
            </ModalContent>
          </Modal> */}
        </Box>
  )
}

export default Navbar







