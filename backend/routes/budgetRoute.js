import express from "express"
import { createBudget, getBudget, updateBudget } from "../controllers/budgetController.js"
const route = express.Router()

route.post("/create-budget",createBudget)
route.put("/update-budget/:id",updateBudget)
route.get("/user-budget/:id/:userId",getBudget)
export default route