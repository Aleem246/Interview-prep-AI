import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box,
   Button, Flex, Heading, HStack,
   Text, useBreakpointValue, 
   useDisclosure} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import {LuPin , LuPinOff , LuSparkles} from 'react-icons/lu'
import AIResponsePreview from '../../pages/InterviewPrep/components/AIResponsePreview'
import { useState } from 'react'
import axios, { Axios } from 'axios'
import Drawer from '../../pages/InterviewPrep/components/Drawer'
const QuestionCard = ({question ,fetch, handleLearnMore , explanation, isLoading}) => {
  
  const[isPinned , setIsPinned] = useState(question.isPinned);
  const isMobile = useBreakpointValue({base : true , lg : false});
  const {isOpen , onOpen , onClose} = useDisclosure();
  const headers = {
      authorization : `Bearer ${localStorage.getItem("token")}`
  }


  const handleToggle= async (question_id)=>{
    try{
        const response = await axios.put(`http://localhost:8081/api/questions/pin/${question_id}`,{},{headers}) 

        setIsPinned( (prev)=> !prev );
        fetch();

    }catch(err){
      console.log(err)
    }
    
  }
  
  return (
    
    <Box p={2}  borderWidth={'2px'} borderRadius={'lg'} boxShadow={'lg'}>
        <Accordion allowToggle>
            <AccordionItem>
                  <Flex alignItems={'center'} p={2}>

                    <AccordionButton _expanded={{ bg: 'blackAlpha.200', color: 'black' }}>
                        <Box as='span' flex='1' textAlign='left' mr={1} >
                            
                            <Text fontWeight={'semibold'}>
                              {question.question}
                              
                              </Text>
                        </Box>

                    </AccordionButton>
                        <Flex spacing={1} alignItems={'center'}>

                        <Button bg="purple.100" px={3} py={2} borderRadius={'md'} leftIcon={isPinned ? <LuPinOff /> : <LuPin />} onClick={()=>handleToggle(question._id)}/>

                        
                          <Button  bg="green.100" ml={2} leftIcon={<LuSparkles />} onClick={()=>(onOpen(),handleLearnMore(question.question))}>
                             Learn More
                          </Button>
                        
                          
                              <AccordionIcon/>

                        </Flex>
                  </Flex>
            

                <AccordionPanel px={6}>
                  <AIResponsePreview content={question.answer}/>
                  
                </AccordionPanel>
              </AccordionItem>  
        </Accordion>
        { 
          (isMobile) && (isOpen) && 
          <Box bg="blackAlpha.100" p={2} boxShadow={'2xl'} flex={'1'}  overflowY={'auto'} h={'100vh'}>
            
            <Drawer  onClose={onClose} explanation={explanation} isLoading={isLoading}/>
          </Box>
        }
    </Box>
    
  )
}

export default QuestionCard