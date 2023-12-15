import React ,{useState,useEffect} from "react";
import { Box, Button, Container, Heading, Text, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import "./CSS/Home.css";
import { useUser } from "../Context/DataProvider";
const Home = ({ darkMode }) => {
  const navigate = useNavigate();
 const [animationComplete, setAnimationComplete] = useState(false);
const {userDetails} = useUser();
 useEffect(() => {
   const delay = 100;
   const timeoutId = setTimeout(() => {
     setAnimationComplete(true);
   }, delay);

   return () => clearTimeout(timeoutId);
 }, []);

 const handleDownloadCV = () => {
    const cvFile = "/pdf/nabinpdf.pdf";
    const link = document.createElement("a");

    link.href = cvFile;
    link.download = "nabin_cv.pdf";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  };

  return (
    <Box
      as="section"
      bg={darkMode ? "black" : "white"}
      color={darkMode ? "white" : "black"}
      overflow="hidden"
    >
      <Box
        className={`home-text-container ${animationComplete ? "fade-in" : ""}`}
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        justifyContent={{ base: "center", md: "space-evenly" }}
        alignItems="flex-start"
        paddingY="25px"
        paddingX="30px"
        minHeight="500px"
        overflow="hidden"
      >
        <Box
          width={{ base: "100%", md: "500px" }}
          minHeight={{ base: "auto", md: "200px" }}
          overflow="hidden"
        >
          <Text fontSize={{ base: "lg", md: "xl" }}>Hello,</Text>
          <Heading
            className="home-nabin"
            fontSize={{ base: "4xl", md: "5xl" }}
            marginTop="33px"
            fontFamily="Sacramento"
            letterSpacing="1px"
            fontWeight="600"
            textShadow={
              darkMode ? "blue 0.5px 0 10px" : "lightblue 0.5px 0 3px"
            }
          >
            It's me {userDetails&& userDetails.name.split(" ")[0]} 
            <Text color={darkMode ? "lightblue" : "darkblue"} as="span">
              {` `} {userDetails&& userDetails.name.split(" ")[1]}
            </Text>
          </Heading>
          <Heading
            fontSize={{ base: "3xl", md: "4xl" }}
            className="animated-text"
            marginTop="27px"
            fontFamily="Patua One"
            letterSpacing={"1.5px"}
            fontWeight="600"
          >
            " I am a full stack{" "}
            <Text color={darkMode ? "lightblue" : "darkblue"} as="span">
              MERN -{" "}
            </Text>
            Developer "
          </Heading>
          <Text
            fontSize={{ base: "lg", md: "xl" }}
            fontFamily="Fira Sans"
            marginTop={{ base: "33px", md: "22px" }}
            fontWeight="400"
            letterSpacing="0.5px"
            lineHeight={{ base: "25px", md: "30px" }}
          >
            "Passionate MERN stack developer with expertise in building scalable
            web applications. Committed to continuous learning, innovation, and
            delivering impactful solutions in the ever-evolving tech landscape."
          </Text>

          <Box display="flex" marginTop={{ base: "40px", md: "28px" }}>
            <Button
              className="btn"
              colorScheme="blue"
              onClick={() => navigate("/contact")}
            >
              Contact Me
            </Button>
            <Button
              className="btn"
              onClick={handleDownloadCV}
              colorScheme="blue"
              marginLeft="14px"
            >
              Download CV
            </Button>
          </Box>
        </Box>

        <Box
          className={`home-image-container ${
            animationComplete ? "fade-in" : ""
          } home-image`}
          overflow="hidden"
          display={{ base: "block", md: "block" }}
          mt={{ base: "34px", md: "none" }}
          pb={{ base: "45px", md: "none" }}
          ml={{ base: "40px", md: "none" }}
        >
          <Image
            src={userDetails&& userDetails.images[0]}
            alt="nabin photo"
            height={{ base: "230px", md: "320px" }}
            width="auto"
            maxW="100%"
            borderRadius={{ base: "25%", md: "50%" }}
            border={darkMode ? "5px solid white" : "5px solid lightblue"}
            objectFit="cover"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
