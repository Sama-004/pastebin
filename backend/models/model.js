const mongoose = require("mongoose");
const nodemon = require("nodemon");


const pasteSchema = new mongoose.Schema({
    pasteValue: {
        type: String,
        required: true
    },
})


// module.exports = mongoose.model("document", pasteSchema)
const Document = mongoose.model("Document", pasteSchema);
module.exports = Document;