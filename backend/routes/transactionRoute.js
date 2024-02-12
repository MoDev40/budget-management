import express from "express"
import { cancelTransaction, createTransaction, deleteTransaction, updateTransition } from "../controllers/transactionController.js"
const route = express.Router()

route.post("/create-transaction",createTransaction)
route.delete("/cancel-transaction/:id/:userId",cancelTransaction)
route.put("/update-transaction/:id",updateTransition)
route.delete("/delete-transaction/:id/:userId",deleteTransaction)

export default route