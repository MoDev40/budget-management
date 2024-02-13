import express from "express"
import { createCategory, deleteCategory, getCategory, updateCategory } from "../controllers/categoryController.js"
const route = express.Router()

route.post("/create-category",createCategory)
route.put("/update-category/:id",updateCategory)
route.delete("/delete-category/:id/:userId",deleteCategory)
route.get("/get-category/:id",getCategory)
export default route