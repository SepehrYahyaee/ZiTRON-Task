import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello and Welcome!");
})

app.listen(process.env.PORT, () => console.log("app is running on port:", process.env.PORT));