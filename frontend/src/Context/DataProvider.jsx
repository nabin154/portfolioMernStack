import { useState, useEffect, useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";
const userContext = createContext();

const DataProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState();
  const [userDetails, setUserDetails] = useState();

 useEffect(() => {
   const dataString = sessionStorage.getItem("token");

   if (dataString) {
     const data = JSON.parse(dataString);
     setToken(data.token);
   }
 }, []);

  useEffect(() =>{
    const details = async()=>{
     await fetch(
       "https://portfoliobackend-wv3s.onrender.com/api/portfolio/userinfo"
     )
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
