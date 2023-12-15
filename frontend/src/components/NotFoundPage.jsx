import { Box, Button, flexbox } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";

const NotFoundPage = ({darkMode}) => {
  return (
    <Box display={"flex"}>
      <h1>Not Found Page</h1>

      <Box mt={9}>
        <Button className="btn" color={"blue"}>
          <NavLink to="/">Home</NavLink>
        </Button>
        <Button ml={6} id="btn-not-found" color={"blue"}>
          <NavLink to="/contact">Report Problem</NavLink>
        </Button>
      </Box>
    </Box>
  );
};

export default NotFoundPage;
