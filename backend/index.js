require("dotenv").config();
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()

const Document = require("./models/model")
const mongoDB = process.env.MONGODB_URL;
mongoose.connect(mongoDB);
const db = mongoose.connection;
main().catch((err) => console.log(err));

async function main() {
    try {
        await mongoose.connect(mongoDB);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

main();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

app.post("/save", async (req, res) => {
    const { pasteValue } = req.body
    const data = {
        pasteValue: pasteValue
    }
    const newPaste = new Document({
        pasteValue: pasteValue
    });
    try {
        await newPaste.save();
        res.json({ _id: newPaste._id });
        console.log("paste saved successfully")
    }
    catch (error) {
        console.log("error saving the paste", error)
        res.status(500).send("Error saving the text")
    }
});

app.get("/:id", async (req, res) => {
    const id = req.params.id
    try {
        const document = await Document.findById(id)
        if (!document) {
            return res.status(404).json({ error: " Document not found" })
        }
        res.json({ text: document.pasteValue })
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