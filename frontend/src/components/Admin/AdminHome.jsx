import {
  Box,
  Button,
  Input,
  VStack,
  HStack,
  Icon,
  useColorModeValue,
  useToast,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useState,useEffect } from "react";
import { FaFacebook, FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import axios from "axios";
import { useUser } from "../../Context/DataProvider";

const AdminHome = () => {
  const inputBgColor = useColorModeValue("gray.100", "gray.700");
  const buttonColor = useColorModeValue("teal", "teal.300");
  const toast = useToast();
  const { userDetails ,token} = useUser();
  const[changed,setChanged]=useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    image1: "",
    image2: "",
    facebook: "",
    instagram: "",
    github: "",
    linkedIn: "",
    cvLink: "",
  });
  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    image1: "",
    image2: "",
    facebook: "",
    instagram: "",
    github: "",
    linkedIn: "",
    cvLink:"",
  });

  const defaultUserSet = () => {
    let updatedFields = {};

    if (userDetails && user.name === "") updatedFields.name = userDetails.name;
    if (userDetails && user.email === "")
      updatedFields.email = userDetails.email;
    if (userDetails && user.phone === "")
      updatedFields.phone = userDetails.phone;
    if (userDetails && user.address === "")
      updatedFields.address = userDetails.address;
    if (userDetails &&user.image1 === "") updatedFields.image1 = userDetails.images[0];
    if (userDetails && user.image2 === "")
      updatedFields.image2 = userDetails.images[1];
    if (userDetails && user.facebook === "")
      updatedFields.facebook = userDetails.links[0].url;
    if (userDetails && user.instagram === "")
      updatedFields.instagram = userDetails.links[1].url;
    if (userDetails && user.github === "")
      updatedFields.github = userDetails.links[2].url;
    if (userDetails && user.linkedIn === "")
      updatedFields.linkedIn = userDetails.links[3].url;
    if (userDetails && user.cvLink === "")
      updatedFields.cvLink = userDetails.cvLink;

    setUpdatedUser({ ...user, ...updatedFields });
  };

  const handleChange = (e) => {
    setChanged(true);
    let name = e.target.name;
    let value = e.target.value;

    setUser({ ...user, [name]: value });


  };



  const postDetails = (pics, fieldName) => {
    setChanged(true);

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
                 setUser({ ...user, [fieldName]: data.url });
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




   useEffect(() => {
     defaultUserSet();
   }, [user]);

    

  const updateUser = async (e) => {
    e.preventDefault();
    if(changed){
    console.log(updatedUser);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization:`Bearer ${token}`
      },
    };

    try {
      const { data } = await axios.post(
        "https://portfoliobackend-wv3s.onrender.com/api/admin/userinfo",
        JSON.stringify({
          name: updatedUser.name,
          email: updatedUser.email,
          phone: updatedUser.phone,
          address: updatedUser.address,
          image1: updatedUser.image1,
          image2: updatedUser.image2,
          facebook: updatedUser.facebook,
          instagram: updatedUser.instagram,
          github: updatedUser.github,
          linkedIn: updatedUser.linkedIn,
          cvLink: updatedUser.cvLink,
        }),
        config
      );
      setUser({
        name: "",
        email: "",
        phone: "",
        address: "",
        image1: "",
        image2: "",
        facebook: "",
        instagram: "",
        github: "",
        linkedIn: "",
        cvLink:"",
      });
setChanged(false);


      console.log("user is updated successfully ");
        toast({
          title: "USER UPDATED !",
          description: data,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
    } catch (err) {
      console.log(err);
      toast({
        title: "USER UPDATE FAILED!",
        description: 'Internal server error',
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  }else{
     toast({
       title: "Ooops !!",
       description: "Please change something to change !",
       status: "warning",
       duration: 5000,
       isClosable: true,
       position: "top",
     });
  }
  };

  return (
    <Box pl={8}>
      <VStack spacing={4} align="start" width="100%">
        <HStack>
          <Input
            placeholder="Name"
            bg={inputBgColor}
            _placeholder={{ color: useColorModeValue("gray.500", "gray.300") }}
            width="50%"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
          <Input
            placeholder="Email"
            bg={inputBgColor}
            _placeholder={{ color: useColorModeValue("gray.500", "gray.300") }}
            width="50%"
            name="email"
            value={user.email}
            onChange={handleChange}
          />

          <Input
            placeholder="Address"
            bg={inputBgColor}
            _placeholder={{ color: useColorModeValue("gray.500", "gray.300") }}
            width="50%"
            name="address"
            value={user.address}
            onChange={handleChange}
          />
          <Input
            placeholder="Phone"
            bg={inputBgColor}
            _placeholder={{ color: useColorModeValue("gray.500", "gray.300") }}
            width="50%"
            name="phone"
            value={user.phone}
            onChange={handleChange}
          />
        </HStack>
        <HStack>
          <FormControl id="pic">
            <FormLabel style={{ fontWeight: "bold", color: "lightblue" }}>
              Upload your Home picture
            </FormLabel>
            <Input
              type="file"
              p={1}
              accept="image/*"
              onChange={(e) => postDetails(e.target.files[0], "image1")}
            />
          </FormControl>

          <FormControl id="pic1">
            <FormLabel style={{ fontWeight: "bold", color: "lightblue" }}>
              Upload your About Picture
            </FormLabel>
            <Input
              type="file"
              p={1}
              accept="image/*"
              onChange={(e) => postDetails(e.target.files[0], "image2")}
            />
          </FormControl>
        </HStack>

        <HStack spacing={4} width="100%">
          <Icon as={FaFacebook} boxSize={6} />
          <Input
            placeholder="Facebook Link"
            bg={inputBgColor}
            _placeholder={{
              color: useColorModeValue("gray.500", "gray.300"),
            }}
            width="50%"
            name="facebook"
            value={user.facebook}
            onChange={handleChange}
          />
        </HStack>

        <HStack spacing={4} width="100%">
          <Icon as={FaInstagram} boxSize={6} />
          <Input
            placeholder="Instagram Link"
            bg={inputBgColor}
            _placeholder={{
              color: useColorModeValue("gray.500", "gray.300"),
            }}
            width="50%"
            name="instagram"
            value={user.instagram}
            onChange={handleChange}
          />
        </HStack>

        <HStack spacing={4} width="100%">
          <Icon as={FaGithub} boxSize={6} />
          <Input
            placeholder="GitHub Link"
            bg={inputBgColor}
            _placeholder={{
              color: useColorModeValue("gray.500", "gray.300"),
            }}
            width="50%"
            name="github"
            value={user.github}
            onChange={handleChange}
          />
        </HStack>

        <HStack spacing={4} width="100%">
          <Icon as={FaLinkedin} boxSize={6} />
          <Input
            placeholder="LinkedIn Link"
            bg={inputBgColor}
            _placeholder={{
              color: useColorModeValue("gray.500", "gray.300"),
            }}
            width="50%"
            name="linkedIn"
            value={user.linkedIn}
            onChange={handleChange}
          />
        </HStack>

        <Input
          placeholder="CV Path"
          bg={inputBgColor}
          _placeholder={{ color: useColorModeValue("gray.500", "gray.300") }}
          width="50%"
          name="cvLink"
          value={user.cvLink}
          onChange={handleChange}
        />

        <Button colorScheme={"blue"} size="lg" width="50%" onClick={updateUser}>
          Update
        </Button>
      </VStack>
    </Box>
  );
};

export default AdminHome;
