const mongoose = require("mongoose")


const pasteSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model("document", pasteSchema)