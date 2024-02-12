import express from "express"
import { createUser, getUser } from "../controllers/userController.js"
const route = express.Router()

route.post("/create-user",createUser)
route.get("auth-user/:id",getUser)
export default route