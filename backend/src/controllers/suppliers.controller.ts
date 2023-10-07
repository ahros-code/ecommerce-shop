import {ImageModel, SuppliersModel} from "../models";

async function getAllSuppliers (req, res) {
  try{
    const suppliers = await SuppliersModel.findAll({include: ImageModel})
    return res.send({
      success: true,
      status: 200,
      data: suppliers,
      message: ""
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

export default {getAllSuppliers}