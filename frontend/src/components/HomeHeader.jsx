import React from "react";
import { Box, Flex, Text, IconButton, Switch } from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import "./CSS/HomeHeader.css"
import {useUser} from "../Context/DataProvider";

const HomeHeader = ({ darkMode, changeDarkMode }) => {
const navigate = useNavigate();
const {userDetails} = useUser();

  const socialMediaLinks = {
    facebook: `${userDetails && userDetails.links[0].url}`,
    instagram: `${userDetails && userDetails.links[1].url}`,
    github: `${userDetails && userDetails.links[2].url}`,
    linkedin: `${userDetails && userDetails.links[3].url}`,
  };

  return (
    <Box as="header" bg={darkMode ? "black" : "#dcdde1"} boxShadow="md">
      <Flex
        align="center"
        justify="space-between"
        p={4}
        maxW="1200px"
        mx="auto"
        flexWrap="wrap"
      >
        <Box display={"flex"}>
          <FavoriteIcon className="heartbeat-animation" />
          <Text
            as="a"
            onClick={() => {
              navigate("/");
            }}
            fontFamily="Sacramento"
            fontSize={{ base: "xl", sm: "xl", md: "xl", lg: "xl" }}
            color={darkMode ? "white" : "black"}
            textShadow={"blue 1px 0 8px"}
            cursor={"pointer"}
            ml={1}
          >
            {userDetails && userDetails.name.split(" ")[0]}
            <Text display={{ base: "none", md: "inline" }} ml={2}>
              {userDetails && userDetails.name.split(" ")[1]}
            </Text>
          </Text>
        </Box>

        <Flex align="center" mt={{ base: 4, md: 0 }}>
          <IconButton
            color={darkMode ? "white" : "black"}
            as="a"
            background="transparent"
            href={socialMediaLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            icon={<FaFacebook size={28} />}
            _hover={{ color: "lightblue" }}
          />
          <IconButton
            color={darkMode ? "white" : "black"}
            as="a"
            background="transparent"
            href={socialMediaLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            _hover={{ color: "lightblue" }}
            icon={<FaInstagram size={28} />}
          />
          <IconButton
            color={darkMode ? "white" : "black"}
            as="a"
            background="transparent"
            href={socialMediaLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            _hover={{ color: "lightblue" }}
            icon={<FaGithub size={28} />}
          />
          <IconButton
            color={darkMode ? "white" : "black"}
            as="a"
            background="transparent"
            href={socialMediaLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            _hover={{ color: "lightblue" }}
            icon={<FaLinkedin size={28} />}
          />

          <Box display="flex" alignItems="center" mt={{ base: 4, md: 0 }}>
            <Switch
              ml={8}
              colorScheme={"blue"}
              onChange={changeDarkMode}
              isChecked={darkMode}
              size={{ base: "sm", md: "md" }}
            />
            <Text variant="body2" color={darkMode ? "white" : "black"} ml="2">
              {darkMode ? "Dark" : "Light"}
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default HomeHeader;
