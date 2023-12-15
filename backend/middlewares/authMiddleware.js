const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    token = req.header("Authorization");

    if (!token) {
      return res.status(404).json("token doesnot exist !");
    }
    const webtoken = token.split(" ")[1];
    try {
      const isValid = await jwt.verify(webtoken, process.env.JWT_SECRET_KEY);
      if (isValid) {
        next();
      } else {
        return res.status(402).json("Invalid web token !");
      }
    } catch (error) {
      return res.status(402).json("internal server error  !");
    }
  }
  else{
       return res.status(404).json("token doesnot exist !");

  }
};

module.exports = protect;
