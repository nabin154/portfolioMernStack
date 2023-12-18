import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Button,
  Grid,
  Image,
  Heading,
  SimpleGrid,
  HStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@chakra-ui/react";
import "./CSS/Projects.css";
import { useNavigate } from "react-router-dom";
const Projects = ({ darkMode }) => {
  const navigate = useNavigate();

  const [projectsData, setProjectsData] = useState();

  useEffect(() => {
    const details = async () => {
      await fetch(
        "https://portfoliobackend-wv3s.onrender.com/api/portfolio/projects"
      )
        .then((response) => response.json())
        .then((data) => {
          setProjectsData(data);
        })
        .catch((error) => {
          console.error("error fetching the projects data");
        });
    };
    details();
  }, [navigate]);

  return (
    <Box padding={8}>
      <Heading
        as="h2"
        fontFamily="Bree Serif"
        fontSize="35px"
        mb={8}
        color={darkMode ? "lightblue" : "blue.700"}
      >
        Projects
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={8}>
        {projectsData &&
          projectsData.map((project, index) => (
            <ProjectCard key={index} project={project} darkMode={darkMode} />
          ))}
      </SimpleGrid>
    </Box>
  );
};

const ProjectCard = ({ project, darkMode }) => {
  const { name, description, image, githubLink, livedemoLink } = project;
  const [expanded, setExpanded] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const delay = 100;
    const timeoutId = setTimeout(() => {
      setAnimationComplete(true);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <Box
      className={`card ${animationComplete ? "fade-in" : ""}`}
      borderWidth="1px"
      borderRadius="lg"
      height={"500px"}
      overflowY="scroll"
    >
      <Image src={image} alt={name} />

      <Box p={6}>
        <Heading
          as="h4"
          fontSize="24px"
          color={darkMode ? "lightblue" : "blue.700"}
          mb={4}
        >
          {name}
        </Heading>
        <Text
          fontFamily="Work Sans"
          mb={4}
          color={darkMode ? "white" : "black"}
        >
          {expanded ? description : `${description.slice(0, 100)}...`}
        </Text>
        {description.length > 100 && (
          <Button
            variant={"outlined"}
            onClick={toggleExpand}
            mb={4}
            color={"blue.600"}
          >
            {expanded ? "Read Less" : "Read More"}
          </Button>
        )}
        <HStack spacing={4}>
          <Button as="a" href={githubLink} target="_blank" colorScheme="blue">
            View Github
          </Button>
          <Button as="a" href={livedemoLink} target="_blank" colorScheme="red">
            Live Demo
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};

export default Projects;
