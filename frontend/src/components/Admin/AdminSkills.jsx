import React, { useState } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  useToast,
} from "@chakra-ui/react";
import {useUser} from "../../Context/DataProvider";
import axios from "axios";

const AdminSkills = ({ darkMode }) => {
  const textcolor = darkMode?"white":"black";
  const bgColor = darkMode?"white":"black";


  const toast = useToast();
  const { token } = useUser();
  const [formData, setFormData] = useState({
    iconLink: "",
    category: "frontend",
    skillName: "",
    percentage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        "http://127.0.0.1:5000/api/admin/addskills",
        formData,
        config
      );
      console.log("Skill added successfully ");
      toast({
        title: "Skill Added!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });

      setFormData({
        iconLink: "",
        category: "frontend",
        skillName: "",
        percentage: "",
      });
    } catch (error) {
      console.error("Error adding skills:", error);

      toast({
        title: "Error",
        description: "Failed to add Skill. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <Box p={4} maxWidth="500px" mx="auto" color={textcolor}>
      <Heading mb={4} textAlign="center">
        Add Skills
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel htmlFor="iconLink">Icon Link:</FormLabel>
          <Input
            type="text"
            id="iconLink"
            name="iconLink"
            value={formData.iconLink}
            onChange={handleChange}
            required
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel htmlFor="category">Category:</FormLabel>
          <Select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="others">Others</option>
          </Select>
        </FormControl>

        <FormControl mb={4}>
          <FormLabel htmlFor="skillName">Skill Name:</FormLabel>
          <Input
            type="text"
            id="skillName"
            name="skillName"
            value={formData.skillName}
            onChange={handleChange}
            required
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel htmlFor="percentage">Percentage :</FormLabel>
          <Input
            type="number"
            id="percentage"
            name="percentage"
            value={formData.percentage}
            onChange={handleChange}
            required
          />
        </FormControl>

        <Button type="submit" colorScheme="teal" variant="solid" mt={4}>
          Add Skill
        </Button>
      </form>
    </Box>
  );
};

export default AdminSkills;
