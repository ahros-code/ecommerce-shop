import multer from "multer";
import {Request} from "express";
import {resolve} from "path"


type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const storage = multer.diskStorage({
  destination: function (req: Request  , file: Express.Multer.File, cb: DestinationCallback):void {
    cb(null, resolve("uploads"))
  },
  filename: function (req: Request, file:Express.Multer.File, cb: FileNameCallback):void {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, `${file.originalname.split(".")[0]}-${uniqueSuffix}.${file.mimetype.split("/")[1]}`)
  }
})

export const upload = multer({ storage: storage })