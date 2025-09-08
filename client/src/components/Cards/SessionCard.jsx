import React from "react";
import { Box, Text, IconButton, Flex, Badge, AlertDialog,
   AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, 
   AlertDialogFooter, Button, 
   useDisclosure,
   Skeleton,
   SkeletonText} from "@chakra-ui/react";
// import { DeleteIcon } from "@chakra-ui/icons";
import moment from "moment";
import {FaTrash} from 'react-icons/fa'
import { Link } from "react-router-dom";
const SessionCard = ({ data, index, onDelete , isLoading }) => {

    const {isOpen : isOpenAlert , onOpen : onOpenAlert, onClose : onCloseAlert} = useDisclosure();

    const getTitleChars = (title) => {
        let role = title.split(" ");
        
        return role.length >=2 ? (role[0].charAt(0)+role[1].charAt(0)) : (title.substring(0,2));        
    }
    const colors = ["red.100", "green.100","orange.100", "blue.200", "purple.100"];
    const bgcolor = colors[index % 5]; 
    
  return (
    
      <Box
        position="relative"
        p={4}
        borderWidth="1px"
        borderRadius="lg"
        bg="white"
        boxShadow="md"
        role="group" // important for hover
        transition="all 0.2s"
        _hover={{ boxShadow: "xl" }}
      >
        {/* Delete button (only visible on hover) */}
        <IconButton
          aria-label="Delete"
          icon={<FaTrash />}
          size="sm"
          colorScheme="red"
          position="absolute"
          top={2}
          right={2}
          opacity={0}
          _groupHover={{ opacity: 1 }} // appear on hover
          onClick={(e)=>{
              e.stopPropagation();
              e.preventDefault();
              onOpenAlert();
              
          }}
        />

      
        <Link to={`/interview-prep/${data._id}`}>
        
        {/* Top Section */}
            <Flex align="center" mb={3} bg={bgcolor} p={4}  borderRadius="md">
              <Box
                bg="white"
                w="40px"
                h="40px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="md"
                fontWeight="bold"
              >
                {
                  getTitleChars(data.role).toUpperCase()  
                }
              </Box>

              <Box ml={3} >
                <Text fontWeight="bold">{data.role}</Text>

                <Text fontSize="sm" color="gray.600">
                  {data?.topicsToFocus}
                </Text>
              </Box>
            </Flex>

            {/* Badges Section */}
            <Flex gap={2} wrap="wrap" mb={3}>
              <Badge px={3} py={1} borderRadius="full">
                Experience: {data?.experience}
              </Badge>

              <Badge px={3} py={1} borderRadius="full">
                {data?.questions?.length} Q&A
              </Badge>

              <Badge px={3} py={1} borderRadius="full">
                Last Updated:{" "}
                {data?.updatedAt
                  ? moment(data.updatedAt).format("Do MMM YYYY")
                  : "N/A"}
              </Badge>

            </Flex>

            {/* Description */}
            {/* <Text fontSize="sm"  fontWeight="semibold">
              {data?.desc}
            </Text> */}


        </Link>
        {/* delete alert dialogue box */}
        <AlertDialog
          isOpen={isOpenAlert}
          onClose={onCloseAlert}
          isCentered
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Delete Session
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? You want to delete this session?
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button  onClick={onCloseAlert}>
                  Cancel
                </Button>
                <Button colorScheme='red' onClick={()=>{
                  onDelete(data._id)
                  onCloseAlert()
                }
                  } ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Box>
    

    
  );
};

export default SessionCard;
