import { 
  Box, 
  Flex, 
  FormControl, 
  FormLabel, 
  Input, 
  InputGroup, 
  InputRightElement, 
  Button, 
  Heading, 
  Text,
  Checkbox,
  useToast,
  Stack,
  Link
} from '@chakra-ui/react';
// import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { Navigate, Link as RouterLink, useNavigate } from 'react-router-dom';
// import axios from 'axios';


export default function signUp({setActiveTab, onclose}) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    address: ''
  });

  useEffect(()=>{
    window.scrollTo(0, 0);
    
  },[])
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    
    const submit = async()=>{
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/sign-up`, formData);    

          toast({
              title: 'Account created.',
            description: response.data.message,
            status: 'success',
            position:'top',
              duration: 5000,
              isClosable: true,
      });
    onclose();
    navigate('/log-in');
  } catch (error) {
    setTimeout(() => {
      toast({
        title: 'Error',
        description: error.response.data.message,
        status: 'error',
        duration: 5000,
        position:'top',
        isClosable: true,
      });
      setIsSubmitting(false);
    }, 1500);
    console.error(error);
  }finally{
    setIsSubmitting(false);
  }
    }
    submit();
  };

  return (
    <Flex  align="center" justify="center" bg="gray.50" py={4}>
      <Box 
        w="100%" maxW="md" p={8} 
        borderWidth={1} borderRadius="lg" 
        bg="white" boxShadow="xl"
      >
        <Heading as="h1" size="xl" mb={2} textAlign="center">
          SignUp
        </Heading>
        
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            {/* Username Field */}
            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input 
                type="text" 
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                focusBorderColor="blue.500"
              />
            </FormControl>

            {/* Email Field */}
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                focusBorderColor="blue.500"
              />
            </FormControl>

            {/* Password Field */}
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create password"
                  focusBorderColor="blue.500"
                />
                <InputRightElement h="full">
                  <Button
                    variant="ghost"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {/* {showPassword ? <ViewOffIcon /> : <ViewIcon />} */}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            {/* Address Field
            <FormControl id="address" isRequired>
              <FormLabel>Address</FormLabel>
              <Input 
                type="text" 
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Your full address"
                focusBorderColor="blue.500"
              />
            </FormControl> */}

            {/* Terms Checkbox */}
            <FormControl>
              <Checkbox colorScheme="blue" isRequired>
                I agree to the{' '}
                <Link as={RouterLink} to="/#" color="blue.500">
                  Terms & Conditions
                </Link>
              </Checkbox>
            </FormControl>

            {/* Submit Button */}
            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              fontSize="md"
              isLoading={isSubmitting}
              loadingText="Creating account..."
              w="full"
              mt={4}
            >
              Sign Up
            </Button>
          </Stack>
        </form>

        <Text mt={4} textAlign="center">
          Already have an account?{' '}
         
          <Button variant={'link'} colorScheme='orange' onClick={()=>{setActiveTab(0)}}>Login</Button>
            
          
        </Text>
      </Box>
    </Flex>
  );
}