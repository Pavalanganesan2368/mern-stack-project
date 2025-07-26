import { Button, Container, Flex, HStack, Text, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { BiPlusCircle } from 'react-icons/bi'
import { IoMoon, IoSunny } from 'react-icons/io5'
import { LuSun } from 'react-icons/lu'
import { Link } from 'react-router-dom'
const NavBar = () => {

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxWidth={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base:"column",
          sm:"row"
        }}
      >
        <Text
          fontSize={{base : "22", sm : "28"}}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
        >
          <Link to={"/"}>Product Store</Link>
        </Text>
        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button>
              <BiPlusCircle fontSize={"20"}/>
            </Button>
          </Link>

          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? <IoMoon /> : <LuSun size={"20"}/>}
          </Button>
        </HStack>
      </Flex>
    </Container>
  )
}

export default NavBar