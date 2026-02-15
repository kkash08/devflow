import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "../src/routes/authRoutes.js"
import taskRoutes from "../src/routes/taskRoutes.js"
import snippetRoutes from "../src/routes/snippetRoutes.js"
import boilerplateRoutes from "../src/routes/boilerpateRoutes.js"
import reqRoutes from "../src/routes/reqRoutes.js"
import "./jobs/reminderJob.js"

dotenv.config();
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("DevFlow Server is running.");
})

app.use("/auth", authRoutes);
app.use("/task", taskRoutes);
app.use("/snippet", snippetRoutes);
app.use("/boilerplate", boilerplateRoutes);
app.use("/requests", reqRoutes);


connectDB().then(() => {
    app.listen(5002, () => {
        console.log("Server started on PORT: 5002");
    });
});

