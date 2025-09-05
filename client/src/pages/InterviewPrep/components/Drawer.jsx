import { Box, Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { AiOutlineClose } from "react-icons/ai";
import AIResponsePreview from './AIResponsePreview'
const Drawer = ({isOpen ,onClose , explaination , isLoading}) => {
  return (

    <Box  h={'100%'} minH={'60vh'} maxH={'100vh'}>
        
            
          {/* <Text cursor={'pointer'} onClick={()=>{onClose()}}><AiOutlineClose /></Text> */}
          <Flex justify={'flex-end'}><AiOutlineClose onClick={()=>{onClose()}} p={2} cursor={'pointer'}/></Flex>
        
          {
              isLoading ? (<h2>Loading...</h2>): 
              <>
            
                    <Text fontSize={'xl'} px={2}  fontWeight={'semibold'}>
                        <AIResponsePreview content={explaination.title}/>
                    </Text>
                    <Box px={6} py={2}>

                          <Text fontSize={'md'} ><AIResponsePreview content={explaination.explanation}/></Text>
                    </Box>
               </>
          }
          
    </Box>
      

  )
}

export default Drawer