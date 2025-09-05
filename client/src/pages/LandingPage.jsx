import React, { useState } from 'react';
import {
  Box,Button,Center,Checkbox,Container,
  Flex,    Heading,
  Image,  Text,
  
} from '@chakra-ui/react';
import { authActions } from '../store/auth';
import { FiCheck, FiChevronRight, FiEye, FiEyeOff, FiMail, FiStar } from 'react-icons/fi';
import {  useNavigate } from 'react-router-dom';


const LandingPage = () => {
  const Navigate = useNavigate();
  return (

    <Box>

      {/* Hero Image Section */}
      <Box bgGradient="linear(to-r, #fff4b3ff ,#feeccaff, #ffdc9aff)" py={{base: 8,md :16}}>
        <Container maxW="container.lg" >
          <Flex
            direction={{base : 'column', md: 'row'}}
            align="center"
           
            justify="space-between"
            gap={{base : 8 , md: 16}}
          >
            <Box flex={1}>
                <Button colorScheme="yellow" borderRadius={'full'} color={'orange.50'} mb={4}>
                    * AI Powered
                </Button>
              <Heading as="h1" size={{base : 'md', md : 'xl'}} fontWeight='semibold'  mb={4}>
                Ace Interviews with 
                <br/>  <span style={{color : " #ff9411ff "                  
                }}>AI-Powered </span> 
                Learning
              </Heading>
            </Box>

            <Box flex={1}>
              <Text fontSize={{ base : 'md', md: 'lg'}}  mb={6}>
                Get role-specific interview questions, expand answers on demand, dive deep into concepts, 
                and organize your preparation. Your complete toolkit for interview mastery and career success.
              </Text>

              <Button
                colorScheme="orange"
                size="lg"
                onClick={()=>Navigate('/dashboard')}
                borderRadius={'full'}
                rightIcon={<FiChevronRight />}
              >
                Get Started
              </Button>

            </Box>

          </Flex>
        </Container>
      </Box>


        {/* image section */}
        <Box flex={1} w={'container.lg'} mx={'auto'}>
            <Image 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Interview preparation"
                borderRadius="lg"
                boxShadow="lg"
            />
        </Box>
      {/* Features Section */}
      <Box p={{base : 8 , md : 12}} bg="yellow.50">
        <Container maxW="container.xl">
            <Center>
                <Heading as="h2" size="xl" mb={8}>
                    Features that make you Shine*
                </Heading>
            </Center>

            <Flex gap={6} direction={{base : 'column', md : 'row'}}  >
                <Box flex={1} p={4} borderRadius={'lg'} bg={'yellow.100'} borderColor={'transparent'}
                 _hover={{boxShadow : '2xl', borderColor : 'orange.400', transform : 'translateY(-3px)'}} 
                 boxShadow={'lg'} transition="all 0.2s ease-in-out">
                    <Heading as="h3" size="md" mb={4}>
                        AI-Powered Learning
                    </Heading>
                    <Text mb={4}>
                        Get role-s sadkfhakusdpecific interview questions, expand answers on demand, dive deep into concepts,
                        and organize your preparation. Your complete toolkit for interview mastery and career success.
                    </Text>
                </Box>

                <Box flex={1} p={4} borderRadius={'lg'} bg={'yellow.100'} borderColor={'transparent'}
                 _hover={{boxShadow : '2xl', borderColor : 'orange.400', transform : 'translateY(-3px)'}} 
                 boxShadow={'lg'} transition="all 0.2s ease-in-out">
                    <Heading as="h3" size="md" mb={4}>
                        AI-Powered Learning
                    </Heading>
                    <Text mb={4}>
                        Get role-s sadkfhakusdpecific interview questions, expand answers on demand, dive deep into concepts,
                        and organize your preparation. Your complete toolkit for interview mastery and career success.
                    </Text>
                </Box>

                <Box flex={1} p={4} borderRadius={'lg'} bg={'yellow.100'} borderColor={'transparent'}
                 _hover={{boxShadow : '2xl', borderColor : 'orange.400', transform : 'translateY(-3px)'}} 
                 boxShadow={'lg'} transition="all 0.2s ease-in-out">
                    <Heading as="h3" size="md" mb={4}>
                        AI-Powered Learning
                    </Heading>
                    <Text mb={4}>
                        Get role-s sadkfhakusdpecific interview questions, expand answers on demand, dive deep into concepts,
                        and organize your preparation. Your complete toolkit for interview mastery and career success.
                    </Text>
                </Box>
                
            </Flex>
            <Flex gap={6} mt={10} direction={{base : 'column', md : 'row'}}>
                <Box flex={1} p={4} borderRadius={'lg'} bg={'yellow.100'} borderColor={'transparent'}
                 _hover={{boxShadow : '2xl', borderColor : 'orange.400', transform : 'translateY(-3px)'}} 
                 boxShadow={'lg'} transition="all 0.2s ease-in-out">
                    <Heading as="h3" size="md" mb={4}>
                        AI-Powered Learning
                    </Heading>
                    <Text mb={4}>
                        Get role-s sadkfhakusdpecific interview questions, expand answers on demand, dive deep into concepts,
                        and organize your preparation. Your complete toolkit for interview mastery and career success.
                    </Text>
                </Box>
                
                <Box flex={1} p={4} borderRadius={'lg'} bg={'yellow.100'} borderColor={'transparent'}
                 _hover={{boxShadow : '2xl', borderColor : 'orange.400', transform : 'translateY(-3px)'}} 
                 boxShadow={'lg'} transition="all 0.2s ease-in-out">
                    <Heading as="h3" size="md" mb={4}>
                        AI-Powered Learning
                    </Heading>
                    <Text mb={4}>
                        Get role-s sadkfhakusdpecific interview questions, expand answers on demand, dive deep into concepts,
                        and organize your preparation. Your complete toolkit for interview mastery and career success.
                    </Text>
                </Box>
                
            </Flex>
        </Container>

      </Box>

      {/* footer */}
      <Box py={[8, 16]} bg="blue.800" color="white">
        <Container maxW="container.lg">
          <Flex
            direction={['column', 'row']}
            justify="space-between"
            align="center"
            gap={6}
          >
            <Box>
              <Heading as="h2" size="xl" mb={4}>
                Ready to Ace Your Interview?
              </Heading>
              <Text fontSize="lg">
                Join thousands who prepared with InterviewPrepAI.
              </Text>
            </Box>
            <Button
              colorScheme="whiteAlpha"
              size="lg"
              rightIcon={<FiChevronRight />}
            >
              Start Free Trial
            </Button>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;