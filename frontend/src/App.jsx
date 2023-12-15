import React, { useState } from "react";
import { ChakraProvider, extendTheme, Box } from "@chakra-ui/react";
import HomeHeader from "./components/HomeHeader";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Skills from "./pages/Skills";
import LoginAdmin from "./components/LoginAdmin";
import NotFoundPage from "./components/NotFoundPage";
import AdminPanel from "./components/Admin/AdminPanel";
import AdminHome from "./components/Admin/AdminHome";
import AdminAbout from "./components/Admin/AdminAbout";
import AdminSkills from "./components/Admin/AdminSkills";
import AdminMessages from "./components/Admin/AdminMessages";
import AdminProjects from "./components/Admin/AdminProjects";

const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "dark" ? "#000000" : "#ffffff",
      },
    }),
  },
  fonts: {
    body: "Fira Sans,Patua One, Dancing Script, Sacramento, Bree Serif, Shizuru, Work Sans, sans-serif",
  },
  colors: {
    brand: {
      light: "#f5f5f5",
      dark: "#000000",
    },
  },
});

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <ChakraProvider theme={theme}>
      <Box minH="100vh" bg={darkMode ? "brand.dark" : "brand.light"}>
        <HomeHeader
          darkMode={darkMode}
          changeDarkMode={() => setDarkMode(!darkMode)}
        />
        <Routes>
          <Route path="/" element={<Home darkMode={darkMode} />} />
          <Route path="/about" element={<About darkMode={darkMode} />} />
          <Route path="/skills" element={<Skills darkMode={darkMode} />} />
          <Route path="/projects" element={<Projects darkMode={darkMode} />} />
          <Route path="/contact" element={<Contact darkMode={darkMode} />} />

          <Route path="/admin" element={<LoginAdmin darkMode={darkMode} />} />
          <Route
            path="/adminpanel"
            element={<AdminPanel darkMode={darkMode} />}
          >
            <Route element={<AdminHome />} index />
            <Route path="about" element={<AdminAbout darkMode={darkMode} />} />
            <Route
              path="skills"
              element={<AdminSkills darkMode={darkMode} />}
            />
            <Route
              path="projects"
              element={<AdminProjects darkMode={darkMode} />}
            />
            <Route
              path="messages"
              element={<AdminMessages darkMode={darkMode} />}
            />
          </Route>

          <Route path="*" element={<NotFoundPage darkMode={darkMode} />} />
        </Routes>

        <Footer darkMode={darkMode} />
      </Box>
    </ChakraProvider>
  );
}

export default App;
