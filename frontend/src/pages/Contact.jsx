import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Text,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  color,
  useToast,
} from "@chakra-ui/react";
import { FaPhone, FaEnvelope, FaMapMarker } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Context/DataProvider";
import axios from "axios";

import "./CSS/Contact.css";

const Contact = ({ darkMode }) => {
  const toast =useToast();
  const navigate = useNavigate();
const { userDetails } = useUser();


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
 const handleSubmit = async (event) => {
   event.preventDefault();

   const loadingToastId = toast({
     title: "Sending Message...please wait !!",
     status: "info",
     duration: null, 
     isClosable: false,
     position: "top",
   });

   const config = {
     headers: {
       "Content-Type": "application/json",
     },
   };

   try {
     const { data } = await axios.post(
       "http://127.0.0.1:5000/api/portfolio/message",
       {
         name: formData.name,
         email: formData.email,
         message: formData.message,
       },
       config
     );

     toast.update(loadingToastId, {
       title: "Message Sent Successfully!",
       description: "Thank you for Your message!",
       status: "success",
       duration: 5000,
       isClosable: true,
       position: "top",
     });

     setFormData({ name: "", email: "", message: "" });

     console.log("successful message sent", data);
   } catch (error) {
     console.log("error in sending the message", error);

     toast.update(loadingToastId, {
       title: "Message Sending Failed!",
       description: "Oops! Please try again!",
       status: "error",
       duration: 5000,
       isClosable: true,
       position: "top",
     });
   }
 };


  return (
    <Container>
      <Tabs isFitted variant="enclosed">
        <TabList>
          <Tab color={darkMode ? "white" : "black"}>Contact Form</Tab>
          <Tab color={darkMode ? "white" : "black"}>Contact Information</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Box
              display={"flex"}
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              minHeight="60vh"
              width="100%"
              mx="auto"
              p={2}
              className="contact-form"
              bg={darkMode ? "black" : "white"}
              boxShadow={
                darkMode
                  ? "white 0px 3px 8px"
                  : "rgba(0, 0, 0, 0.35) 0px 5px 15px"
              }
              borderRadius="lg"
            >
              <Text fontSize="3xl" mb={4} fontWeight="bold" color="blue.500">
                Contact Me
              </Text>
              <form onSubmit={handleSubmit} width="100%">
                <FormControl
                  mb={4}
                  width={{ base: "none", lg: "350px" }}
                  color={darkMode ? "white" : "black"}
                >
                  <FormLabel fontSize="lg">Name :</FormLabel>
                  <Input
                    type="text"
                    color={darkMode ? "white" : "black"}
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    size="lg"
                    border={darkMode ? "1px solid white" : "1px solid black"}
                  />
                </FormControl>
                <FormControl mb={4} color={darkMode ? "white" : "black"}>
                  <FormLabel fontSize="lg">Email :</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    color={darkMode ? "white" : "black"}
                    value={formData.email}
                    onChange={handleChange}
                    required
                    border={darkMode ? "1px solid white" : "1px solid black"}
                    size="lg"
                  />
                </FormControl>
                <FormControl mb={4} color={darkMode ? "white" : "black"}>
                  <FormLabel fontSize="lg">Message :</FormLabel>
                  <Textarea
                    rows={4}
                    color={darkMode ? "white" : "black"}
                    border={darkMode ? "1px solid white" : "1px solid black"}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
                <Button
                  colorScheme="blue"
                  type="submit"
                  mt={4}
                  width="100%"
                  fontSize="lg"
                >
                  Send Message
                </Button>
              </form>
            </Box>
          </TabPanel>
          <TabPanel>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              minHeight="60vh"
              width="100%"
              className="contact-form"
              mx="auto"
              mt={8}
              p={2}
              bg={darkMode ? "black" : "white"}
              boxShadow={
                darkMode
                  ? "white 0px 3px 8px"
                  : "rgba(0, 0, 0, 0.35) 0px 5px 15px"
              }
              borderRadius="lg"
            >
              <Text fontSize="3xl" mb={4} fontWeight="bold" color="blue.500">
                Contact Information
              </Text>
              <Box
                mb={2}
                textAlign="center"
                display={"flex"}
                alignItems={"center"}
              >
                <FaPhone size={24} color={darkMode ? "white" : "black"} />
                <Text
                  ml={2}
                  display="inline-block"
                  fontSize="lg"
                  color={darkMode ? "white" : "black"}
                >
                  {userDetails && userDetails.phone}
                </Text>
              </Box>
              <Box
                mb={2}
                textAlign="center"
                display={"flex"}
                alignItems={"center"}
              >
                <FaEnvelope size={24} color={darkMode ? "white" : "black"} />
                <Text
                  ml={2}
                  display="inline-block"
                  fontSize="lg"
                  color={darkMode ? "white" : "black"}
                >
                  {userDetails && userDetails.email}
                </Text>
              </Box>
              <Box
                mb={2}
                textAlign="center"
                display={"flex"}
                alignItems={"center"}
              >
                <FaMapMarker size={24} color={darkMode ? "white" : "black"} />
                <Text
                  ml={2}
                  display="inline-block"
                  fontSize="lg"
                  color={darkMode ? "white" : "black"}
                >
                  {userDetails && userDetails.address}
                </Text>
              </Box>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default Contact;
