import express, { json } from "express"
import cors from "cors"
import userRoute from "./routes/userRoute.js"
import budgetRoute from "./routes/budgetRoute.js"
import categoryRoute from "./routes/categoryRoute.js"
import transactionRoute from "./routes/transactionRoute.js"
import goalRoute from "./routes/goalRoute.js"
const PORT = 8000

const app = express()
app.use(json())
app.use(cors())

app.use("/api",userRoute)
app.use("/api",goalRoute)
app.use("/api",budgetRoute)
app.use("/api",categoryRoute)
app.use("/api",transactionRoute)
app.listen(PORT,()=>console.log(`App Listening At Port:${PORT}`))