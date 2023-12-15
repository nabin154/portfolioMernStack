const User = require("../models/userModel");
const Contact= require("../models/contactModel");
const Education = require("../models/educationModel");
const Project = require("../models/projectModel");
const Skills = require("../models/skillsModel");
const nodemailer = require("nodemailer");



const Home = (req, res) => {
  res.send("Hello from api/portfolio route");
};

const userDetails = async (req, res) => {
  try {
    const user = await User.findOne();
    if (!user) {
      return res.status(402).json("User doesnot exist in the database");
    } else {
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address:user.address,
        links: user.links,
        images: user.images,
        cvLink:user.cvLink,
      });
    }
  } catch (error) {
    return res.status(402).json("Error fetching the user data !!!");
  }
};

const sendMessage = async (req,res)=>{
  const { name, email, message } = req.body;
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: `${name} <bhandarinabin138@gmail.com>`,
    to: "bnabin555@gmail.com",
    subject: "New Portfolio Message",
    text: `Name: ${name}\nSender's Email: ${email}\nMessage: ${message}`,
  };

  try {
    const contact = await Contact.create({
      name,
      email,
      message,
    });
      await transporter.sendMail(mailOptions);
    if (contact) {
      return res.status(200).json("MEssage has been sent successfully");
    } else {
      return res.status(401).json("Message sending failed !");
    }
  } catch (error) {
    return res.status(401).json("internal server error  !");
  }
}


const fetchEducation = async (req, res)=>{

  try {
    const data = await Education.find();
    if(data){
      return res.status(200).json(data);
    }
    else{
      return res.status(401).json("error fetching educations  !");
    }
  } catch (error) {
     return res.status(401).json("internal server error  !");
  }
}

const fetchProject = async (req, res)=>{

  try {
    const data = await Project.find();
    if(data){
      return res.status(200).json(data);
    }
    else{
      return res.status(401).json("error fetching projects  !");
    }
  } catch (error) {
     return res.status(401).json("internal server error  !");
  }
}

const fetchSkill = async (req, res) => {
  try {
    const data = await Skills.find();
    if (data) {
      return res.status(200).json(data);
    } else {
      return res.status(401).json("error fetching skills  !");
    }
  } catch (error) {
    return res.status(401).json("internal server error  !");
  }
};

module.exports = {
  Home,
  userDetails,
  sendMessage,
  fetchEducation,
  fetchProject,
  fetchSkill,
};
