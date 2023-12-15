const User = require("../models/userModel");
const Contact=require("../models/contactModel");
const Project = require("../models/projectModel");
const Education = require("../models/educationModel");
const Skills = require("../models/skillsModel");

const userCreate = async (req, res) => {
  const { name, email, phone, password, pin, address, images, links,cvLink } =
    req.body;
  console.log(req.body);
  try {
    const user = await User.create({
      name,
      email,
      phone,
      password,
      pin,
      address,
      images,
      links,
      cvLink,
    });
    if (user) {
      return res.status(200).json("User is created");
    } else {
      return res.status(404).json("user not created ");
    }
  } catch (error) {
    res.status(404).json("not valid user ");
  }
};

const Login = async (req,res) => {
  const { email, password, pin } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json("No user Found");
    }
    const valid = await user.matchPasswordPin(password, pin);

    if (valid) {
      return res.status(200).json({
        token: await user.generateToken(),

      });
    }
    else{
         return res.status(400).json("Invalid password or pin !");
    }
  } catch (error) {
    return res.status(400).json("Erro in login");
  }
};

const getMessages = async(req,res) => {
  try {
    const messages = await Contact.find();
    if(messages){
      return res.status(200).json(messages);
    }
  } catch (error) {
       return res.status(400).json("messages fetching failed !");
  }
};
const updateUser = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      image1,
      image2,
      facebook,
      instagram,
      github,
      linkedIn,
      cvLink,
    } = req.body;

    const updateObject = {
      name,
      email,
      phone,
      address,
      cvLink:cvLink,
      images: [image1, image2],
      links: [
        { platform: "facebook", url: facebook },
        { platform: "instagram", url: instagram },
        { platform: "github", url: github },
        { platform: "linkedIn", url: linkedIn },
      ],
    };

    const user = await User.findOneAndUpdate(
      {},
      { $set: updateObject },
      { new: true }
    );

    if (user) {
      return res.status(200).json("User updated successfully.");
    } else {
      return res.status(404).json("User not found.");
    }
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json("Internal Server Error.");
  }
};

const addProject =async (req,res)=>{

  const {projectName,description,imageLink,githubLink,livedemoLink}= req.body;
  console.log(req.body);

  try {
    const project = await Project.create({
      name:projectName,
      description:description,
      image:imageLink,
      githubLink:githubLink,
      livedemoLink:livedemoLink,
    });
    if(project){
       return res.status(201).json("Project created successfully");
    }
    
    else{
       return res.status(402).json("Cannot add project");
    }
    }
   catch (error) {
     return res.status(402).json("Internal server error");
    }
  }

const addEducation =async (req,res)=>{

  const {schoolName,description,imageLink}= req.body;

  try {
    const education = await Education.create({
      name: schoolName,
      description: description,
      image: imageLink,
    });

    if(education){
       return res.status(201).json("Education created successfully");
    }
    
    else{
       return res.status(402).json("Cannot add education");
    }
    }
   catch (error) {
     return res.status(402).json("Internal server error");
    }
  }

const addSkills =async (req,res)=>{

  const {skillName,iconLink,percentage,category}= req.body;

  try {
    const skill = await Skills.create({
      skillName: skillName,
      category: category,
      iconLink: iconLink,
      percentage: percentage,
    });

    if(skill){
       return res.status(201).json("Skills added successfully");
    }
    
    else{
       return res.status(402).json("Cannot add skills");
    }
    }
   catch (error) {
     return res.status(402).json("Internal server error");
    }
  }


const deleteMessage = async (req, res)=>{

  const id = req.params;


  try {
    await Contact.findByIdAndDelete(id.id);
    res.status(201).json("Message deleted successfully");
    return 
  } catch (error) {
       return res.status(402).json("Internal server error");
  }
}


module.exports = {
  userCreate,
  Login,
  getMessages,
  updateUser,
  addProject,
  addEducation,
  addSkills,
  deleteMessage,
};
