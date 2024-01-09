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
  color,
} from "@chakra-ui/react";
import axios from "axios";
import { useUser } from "../../Context/DataProvider";

const AdminAbout = ({darkMode}) => {
    const textcolor = darkMode ? "white" : "black";
    const bgColor = darkMode ? "white" : "black";
  const { token } = useUser();
  const [educationData, setEducationData] = useState({
    schoolName: "",
    description: "",
    imageLink: "",
  });

  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEducationData({
      ...educationData,
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
        educationData,
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

      setEducationData({
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
          setEducationData({ ...educationData, [fieldName]: data.url });
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
    <Box p={4} color={textcolor}>
      <Heading mb={4}>Add Education</Heading>
      <form onSubmit={handleSubmit}>
        <Input
          mb={3}
          placeholder="School Name"
          _placeholder={{ color: textcolor }}
          name="schoolName"
          value={educationData.schoolName}
          onChange={handleChange}
        />
        <Textarea
          mb={3}
          placeholder="Description"
          _placeholder={{ color: textcolor }}
          name="description"
          value={educationData.description}
          onChange={handleChange}
        />
        <FormControl id="pic">
          <FormLabel style={{ fontWeight: "bold" ,color:"lightblue"}}>
            Upload your Education picture :
          </FormLabel>
          <Input
            type="file"
            p={1}
            mb={4}
            accept="image/*"
            onChange={(e) => postDetails(e.target.files[0], "imageLink")}
          />
        </FormControl>
        <Button colorScheme="blue" type="submit">
          Add Education
        </Button>
      </form>
    </Box>
  );
};

export default AdminAbout;
