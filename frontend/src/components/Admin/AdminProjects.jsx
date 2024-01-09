import React, { useState } from "react";
import {
  Box,
  Heading,
  Input,
  Textarea,
  Button,
  useToast,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import axios from "axios";
import { useUser } from "../../Context/DataProvider";

const AdminProjects = ({ darkMode }) => {
 const textcolor = darkMode ? "white" : "black";
 const bgColor = darkMode ? "white" : "black";
  const { token } = useUser();
  const [projectData, setProjectData] = useState({
    projectName: "",
    description: "",
    imageLink: "",
    githubLink: "",
    livedemoLink: "",
  });

  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData({
      ...projectData,
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
      const { data } = await axios.post(
        "https://portfoliobackend-wv3s.onrender.com/api/admin/addproject",
        projectData,
        config
      );
      console.log("Project added successfully ");
      toast({
        title: "Project Added!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });

      setProjectData({
        projectName: "",
        description: "",
        imageLink: "",
        githubLink: "",
        livedemoLink: "",
      });
    } catch (error) {
      console.error("Error adding project:", error);

      toast({
        title: "Error",
        description: "Failed to add project. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };



  
  const postDetails = (pics, fieldName) => {

    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "portfolio");
      data.append("cloud_name", "dumxmt7sm");
      fetch("https://api.cloudinary.com/v1_1/dumxmt7sm/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setProjectData({ ...projectData, [fieldName]: data.url });
          console.log(data.url.toString());
           toast({
             title: "Uploaded successfully!",
             status: "success",
             duration: 5000,
             isClosable: true,
             position: "top",
           });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
  };


  return (
    <Box p={4}>
      <Heading mb={4} color={textcolor}>
        Add Project
      </Heading>
      <form onSubmit={handleSubmit}>
        <Input
          mb={3}
          placeholder="Project Name"
          _placeholder={{ color: textcolor }}
          name="projectName"
          value={projectData.projectName}
          onChange={handleChange}
          color={textcolor}
        />
        <Textarea
          mb={3}
          placeholder="Project Description"
          _placeholder={{ color: textcolor }}
          name="description"
          value={projectData.description}
          onChange={handleChange}
          color={textcolor}
        />
        <FormControl id="pic">
          <FormLabel style={{ fontWeight: "bold", color: "lightblue" }}>
            Upload the screenshot
          </FormLabel>
          <Input
            type="file"
            p={1}
            mb={3}
            accept="image/*"
            onChange={(e) => postDetails(e.target.files[0], "imageLink")}
          />
        </FormControl>

        <Input
          mb={3}
          placeholder="Github link"
          _placeholder={{ color: textcolor }}
          name="githubLink"
          value={projectData.githubLink}
          onChange={handleChange}
          color={textcolor}
        />
        <Input
          mb={3}
          placeholder="Live demo Link"
          _placeholder={{ color: textcolor }}
          name="livedemoLink"
          value={projectData.livedemoLink}
          onChange={handleChange}
          color={textcolor}
        />
        <Button colorScheme="blue" type="submit">
          Add Project
        </Button>
      </form>
    </Box>
  );
};

export default AdminProjects;
