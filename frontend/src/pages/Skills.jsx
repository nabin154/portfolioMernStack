import React ,{useState,useEffect} from "react";
import {
  Avatar,
  Box,
  CircularProgress,
  List,
  ListItem,
  Text,
  Grid,
  Heading,
} from "@chakra-ui/react";
import { SiChakraui } from "react-icons/si";
import { useNavigate } from "react-router-dom";

import "./CSS/Skills.css"

const Skills = ({ darkMode }) => {
const navigate = useNavigate();

  const textColor = darkMode ? "white" : "black";
  const progressBarColor = darkMode ? "blue" : "green.500";
   const [animationComplete, setAnimationComplete] = useState(false);
 const [skillsData, setSkillsData] = useState();
 

  useEffect(() => {
    const details = async () => {
      await fetch(
        "https://portfoliobackend-wv3s.onrender.com/api/portfolio/skills"
      )
        .then((response) => response.json())
        .then((data) => {
          setSkillsData(data);
        })
        .catch((error) => {
          console.error("error fetching the skills data");
        });
    };
    details();
  }, [navigate]);



   useEffect(() => {
     const delay = 100;
     const timeoutId = setTimeout(() => {
       setAnimationComplete(true);
     }, delay);

     return () => clearTimeout(timeoutId);
   }, []);

  return (
    <Box
      padding={14}
      className={`skills-container ${animationComplete ? "fade-in" : ""}`}
    >
      <Heading
        as="h2"
        fontFamily="Bree Serif"
        letterSpacing={"1px"}
        fontSize="38px"
        color={darkMode ? "lightblue" : "darkblue"}
      >
        Skills :
      </Heading>
      {skillsData && (
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)", 
            lg: "repeat(3, 1fr)", 
          }}
          gap={8}
          marginTop={5}
          padding={8}
        >
          {Array.from(new Set(skillsData.map((skill) => skill.category))).map(
            (category, index) => (
              <SkillsList title={category} key={index} textColor={textColor}>
                {skillsData
                  .filter((skill) => skill.category === category)
                  .map((skill, index) => (
                    <SkillItem
                      key={index}
                      iconSrc={skill.iconLink}
                      label={skill.skillName}
                      percentage={skill.percentage}
                      textColor={textColor}
                      progressBarColor={progressBarColor}
                    />
                  ))}
              </SkillsList>
            )
          )}
        </Grid>
      )}
    </Box>
  );
};

const SkillsList = ({ title, children, textColor }) => {
  return (
    <Box className={`skills-list-container fade-in`}>
      <Text as="h4" fontFamily="Bree Serif" fontSize="29px" color={"blue.700"} textTransform={"capitalize"}>
        {title}
      </Text>
      <List mt={5}>{children}</List>
    </Box>
  );
};

const SkillItem = ({
  iconSrc,
  label,
  percentage,
  textColor,
  progressBarColor,
}) => {
  return (
    <ListItem display="flex" alignItems="center">
      <Avatar src={iconSrc} size="sm" mr={2} />
      <Text style={{ color: textColor ,textTransform:"capitalize"}}>{label}</Text>
      <Box display="flex" alignItems="center" ml="auto">
        <CircularProgress
          value={percentage}
          size={14}
          thickness={5}
          color={progressBarColor}
          ml={2}
        />
        <Text fontFamily="Bree Serif" fontSize="12px" ml={1} color={textColor}>
          {percentage}%
        </Text>
      </Box>
    </ListItem>
  );
};

export default Skills;
