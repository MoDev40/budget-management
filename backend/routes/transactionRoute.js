import express from "express"
import { cancelTransaction, createTransaction, deleteTransaction, getUserTrans, recentTrans, singleTrans, updateTransition } from "../controllers/transactionController.js"
const route = express.Router()

route.post("/create-transaction",createTransaction)
route.delete("/cancel-transaction/:id/:userId",cancelTransaction)
route.put("/update-transaction/:id",updateTransition)
route.delete("/delete-transaction/:id/:userId",deleteTransaction)
route.get("/get-transactions/:id",getUserTrans)
route.get("/recent-transactions/:id",recentTrans)
route.get("/single-transaction/:id",singleTrans)

export default route