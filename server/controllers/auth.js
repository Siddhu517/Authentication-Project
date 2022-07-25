import { User, validate } from "../models/user";
import bcrypt from "bcrypt";
import Joi from "joi";

export const Register = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(409)
        .json({ message: "User with given email already exist!" });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new User({ ...req.body, password: hashPassword }).save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid Email or Password",
      });
    }
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    const token = user.generateAuthToken();
    res.status(200).json({ data: token, message: "Logged in successfully" });
  } else {
    res.status(500).json({ message: "Invalid Email or Password" });
  }
};

