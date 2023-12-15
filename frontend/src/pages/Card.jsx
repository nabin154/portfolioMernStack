import React, { useEffect, useState } from "react";
import { Box, Image, Heading, Text } from "@chakra-ui/react";
import "./CSS/Card.css";

const Card = ({ image, title, content, darkMode }) => {
  const [animationComplete, setAnimationComplete] = useState(false);

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
      borderRadius="lg"
      overflow="hidden"
    >
      <Image
        src={image}
        alt={`${title} Image`}
        height="200px"
        width={"100%"}
        objectFit="cover"
      />
      <Box p={{ base: "2", md: "5" }}>
        <Heading as="h4" size="md" color={darkMode ? "lightblue" : "darkblue"}>
          {title}
        </Heading>

        <Text
          mt="2"
          textAlign={{ base: "justify", md: "left" }}
          letterSpacing={"0.5px"}
          lineHeight={{ base: "22px" }}
          wordBreak={{ base: "break-all", md: "normal" }}
          color={darkMode ? "white" : "black"}
        >
          {content}
        </Text>
      </Box>
    </Box>
  );
};

export default Card;
