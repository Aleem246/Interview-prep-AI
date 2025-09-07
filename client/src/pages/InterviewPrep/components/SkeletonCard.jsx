import { Skeleton, SkeletonText, Stack } from '@chakra-ui/react'
import React from 'react'

const SkeletonCard = () => {
  return (
    
    <Stack padding={2} spacing={1}>
        <Skeleton height='20px'/>

      <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
    </Stack>
  )
}

export default SkeletonCard