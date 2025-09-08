import { Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import Login from '../../Auth/login'
import SignUp from '../../Auth/signUp'
const AuthModal = ({isOpen  ,onOpen, onClose ,activeTab ,setActiveTab}) => {
    
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
            <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(1px)" />
            <ModalContent borderRadius="xl" overflow="hidden">
              <ModalHeader bgGradient="linear(to-r, #ffdf74d4, #ffa85cff)" py={6}>
                  <Heading as="h3" size="lg" color="blue.800">
                    {activeTab===0? "Welcome Back" : "Create New Account" }
                  </Heading>
              </ModalHeader>
    
              <ModalCloseButton />
    
              <ModalBody pb={6}>
                {
                    (activeTab === 0) ? <Login  setActiveTab={setActiveTab} onclose={onClose}/> :
                    <SignUp setActiveTab={setActiveTab} onclose={onClose}/>
                }
    
               
              </ModalBody>
            </ModalContent>
          </Modal>
  )
}

export default AuthModal