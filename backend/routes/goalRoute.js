import express from "express"
import { createGoal, deleteGoal, updateGoal } from "../controllers/goalController.js"
const route = express.Router()

route.post("/create-goal",createGoal)
route.put("/update-goal/:id",updateGoal)
route.delete("/delete-goal/:id/:userId",deleteGoal)

export default route