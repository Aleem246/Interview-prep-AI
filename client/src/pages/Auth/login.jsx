import { 
  Box,   Flex,   FormControl,   FormLabel,   Input, 
  InputGroup,   InputRightElement,   Button, 
  Heading,   Text,  Stack,  useToast,
  Link,  Checkbox
} from '@chakra-ui/react';
// import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import { useEffect } from 'react';

const login=( {setActiveTab, onclose})=> {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });


  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])

  // const [rememberMe, setRememberMe] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    
    const submit = async () => {
      try {
        const response = await axios.post(`http://localhost:8081/api/auth/login`, formData);


          console.log(response.data);
          toast({
            title: 'Login successful',
            description: 'You have successfully logged in',
            status: 'success',
            duration: 5000,
            position:'top',
            isClosable: true,
          });
          // console.log(response);
          dispatch(authActions.login());
          
          localStorage.setItem("id" , response.data._id);
         onclose();
          localStorage.setItem("token", response.data.token);
          navigate('/');

          // Navigate to home or dashboard page
        
      } catch (err) {
        setTimeout(() => {
          toast({
            title: "Error",
            description: err?.response?.data?.message || err?.message|| 'An error occurred',
            status: 'error',
            duration: 5000,
            position: 'top',
            isClosable: true,
          });
        }, 1500);
        console.error(err);
      } finally {
        setIsSubmitting(false);
      }
    }

    submit();
  }

  return (
    <Flex  align="center" justify="center"  py={8}>
      <Box 
        w="100%" 
        maxW="md" 
        p={8} 
        borderWidth={1} 
        borderRadius="lg" 
        bg="white"
        boxShadow="lg"
      >
        <Heading textAlign="center" as="h2" size="lg" mb={4}>
          Login
        </Heading>
        
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            {/* Username Field */}
            <FormControl id="email" isRequired>
              <FormLabel>Username </FormLabel>
              <InputGroup>
              <Input 
                type="text" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your username"
                focusBorderColor="blue.500"
                
                />
                </InputGroup>
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
                  placeholder="Enter your password"
                  focusBorderColor="blue.500"
                  
                />
                
              </InputGroup>
            </FormControl>

            {/* Remember Me & Forgot Password */}
            {/* <Flex justify="space-between" align="center">
              <Checkbox 
                colorScheme="blue" 
                isChecked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              >
                Remember me
              </Checkbox>
              <Link as={RouterLink} to="/forgot-password" color="blue.500">
                Forgot password?
              </Link>
            </Flex> */}

            {/* Submit Button */}
            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              fontSize="md"
              isLoading={isSubmitting}
              loadingText="Logging in..."
              w="full"
              mt={4}
            >
              Log In
            </Button>
          </Stack>
        </form>

        <Text mt={4} textAlign="center">
          Don't have an account?{' '}
            <Button variant={'link'} colorScheme="orange" onClick={() => setActiveTab(1)}>Sign up</Button>
            
          
        </Text>
      </Box>
    </Flex>
  );
  }

  export default login;