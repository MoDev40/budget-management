import express from "express"
import { createBudget, updateBudget } from "../controllers/budgetController.js"
const route = express.Router()

route.post("/create-budget",createBudget)
route.put("/update-budget/:id",updateBudget)
export default route