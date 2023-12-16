import React, { useState } from "react";
import {
  Box,
  Heading,
  Input,
  Textarea,
  Button,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useUser } from "../../Context/DataProvider";

const AdminAbout = ({darkMode}) => {
    const textcolor = darkMode ? "white" : "black";
    const bgColor = darkMode ? "white" : "black";
  const { token } = useUser();
  const [data, setData] = useState({
    schoolName: "",
    description: "",
    imageLink: "",
  });

  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { response } = await axios.post(
        "https://portfoliobackend-wv3s.onrender.com/api/admin/addeducation",
        data,
        config
      );
      console.log("Education added successfully ");
      toast({
        title: "Education field Added!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });

      setData({
        schoolName: "",
        description: "",
        imageLink: "",
      });
    } catch (error) {
      console.error("Error adding education:", error);

      toast({
        title: "Error",
        description: "Failed to add education. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <Box p={4} color={textcolor}>
      <Heading mb={4}>Add Education</Heading>
      <form onSubmit={handleSubmit}>
        <Input
          mb={3}
          placeholder="School Name"
          _placeholder={{ color: textcolor }}
          name="schoolName"
          value={data.schoolName}
          onChange={handleChange}
        />
        <Textarea
          mb={3}
          placeholder="Description"
          _placeholder={{ color: textcolor }}
          name="description"
          value={data.description}
          onChange={handleChange}
        />
        <Input
          mb={3}
          placeholder="Image Link"
          _placeholder={{ color: textcolor }}
          name="imageLink"
          value={data.imageLink}
          onChange={handleChange}
        />
        <Button colorScheme="blue" type="submit">
          Add Education
        </Button>
      </form>
    </Box>
  );
};

export default AdminAbout;
