import {resolve} from "path";
import {Request, Response} from "express";

async function getImg(req:Request, res:Response) {
  try{
    const {fileName} = req.params;
    const imgPath = resolve("uploads", fileName)
    if(!imgPath){
      return res.status(404).send({
        message: "Image was not found :("
      })
    }
    return res.sendFile(imgPath)
  } catch (err){
    return res.status(500).send({
      success: false,
      status: 500,
      data: [],
      message: err.message
    })
  }
}

export default {getImg}