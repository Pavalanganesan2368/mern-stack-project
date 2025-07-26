import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import connectDatabase from '../backend/config/db.js';
import router from './routes/route.js';

dotenv.config();
const app = express();

const __dirname = path.resolve();

app.use(express.json()); // Allow access to JSON data to req.body

// API Routes
app.use("/api/product", router);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/front-end/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend/front-end/dist/index.html"));
    });
} else {
    app.get("/", (req, res) => {
        res.send("API is running...");
    });
}

const PORT = process.env.PORT || 5000;

// Connect to DB first, then start server
connectDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
}).catch((error) => {
    console.error("Failed to connect to Database:", error);
});
