require("dotenv").config();
const express = require("express")
const mongoose = require("mongoose")
const app = express()

const Document = require("./models/model")
const mongoDB = process.env.MONGODB_URL;
mongoose.connect(mongoDB);
const db = mongoose.connection;
main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect(mongoDB);
}


app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.json("test works")
})


app.post("/save", async (req, res) => {
    const value = req.body.value
    try {
        const document = await Document.create({ value })
        res.redirect(`/${document.id}`)
    }
    catch (e) {
        console.error("Error saving document:", e);
        res.json({ msg: "error saving" })
    }
    console.log(value)
})

app.get("/:id", async (req, res) => {
    const id = req.params.id
    try {
        const document = await Document.findById(id)
        if (!document) {
            return res.status(404).json({ error: " Document not found" })
        }
        res.json(document)
    }
    catch (e) {
        res.status(500).json({ error: "Server error" })
    }
})


const PORT = 3000;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
    console.log(`http://localhost:${PORT}/`)
})