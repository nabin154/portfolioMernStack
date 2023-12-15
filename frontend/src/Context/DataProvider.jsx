import { useState, useEffect, useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";
const userContext = createContext();

const DataProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState();
  const [userDetails, setUserDetails] = useState();

 useEffect(() => {
   const dataString = localStorage.getItem("token");

   if (dataString) {
     const data = JSON.parse(dataString);
     setToken(data.token);
   }
 }, []);

  useEffect(() =>{
    const details = async()=>{
     await fetch("http://127.0.0.1:5000/api/portfolio/userinfo")
      .then((response) => response.json())
      .then((data) => {
        setUserDetails(data);
      })
      .catch((error) => {
        console.error("error fetching the user data");
      });
    }
    details();
  },[navigate]);

  return (
    <userContext.Provider value={{ token, userDetails }}>{children}</userContext.Provider>
  );
};

export const useUser = () => {
  return useContext(userContext);
};

export default DataProvider;
