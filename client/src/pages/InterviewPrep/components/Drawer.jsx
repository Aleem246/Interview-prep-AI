import { Box,  Flex, Skeleton, SkeletonText, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { AiOutlineClose } from "react-icons/ai";
import AIResponsePreview from './AIResponsePreview'
// import SkeletonCart from './Skeleton';
const Drawer = ({onClose , explanation , isLoading}) => {
  return (

    <Box p={2}  borderRadius={'md'} bg="blackAlpha.100" >
        
            
          {/* <Text cursor={'pointer'} onClick={()=>{onClose()}}><AiOutlineClose /></Text> */}
          <Flex justify={'flex-end'} position={'sticky'} top={0}><AiOutlineClose onClick={()=>{onClose()}} p={2} cursor={'pointer'}/></Flex>
          
          {
                  (isLoading) ? 
                      <Stack padding={2} spacing={1}>
                          <Skeleton height='20px'/>
                  
                          <SkeletonText mt='4' noOfLines={8} spacing='4' skeletonHeight='2' />
                          <SkeletonText mt='6' noOfLines={8} spacing='4' skeletonHeight='2' />
                          <SkeletonText mt='6' noOfLines={8} spacing='4' skeletonHeight='2' />
                          <SkeletonText mt='6' noOfLines={8} spacing='4' skeletonHeight='2' />
                       
                      </Stack> : 
              <>
            
                    <Box fontSize={'xl'} px={2}  fontWeight={'bold'}>
                        <AIResponsePreview content={explanation?.title}/>
                    </Box>

                    <Box px={4} py={2}>
                          <AIResponsePreview content={explanation?.explanation}/>
                    </Box>
               </>
          }
          
    </Box>


      

  )
}

export default Drawer