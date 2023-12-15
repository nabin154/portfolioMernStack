import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Badge,
  Flex,
  IconButton,
  Spacer,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useUser } from "../../Context/DataProvider";
import axios from "axios";

const AdminMessages = ({ darkMode }) => {

   const textcolor = darkMode ? "white" : "black";
   const bgColor = darkMode ? "white" : "black";
  const toast = useToast();
  const { token } = useUser();
  const [messages, setMessages] = useState();

  const handleClick = async (msg) => {
    let id = msg._id;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(
        `http://127.0.0.1:5000/api/admin/messagedelete/${id}`,
        config
      );
      toast({
        title: "message deleted!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "message delete failed",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  useEffect(() => {
    const fetchMessage = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await axios.get(
          "http://127.0.0.1:5000/api/admin/messages",
          config
        );
        setMessages(data);
      } catch (error) {
        console.log("error fetching the messages");
      }
    };

    fetchMessage();
  }, [token, handleClick]);

  return (
    <Box p={4}>
      {messages &&
        messages.map((message) => (
          <Flex
            key={message._id}
            p={3}
            borderBottom="1px"
            borderBottomColor="gray.200"
            alignItems="flex-start"
          >
            <Box flex="1">
              <Text fontSize="lg" fontWeight="bold" color={"blue.600"}>
                {message.name}
              </Text>
              <Text color="gray.500" fontSize="sm">
                {message.email}
              </Text>
              <Text color={textcolor} mt={2}>
                {message.message}
              </Text>
            </Box>
            <Spacer />
            <Box>
              <Tooltip label={"Delete"}>
                <IconButton
                  icon={<RiDeleteBin6Fill  color="red" size={"25px"}/>}
                 
                  variant="ghost"
                  aria-label="Delete"
                  mr={2}
                 
                  onClick={() => handleClick(message)}
                />
              </Tooltip>
            </Box>
          </Flex>
        ))}
    </Box>
  );
};

export default AdminMessages;
