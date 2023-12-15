import React from "react";
import { Box, Flex, Text, Icon } from "@chakra-ui/react";
import { Home } from "@mui/icons-material";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { RiHomeHeartFill } from "react-icons/ri";
import "./CSS/Footer.css";
import { FaInfoCircle } from "react-icons/fa";
import { FaLaptopCode } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = ({ darkMode }) => {
  const navigate = useNavigate();

  const iconStyles = {
    cursor: "pointer",
    transition: "color 0.3s",
  };

  return (
    <Box
      className="animated-image"
      pos="fixed"
      bottom={0}
      left="50%"
      transform="translateX(-50%)"
      w={{ sm: "100%", md: "50%", lg: "40%" }}
      h={"58px"}
      bg={darkMode ? "black" : "white"}
      color={darkMode ? "white" : "black"}
      borderTopLeftRadius="25px"
      borderTopRightRadius="25px"
    >
      <Flex justify="space-around" p={2}>
        <Box
          className="bottom-nav-action"
          onClick={() => {
            navigate("/");
          }}
          textAlign="center"
          _hover={{ color: darkMode ? "lightblue" : "darkblue" }}
          {...iconStyles}
        >
          <Icon as={RiHomeHeartFill} boxSize={6} />
          <Text
            fontSize={{ base: "none", md: "sm" }}
            marginLeft={{ base: "8px" }}
          >
            Home
          </Text>
        </Box>
        <Box
          className="bottom-nav-action"
          onClick={() => {
            navigate("/about");
          }}
          textAlign="center"
          _hover={{ color: darkMode ? "lightblue" : "darkblue" }}
          {...iconStyles}
        >
          <Icon as={FaInfoCircle} boxSize={6} />
          <Text
            fontSize={{ base: "none", md: "sm" }}
            marginLeft={{ base: "8px" }}
          >
            About
          </Text>
        </Box>
        <Box
          className="bottom-nav-action"
          onClick={() => {
            navigate("/skills");
          }}
          textAlign="center"
          _hover={{ color: darkMode ? "lightblue" : "darkblue" }}
          {...iconStyles}
        >
          <Icon as={FaLaptopCode} boxSize={6} />
          <Text
            fontSize={{ base: "none", md: "sm" }}
            marginLeft={{ base: "8px" }}
          >
            Skills
          </Text>
        </Box>
        <Box
          className="bottom-nav-action"
          onClick={() => {
            navigate("/projects");
          }}
          textAlign="center"
          _hover={{ color: darkMode ? "lightblue" : "darkblue" }}
          {...iconStyles}
        >
          <Icon as={HomeRepairServiceIcon} boxSize={6} />
          <Text
            fontSize={{ base: "none", md: "sm" }}
            marginLeft={{ base: "8px" }}
          >
            Projects
          </Text>
        </Box>
        <Box
          className="bottom-nav-action"
          onClick={() => {
            navigate("/contact");
          }}
          textAlign="center"
          _hover={{ color: darkMode ? "lightblue" : "darkblue" }}
          {...iconStyles}
        >
          <Icon as={ContactMailIcon} boxSize={6} />
          <Text
            fontSize={{ base: "none", md: "sm" }}
            marginLeft={{ base: "8px" }}
          >
            Contact
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Footer;
