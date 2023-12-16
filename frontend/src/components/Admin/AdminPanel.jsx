
import React, { useEffect, useState } from "react";
import { Box, Flex, Text, Icon, Button, VStack } from "@chakra-ui/react";
import { FaHome, FaInfo, FaCode, FaTools, FaEnvelope } from "react-icons/fa";
import { Link, useNavigate, Outlet } from "react-router-dom"; 

const AdminPanel = () => {
  const [activeMenu, setActiveMenu] = useState("home");
  const navigate = useNavigate(); 
  const menuItems = [
    { label: "Home", icon: FaHome,path:"" },
    { label: "Education", icon: FaInfo, path: "about" },
    { label: "Skills", icon: FaInfo, path: "skills" },
    { label: "Projects", icon: FaInfo, path: "projects" },
    { label: "Messages", icon: FaInfo, path: "messages" },
  ];



  useEffect(()=>{
const token = sessionStorage.getItem("token");
if(!token)
{
  navigate("/admin");
}

  },[navigate]);

  const handleMenuItemClick = (path) => {
    setActiveMenu(path);
    navigate(`/adminpanel/${path}`);
  };

  return (
    <Flex>
      <Box w="200px" bg="gray.800" color="white" p={4} boxShadow="md" h="88vh">
        <VStack spacing={4} align="stretch">
          {menuItems.map((item) => (
            <Button
              key={item.path}
              onClick={() => handleMenuItemClick(item.path)}
              variant={activeMenu === item.path ? "solid" : "outline"}
              colorScheme="blue"
              leftIcon={<Icon as={item.icon} />}
            >
              {item.label}
            </Button>
          ))}
        </VStack>
      </Box>

      <Box flex="1" p={8}>
        <Outlet />
      </Box>
    </Flex>
  );
};

export default AdminPanel;
