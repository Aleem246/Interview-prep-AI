import React, { useState } from 'react';
import {
  Badge,
  Box,Button,Center,Checkbox,Container,
  Flex,    Heading,
  Image,  Text,
  useDisclosure,
  
} from '@chakra-ui/react';
import { authActions } from '../store/auth';
import {  FiChevronRight } from 'react-icons/fi';
import {  useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AuthModal from './InterviewPrep/components/AuthModal';
import img from "../assets/image.png"

const LandingPage = () => {
  const Navigate = useNavigate();
  const{isOpen , onClose , onOpen} = useDisclosure();
  const [activeTab , setActiveTab] = useState(0); //0 for login , 1 for signup
  const isLoggedin = useSelector((state) => state.auth.isLoggedIn);
  return (

    <Box>

      {/* Hero Image Section */}
      <Box bgGradient="linear(to-r, #fff4b3ff , #e7aa49b4)" py={{base: 8,md :16}}>
        <Container maxW="container.lg" >
          <Flex
            direction={{base : 'column', md: 'row'}}
            align="center"
           
            justify="space-between"
            gap={{base : 8 , md: 16}}
          >
            <Box flex={1}>
                <Badge colorScheme="orange" variant={'solid'} borderRadius="full" px={4} py={1}>AI Powered</Badge>
                <Heading as="h1" size={{base : 'md', md : 'xl'}} fontWeight='semibold'  mb={4}>
                  Ace Interviews with 
                  <br/>  <span style={{color : " #e64d00da "                  
                  }}>AI-Powered </span> 
                  Learning
                </Heading>
            </Box>

            <Flex flex={1} direction={'column'} justify={{base : 'center', md: 'flex-start'}}>
              <Text fontSize={{ base : 'md', md: 'lg'}}  mb={6}>
                Get role-specific interview questions, expand answers on demand, dive deep into concepts, 
                and organize your preparation. Your complete toolkit for interview mastery and career success.
              </Text>

              <Button
                colorScheme="orange"
                size="md"
                maxW={{ base: 'full', md: '40%' }}
                onClick={()=>(!isLoggedin)? onOpen() : Navigate('/dashboard')}
                borderRadius={'full'}
                rightIcon={<FiChevronRight />}
              >
                Get Started
              </Button>

            </Flex>

          </Flex>
        </Container>
      </Box>

      {/* login / signup modal  */}
        <AuthModal isOpen={isOpen} onOpen={onOpen}  onClose={onClose} activeTab={activeTab} setActiveTab={setActiveTab}/>

        {/* image section */}
        <Box flex={1}  mx={'auto'} px={4} py={6} bgGradient={"linear(to-r, #fff4b3ff , #feeccaff, #ffdc9aff)"}>
          
            <Image 
                src={img} w={'60%'} h={'auto'}
                alt="Interview preparation"
                borderRadius="lg"
                mx={'auto'}
                objectFit={'cover'}
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
                        Tailored Just for You
                    </Heading>
                    <Text mb={4}>
                        Get interview questions and model answers based on your role, 
                        experience, and specific focus areas no generic practice here
                    </Text>
                </Box>

                <Box flex={1} p={4} borderRadius={'lg'} bg={'yellow.100'} borderColor={'transparent'}
                 _hover={{boxShadow : '2xl', borderColor : 'orange.400', transform : 'translateY(-3px)'}} 
                 boxShadow={'lg'} transition="all 0.2s ease-in-out">
                    <Heading as="h3" size="md" mb={4}>
                        Learn at Your Own Pace
                    </Heading>
                    <Text mb={4}>
                        Expand answers only when you're ready. Dive deeper into any
                         concept instantly with AI-powered detailed explanations.

                    </Text>
                </Box>

                <Box flex={1} p={4} borderRadius={'lg'} bg={'yellow.100'} borderColor={'transparent'}
                 _hover={{boxShadow : '2xl', borderColor : 'orange.400', transform : 'translateY(-3px)'}} 
                 boxShadow={'lg'} transition="all 0.2s ease-in-out">
                    <Heading as="h3" size="md" mb={4}>
                        Capture Your Insights
                    </Heading>
                    <Text mb={4}>
                        Add personal notes to any question and pin important ones to 
                        the top — making your learning more organized and impactful.
                    </Text>
                </Box>
            </Flex>
            <Flex gap={6} mt={10} direction={{base : 'column', md : 'row'}}>
                <Box flex={1} p={4} borderRadius={'lg'} bg={'yellow.100'} borderColor={'transparent'}
                 _hover={{boxShadow : '2xl', borderColor : 'orange.400', transform : 'translateY(-3px)'}} 
                 boxShadow={'lg'} transition="all 0.2s ease-in-out">
                    <Heading as="h3" size="md" mb={4}>
                        Understand the 'Why' Behind Answers
                    </Heading>
                    <Text mb={4}>
                        Beyond just answers — unlock detailed concept 
                        explanations generated by AI, helping you truly master each topic.

                    </Text>
                </Box>
                
                <Box flex={1} p={4} borderRadius={'lg'} bg={'yellow.100'} borderColor={'transparent'}
                 _hover={{boxShadow : '2xl', borderColor : 'orange.400', transform : 'translateY(-3px)'}} 
                 boxShadow={'lg'} transition="all 0.2s ease-in-out">
                    <Heading as="h3" size="md" mb={4}>
                        Save, Organize, and Revisit
                    </Heading>
                    <Text mb={4}>
                      Easily save your interview sets, access them neatly in your dashboard, and pick up your preparation right where you left off.
                    </Text>
                </Box>
                
            </Flex>
        </Container>

      </Box>

      {/* footer */}
      <Box py={[8, 16]} bgGradient="linear(to-b, yellow.50, yellow.100)"  color="Black">
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
                Prepare smarter, interview better, and land your dream job.
              </Text>
            </Box>
            <Button
              colorScheme="orange"
              size="lg"
              rightIcon={<FiChevronRight />}
              onClick={()=>(isLoggedin ? Navigate('/dashboard') : onOpen())}
            >
              Let's go
            </Button>
          </Flex>
        </Container>
      </Box>

     
    </Box>
  );
};

export default LandingPage;