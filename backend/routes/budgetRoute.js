import express from "express"
import { createBudget } from "../controllers/budgetController.js"
const route = express.Router()

route.post("/budget",createBudget)
export default route