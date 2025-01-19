const Gym = require("../modals/gym");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
require("dotenv").config();
const jwt = require("jsonwebtoken");


exports.register = async (req, res) => {
  try {
    const { userName, password, gymName, profilePic, email } = req.body;

    const isExist = await Gym.findOne({ userName });

    if (isExist) {
      res.status(400).json({
        error: "UserName already exists, try with another username",
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newGym = new Gym({
        userName,
        password: hashedPassword,
        gymName,
        profilePic,
        email,
      });
      await newGym.save();

      res.status(201).json({
        message: "User created successfully",
        success: "yes",
        data: newGym,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Server error",
    });
  }
};

//object for cookieParser

const cookieOptions = {
  httpOnly: true,
  secure: false, //Set to true in production
  sameSite: "Lax",
};

exports.login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    

    const gym = await Gym.findOne({ userName });

    if (gym && (await bcrypt.compare(password, gym.password))) {
      const token = jwt.sign({ gym_id: gym._id }, process.env.JWT_SECRET_KEY);
      res.cookie("cookie_token", token, cookieOptions)

      res.json({
        message: "Logged in successfully",
        success: "true",
        gym,
        token
      });
    } else {
      res.status(400).json({ error: "invalud Credentials" });
    }
  } catch (error) {
    res.send(500).json({
      error: "Server Error",
    });
  }
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const gym = await Gym.findOne({ email });

    if (gym) {
      const buffer = crypto.randomBytes(4); //get random bytes
      const token = (buffer.readUint32BE(0) % 900000) + 100000; //module to get a 6 digit number
      gym.resetPasswordToken = token;
      gym.resetPasswordExpires = Date.now() + 360000; //1 hr expiry data

      await gym.save();

      //for mail sending

      const mailOptions = {
        from: "aakashbanjara4469@gmail.com",
        to: email,
        subject: "password reset",
        text: `You requested a password reset. Your OTP is : ${token} `,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.status(500).json({ error: "Server error", errorMsg: error });
        } else {
          res.status(200).json({ message: "OTP sent to your email" });
        }
      });
    } else {
      return res.status(400).json({ error: "Gym Not Fount" });
    }
  } catch (error) {
    res.status(500).json({
      error: "Server Error",
    });
  }
};

exports.checkOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;


    const gym = await Gym.findOne({
      email,
      resetPasswordToken: otp,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!gym) {
      return res.status(400).json({ error: "OTP is invalid or has expired" });
    }
    res.status(200).json({ message: "OTP is successfully Verified" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const gym = await Gym.findOne({ email });
    if (!gym) {
      return res
        .status(400)
        .json({ error: "Some Technical Issue, Please Try again later" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    gym.password = hashedPassword;
    gym.resetPasswordToken = undefined;
    gym.resetPasswordExpires = undefined;

    await gym.save();

    res.status(200).json({ message: "Password Reset successfully" });
  } catch (error) {
    res.status(500).json({
      error: "Sever Error",
    });
  }
};


exports.logout=async(req,res)=>{
  try {
    res.clearCookie("cookie_token", cookieOptions).json({message:"Logged out successfully"})
    
  } catch (error) {
      res.status(500).json({
        error:"Server Error"
      })
  }
}


