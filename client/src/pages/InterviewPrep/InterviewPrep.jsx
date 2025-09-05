import { Badge, Box, Button, Flex, Stack, Text, useDisclosure, useToast } from '@chakra-ui/react';
import axios from 'axios';
import moment from 'moment';
import {motion , AnimatePresence} from "framer-motion"
import React, { useState, useEffect, use } from 'react'
import { MdOutlinePlaylistAdd } from "react-icons/md";
import {useParams} from 'react-router-dom'
import QuestionCard from '../../components/Cards/QuestionCArd';
import Drawer from './components/Drawer';

const InterviewPrep = () => {
  const {sessionId} = useParams();
  const [isLoading , setIsLoading] = useState(false);
  const [sessionData , setSessionData] = useState(null);
  const {isOpen , onOpen , onClose} = useDisclosure();
  const [explaination , setExplaination ] = useState(null);
  const Toast = useToast();
  
  const headers = {
    authorization : `Bearer ${localStorage.getItem("token")}`
  }
  const handleLearnMore = async(question)=>{
    try{
      setIsLoading(true);
      onOpen();
      const response = await axios.post("http://localhost:8081/api/ai/generate-explanation" , {question} , {headers});
      setExplaination(response.data);
    }catch(err){
      console.log("Error while fetching the explaination", err);
    }finally{
      setIsLoading(false);
    }
  }
  const fetchSessionById = async()=>{
    try{
      setIsLoading(true);

      const response = await axios.get(`http://localhost:8081/api/sessions/${sessionId}`,{headers});
      // console.log("response" , response.data.data);
      setSessionData(response.data.data);

    }catch(err){  
      console.log("Error while fetching the session", err);
    }finally{
      setIsLoading(false);
    }
  }
  const handleLoadMore = async()=>{
    try{
      const {role , experience , topicsToFocus , desc} = sessionData;
      const airesponse = await axios.post('http://localhost:8081/api/ai/generate-questions',{role , experience , topicsToFocus , desc, numberOfQuestions : 10} , {headers});

      const data = airesponse.data;
      const response2 = await axios.post(`http://localhost:8081/api/sessions/create`, {role , experience , topicsToFocus , desc, questions : data}, {headers});
      fetchSessionById();
      Toast({
        title: 'Added More Questions',
        description: "You have successfully added more questions to the session",
        status: 'success',
        position: 'top',
        duration: 9000,
        isClosable: true,
      })
    }catch(err){
      console.log("Error while loading more questions", err);
    }
  }


  useEffect(()=>{
    fetchSessionById();
  },[])

  return (
    <Box p={4} borderWidth={'2px'} borderRadius={'lg'}>
      <Box borderRadius={'lg'} w ="100%" borderWidth={'2px'} p={2}>
          <Text as="h1" fontSize={'2xl'} fontWeight={'semibold'}>{sessionData?.role}</Text>
          <Text as="h3" fontSize={'lg'} mb={2} >  {sessionData?.topicsToFocus}</Text>
          <Flex gap={2} wrap="wrap" mb={3}>
                  <Badge px={3} py={1} borderRadius="full">
                    Experience: {sessionData?.experience}{sessionData?.experience===1 ? " year" : " years"}
                  </Badge>
          
                  <Badge px={3} py={1} borderRadius="full">
                    {sessionData?.questions?.length} Q&A
                  </Badge>
          
                  <Badge px={3} py={1} borderRadius="full">
                    Last Updated:{" "}
                    {sessionData?.updatedAt
                      ? moment(sessionData.updatedAt).format("Do MMM YYYY")
                      : "N/A"}
                  </Badge>
          
                </Flex>

      </Box>
      
      <Flex gap={2} alignItems={'stretch'}>
      {/* left side - question sections */}
      <Box mt={4} px ={4} w="100%" maxW={isOpen ? "50%" : "60%"} flex={'1'} >
          <Text fontWeight={'semibold'} mb={4} fontSize={'xl'}>Interview Q & A</Text>

          <Stack spacing={4} px={2}>
            <AnimatePresence>
                {
                  
                  sessionData?.questions?.map((question )=>(

                     <motion.div
                        key={question._id}
                        layout
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                      >
                          <QuestionCard  question={question} fetch={fetchSessionById} handleLearnMore={handleLearnMore} />
                      </motion.div>
                    
                  ))
                }
                </AnimatePresence>
                {

                  sessionData && <Button mx={'auto'} colorScheme='purple' leftIcon={<MdOutlinePlaylistAdd />} onClick={handleLoadMore} isLoading={isLoading} loadingText="more questions...">Load More</Button>
                }
          </Stack>
      </Box>

      {/* right explaination section        */}
                {
                  isOpen && (
                    <Box  p={2} w="100%" maxW="50%" boxShadow={'2xl'} flex={'1'} overflowY={"auto"} >
                        <Drawer isOpen={isOpen} onClose={onClose} explaination={explaination} isLoading={isLoading}/>
                    </Box>
                  )
                }
      </Flex>

    </Box>
  )
}

export default InterviewPrep