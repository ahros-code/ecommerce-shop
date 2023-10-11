import {Request, Response} from "express";
import {ConfirmCodeModel, UserModel} from "../models/index";
import jwt from "jsonwebtoken"
import {
  BACKEND_URL,
  EMAIL_SENDER,
  FRONTEND_URL,
  JWT_SECRET,
  NODEMAILER_PASS,
  NODEMAILER_USER
} from "../constants/constants";
import {genSaltSync, hashSync,compareSync} from "bcrypt"
import {v4} from "uuid"
import nodemailer from "nodemailer"

const generateCode = (len) => {
  let code = "";
  const schema = "0123456789";
  for (let i = 0; i < len; i++) {
    code += schema[Math.floor(Math.random() * schema.length)];
  }

  return code;
};

async function userRegister(req: Request, res: Response) {
  try{
    const {firstName, lastName, email, password} = req.body;
    const avatar = req.file
    const isUserExists = await UserModel.findOne({where: {email}});
    if(isUserExists){
      return res.status(409).send({
        success: false,
        status: 409,
        data: [],
        message: "User already exists"
      })
    }
    if(!(email.includes("@gmail.com"))){
      return res.status(400).send({
        success: false,
        status: 400,
        data: [],
        message: "Email is not valid"
      })
    }
    const saltRounds = 2
    const salt = genSaltSync(saltRounds)
    const hashed_password = hashSync(password, salt)
    const token = jwt.sign({firstName, lastName, email, password: hashed_password}, JWT_SECRET)

    const activateLink = v4();

    const newUser = await UserModel.create({
      firstName, lastName,email, password: hashed_password, avatar: `/img/${avatar.filename}`, activateLink
    },{returning: true})

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: NODEMAILER_USER,
        pass: NODEMAILER_PASS
      }
    })
    const message = transport.sendMail({
      from: EMAIL_SENDER,
      to: email,
      subject: "Activate your account",
      html: `
        <div>
          <h1>activation link</h1>
            <a href="${FRONTEND_URL}/user/auth/account/activate/${activateLink}">Activate account</a>
        </div>
      `
    })
    return res.status(201).send({
      success: true,
      status: 201,
      data: [{user: newUser}, {token}],
      message: "User is created successfully!"
    })
  } catch (err){
    return res.status(500).send({
      success: false,
      status: 500,
      data: [],
      message: err.message
    })
  }
}

async function activate(req, res){
  try{
    const {link} = req.params;
    const user = await UserModel.findOne({where: {activateLink: link}}) as any;
    if(!user){
      return res.status(404).send({
        status: 404,
        data: null,
        error: "user is not found"
      })
    }
    user.isActivated = true;
    await user.save();
    return res.status(200).send({
      status: 200,
      data: [{message: "Account is activated"}],
      error: null
    })
  } catch (err){
    return res.status(500).send({
      status: 500,
      data: null,
      error: err.message
    })
  }
}

async function login(req, res){
  try{
    const {email, password} = req.body;
    const user = await UserModel.findOne({
      where: {
        email
      }
    }) as any;
    if(!user){
      return res.status(404).send({
        status: 404,
        data: null,
        error: "user is not found"
      })
    }
    const checkPass = compareSync(password, user.dataValues.password);
    if(!checkPass){
      return res.status(400).send({
        status: 400,
        data: null,
        error: "password is not correct"
      })
    }
    const token = jwt.sign({firstName: user.firstName, lastName: user.lastName, email, password: user.password}, JWT_SECRET);

    return res.status(200).send({
      status: 200,
      data: [
        {token}
      ],
      error: null
    })

  } catch (err){
    return res.status(500).send({
      status: 500,
      data: null,
      error: err.message
    })
  }
}

async function forgotPassword(req, res){
  try{
    const {email} = req.body;
    const user = await UserModel.findOne({where: {email}}) as any;
    if(!user){
      return res.status(404).send({
        status: 404,
        data: null,
        error: "user is not found"
      })
    }
    const codeExists = await ConfirmCodeModel.findOne({where: {user_id: user.id}});
    if(codeExists){
      ConfirmCodeModel.destroy({where: {user: user.id}})
    }
    const code = generateCode(5);
    await ConfirmCodeModel.create({
      code,
      user_id: user.id
    });
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: NODEMAILER_USER,
        pass: NODEMAILER_PASS
      }
    })
    const message = transport.sendMail({
      from: EMAIL_SENDER,
      to: user.email,
      text: code
    });
    return res.status(200).send({
      status: 200,
      data: [{email: user.email}, {message: "Password reset code has been sent to ur email"}]
    })
  } catch (err){
    return res.status(500).send({
      status: 500,
      data: null,
      error: err.message
    })
  }
}

async function newPassword(req, res){
  try{
    const {code, email, password} = req.body;
    const user = await UserModel.findOne({where: {email}}) as any;
    if(!user){
      return res.status(404).send({
        status: 404,
        data: null,
        error: "user is not found"
      })
    }
    const dbCode = await ConfirmCodeModel.findOne({where: {user_id: user.id}}) as any;
    if(dbCode.code != code){
      return res.status(400).send({
        status: 400,
        data: null,
        error: "code is wrong"
      })
    }
    const saltRounds = 5;
    const salt = genSaltSync(saltRounds);
    const hash = hashSync(password, salt);
    const newUserPass = await UserModel.update({password: hash},{where: {email}});
    return res.status(200).send({
      status: 200,
      data: [{message: "Password is successfully updated!!!"}],
      error: null
    })
  } catch (err){
    return res.status(500).send({
      status: 500,
      data: null,
      error: err.message
    })
  }
}

export default {userRegister, activate, login, forgotPassword, newPassword}