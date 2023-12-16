import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../Context/DataProvider";
const LoginAdmin = ({ darkMode }) => {
  const navigate = useNavigate();
  const {token} = useUser();
  const toast = useToast();

  useEffect(() => {
    if (token) {
      navigate("/adminpanel");
    }
  }, [token]);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    pin: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(loginData);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "https://portfoliobackend-wv3s.onrender.com/api/admin/login",
        JSON.stringify({
          email: loginData.email,
          password: loginData.password,
          pin: loginData.pin,
        }),
        config
      );
     sessionStorage.setItem("token", JSON.stringify(data));
      console.log("successful login");
      navigate("/adminpanel");
       toast({
         title: "WELCOME TO ADMIN PANEL !",
         description: data.message,
         status: "success",
         duration: 5000,
         isClosable: true,
         position: "top",
       });
    } catch (error) {
      console.error(" error in login ");
       toast({
         title: "LOGIN FAILED!",
         description: "Internal server error",
         status: "error",
         duration: 5000,
         isClosable: true,
         position: "top",
       });
    }
  };

  return (
    <Container>
      <Box
        p={8}
        mt={7}
        maxWidth="md"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        bg={darkMode ? "gray.800" : "white"}
        color={darkMode ? "white" : "black"}
      >
        <Heading mb={4} textAlign="center" color="blue.500">
          Login
        </Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                color={darkMode ? "white" : "black"}
                borderColor={darkMode ? "white" : "black"}
                _focus={{ borderColor: "blue.500" }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                color={darkMode ? "white" : "black"}
                borderColor={darkMode ? "white" : "black"}
                _focus={{ borderColor: "blue.500" }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Pin</FormLabel>
              <Input
                type="number"
                name="pin"
                value={loginData.pin}
                onChange={handleChange}
                color={darkMode ? "white" : "black"}
                borderColor={darkMode ? "white" : "black"}
                _focus={{ borderColor: "blue.500" }}
              />
            </FormControl>
            <Button
              type="submit"
              colorScheme="blue"
              variant="solid"
              width="full"
            >
              Login
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};

export default LoginAdmin;
