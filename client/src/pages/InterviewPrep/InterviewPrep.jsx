import { Badge, Box, Button, Flex, Stack, Text, useBreakpoint, useBreakpointValue, useDisclosure, useToast } from '@chakra-ui/react';
import axios from 'axios';
import moment from 'moment';
import {motion , AnimatePresence} from "framer-motion"
import React, { useState, useEffect, use } from 'react'
import { MdOutlinePlaylistAdd } from "react-icons/md";
import {Link, useParams} from 'react-router-dom'
import QuestionCard from '../../components/Cards/QuestionCArd';
import Drawer from './components/Drawer';
import { FaArrowLeft } from "react-icons/fa6";

const InterviewPrep = () => {
  const {sessionId} = useParams();
  const [isLoading , setIsLoading] = useState(false);
  const [sessionData , setSessionData] = useState(null);
  const {isOpen , onOpen , onClose} = useDisclosure();
  const [explanation , setExplanation ] = useState(null);
  const Toast = useToast();
  const [questionId , setQuestionId] = useState(null);
  const isDesktop = useBreakpointValue({base: false, lg:true})
  const headers = {
    authorization : `Bearer ${localStorage.getItem("token")}`
  }
  const handleLearnMore = async(question)=>{
    try{
      setIsLoading(true);
      onOpen();
      const response = await axios.post("http://localhost:8081/api/ai/generate-explanation" , {question} , {headers});
      setQuestionId(question._id);
      setExplanation(response.data);
    }catch(err){
      console.log("Error while fetching the explanation", err);
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
      setIsLoading(true);
      const {role , experience , topicsToFocus , desc} = sessionData;
      //generating more questions
      const airesponse = await axios.post('http://localhost:8081/api/ai/loadMore-questions',{role , experience , topicsToFocus , numberOfQuestions : 10 , questions : sessionData.questions } , {headers});

      const data = airesponse.data;
      //adding generated questions to the session
      const response = await axios.put(`http://localhost:8081/api/sessions/${sessionId}` , {questions : data} , {headers});
      fetchSessionById();
      Toast({
        title: 'Added More Questions',
        description: response.data.message,
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
      console.log("Error while loading more questions", err);
    }finally{
      setIsLoading(false);
    }
  }


  useEffect(()=>{
    fetchSessionById();
  },[])

  return (
    <Box p={4} borderWidth={'2px'} borderRadius={'lg'}>
      {/* title card  */}
     
      <Box
      bgGradient="linear(to-r, #a6ff8bff, #ffb3f5ff, #febf4aff)"
      borderRadius="lg"
      w="100%"
      borderWidth="2px"
      px={6}
      py={4}
      boxShadow="md"
    >
      {/* Top section with Back Button and Title */}
      
       
        <Text as="h1" fontSize="2xl" fontWeight="bold">
          {sessionData?.role}
        </Text>
      

      {/* Subtitle */}
      <Text as="h3" fontSize="lg"  mb={4} >
        - {sessionData?.topicsToFocus}
      </Text>

      {/* Badges */}
      <Flex gap={3} wrap="wrap">
        <Badge px={4} py={1} borderRadius="full" colorScheme="purple">
          Experience: {sessionData?.experience} {sessionData?.experience === 1 ? "year" : "years"}
        </Badge>

        <Badge px={4} py={1} borderRadius="full" colorScheme="blue">
          {sessionData?.questions?.length} Q&A
        </Badge>

        <Badge px={4} py={1} borderRadius="full" colorScheme="green">
          Last Updated:{" "}
          {sessionData?.updatedAt
            ? moment(sessionData.updatedAt).format("Do MMM YYYY")
            : "N/A"}
        </Badge>
      </Flex>
    </Box>


      <Flex gap={2}  borderRadius={'lg'} >
      {/* left side - question sections */}
      <Box mt={4} px ={4} w="100%" maxW={ {base : "100%" , md : isOpen ? "50%" : "60%"}} borderRadius={'lg'} flex={'1'} >
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
                          <QuestionCard  question={question} fetch={fetchSessionById} handleLearnMore={handleLearnMore}  explanation={explanation} isLoading={isLoading} />
                      </motion.div>
                    
                  ))
                }
                </AnimatePresence>
                {

                  sessionData && <Button mx={'auto'} colorScheme='purple' leftIcon={<MdOutlinePlaylistAdd />} onClick={handleLoadMore} isLoading={isLoading} loadingText="more questions...">Load More</Button>
                }
          </Stack>
      </Box>

      {/* right explanation section        */}
                {
                  isDesktop && isOpen && (
                    <Box p={3} boxShadow={'2xl'} flex={'1'} borderRadius={'lg'} overflowY={'auto'} h={'100vh'} position="sticky" top={2}>
                        <Drawer isOpen={isOpen} onClose={onClose} explanation={explanation} isLoading={isLoading}/>
                    </Box>
                  )
                }
      </Flex>

    </Box>
  )
}

export default InterviewPrep