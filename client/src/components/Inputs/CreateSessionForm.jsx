import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Stack, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { use, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const CreateSessionForm = () => {
    const [formData , setformData] = useState({
        role : "",
        experience : "",
        topicsToFocus : "",
        desc : "",
        numberOfQuestions : 10
    })
    const headers = {
        "authorization" : `Bearer ${localStorage.getItem("token")}`
    }
    const [isLoading , setIsLoading] = useState(false);
    const [error , setError] = useState(null);
    const navigate = useNavigate();
    const toast = useToast();

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setformData(prev =>({...prev , [name] : value}));
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();

        setIsLoading(true);
        const {role , experience , topicsToFocus , desc, numberOfQuestions} = formData;
        try{
            const response = await axios.post(`http://localhost:8081/api/ai/generate-questions`, {role , experience , topicsToFocus , desc, numberOfQuestions}, {headers});

            const data = response.data;
            const response2 = await axios.post(`http://localhost:8081/api/sessions/create`, {role , experience , topicsToFocus , desc, questions : data}, {headers});

            setIsLoading(false);
            toast({
                title: 'Session Created.',
                description: "you have successfully created a session",
                status: 'success',
                duration: 5000,
                position:'top',
                isClosable: true,
            })
            // console.log(" response 2 = ",response2);
            navigate(`/interview-prep/${response2?.data?.data?._id}`);

        }catch(err){
            handleSubmit();
            console.log("error while creating session", err);   
            
        }finally{
            setIsLoading(false);
        }

    

    }

  return (
    <Flex py={4} align="center" justify={"center"} bg="gray.50">
        <Box w="100%" maxW="md" p={6} borderWidth={1} boxShadow={'lg'}>
            <Heading as="h2" size="xl" mb={2}>Create a Session</Heading>

            <form onSubmit={handleSubmit}>
                <Stack spacing={4}>
                    <FormControl id="role" isRequired>
                        <FormLabel>Target Role </FormLabel>
                        <Input type="text" name="role"
                         value={formData.role} 
                         placeholder="Frontend Developer , UI/UX designer etc."
                         focusBorderColor="orange.500"
                        onChange={handleChange}/>
                    </FormControl>

                    <FormControl id="experience" isRequired>
                        <FormLabel> Years of Experience </FormLabel>
                        <Input type="number" name="experience"
                         value={formData.experience} 
                         placeholder="eg.1 year , 3 years etc."
                         focusBorderColor="orange.500"
                        onChange={handleChange}/>
                    </FormControl>

                    <FormControl id="topicsToFocus" isRequired>
                        <FormLabel> Topics to Focus On </FormLabel>
                        <Input type="text" name="topicsToFocus"
                         value={formData.topicsToFocus} 
                         placeholder="(comma-seperated eg. React, Node.js, MongoDB"
                         focusBorderColor="orange.500"
                        onChange={handleChange}/>
                    </FormControl>

                    <FormControl id="numberOfQuestions" isRequired>
                        <FormLabel> Number of Questions to Generate</FormLabel>
                        <Input type="number"
                        name="numberOfQuestions"
                        value={formData.numberOfQuestions}
                        placeholder="10"
                        focusBorderColor="orange.500"
                        onChange={handleChange}
                        />
                        

                    </FormControl>

                    <FormControl id="desc" >
                        <FormLabel> Description </FormLabel>
                        <Input type="text" name="desc"
                         value={formData.desc} 
                         placeholder="Any specific goals / notes for this session"
                         focusBorderColor="orange.500"
                        onChange={handleChange}/>
                    </FormControl>

                    <Button type="submit" colorScheme="orange" isLoading={isLoading} loadingText="Creating Session"> Create Session</Button>
                </Stack>
            </form>

        </Box>
        
    </Flex>
  )
}

export default CreateSessionForm