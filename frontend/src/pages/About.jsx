import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Text,
  SimpleGrid,
  Container,
  Heading,
  Image,
  Center,
} from "@chakra-ui/react";
import { useUser } from "../Context/DataProvider";
import { useNavigate } from "react-router-dom";


import Card from "./Card.jsx";
import "./CSS/About.css"; // Import the CSS file

const About = ({ darkMode }) => {
  const navigate = useNavigate();
  const {userDetails} = useUser();
  const [animationComplete, setAnimationComplete] = useState(false);
  const [educations, setEducations]= useState();

  useEffect(() => {
    const delay = 100;
    const timeoutId = setTimeout(() => {
      setAnimationComplete(true);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, []);



  useEffect(() => {
    const details = async () => {
      await fetch("http://127.0.0.1:5000/api/portfolio/educations")
        .then((response) => response.json())
        .then((data) => {
          setEducations(data);
        })
        .catch((error) => {
          console.error("error fetching the education data");
        });
    };
    details();
    
  }, [navigate]);



  return (
    <Box padding={{ base: "50px", md: "70px" }}>
      <Box>
        <Stack direction={{ base: "column", md: "row" }} spacing={8}>
          <Box
            className={`about-text-container ${
              animationComplete ? "fade-in" : ""
            }`}
            maxW={{ md: "800px" }}
          >
            <Heading
              as="h1"
              fontFamily="Bree Serif"
              fontSize={{ base: "3xl", md: "4xl" }}
              color={darkMode ? "lightblue" : "blue.700"}
            >
              About Me:
            </Heading>
            <Text
              variant="body1"
              fontFamily="Fira Sans"
              mt={4}
              textAlign={{ base: "justify", md: "center" }}
              color={darkMode ? "white" : "black"}
              letterSpacing="0.5px"
              wordBreak={{ base: "break-all", md: "none" }}
              fontSize="lg"
            >
              "I am{" "}
              <Text
                as="span"
                color={darkMode ? "lightblue" : "blue.700"}
                fontWeight="bold"
              >
                {userDetails && userDetails.name}
              </Text>
              , a 23-year-old Bachelor of Science student majoring in CSIT. I
              have hands-on coding experience and specialize as a MERN stack
              developer. My enthusiasm for technology drives me to stay updated
              and explore new solutions in the dynamic field of computer
              science."
            </Text>
          </Box>

          <Box
            className={`about-image-container ${
              animationComplete ? "slide-in" : ""
            }`}
            height={{ md: "250px" }}
            maxW={{ md: "500px" }}
          >
            <Center>
              <Image
                display={{ md: "none", lg: "inline-block" }}
                className="animated-image"
                src={userDetails && userDetails.images[1]}
                alt="Nabin's photo"
                borderRadius="full"
                border="2px solid lightblue"
                boxSize="200px"
              />
            </Center>
          </Box>
        </Stack>

        <Heading
          color={darkMode ? "lightblue" : "blue.700"}
          as="h2"
          fontFamily="Bree Serif"
          mt={9}
          fontSize={{ base: "2xl", md: "4xl" }}
        >
          Education:
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} mt={8}>
          {educations &&
            educations.map((education, index) => (
              <Card
                key={index} 
                darkMode={darkMode}
                image={education.image}
                title={education.name}
                content={education.description}
              />
            ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default About;
