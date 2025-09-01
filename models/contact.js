const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const infoSchema = new Schema({
    name:{
        type: String,
    },
    email: {
        type: String,
    },
    msg: {
        type: String,
    }
})

const Information = mongoose.model("Information", infoSchema);
module.exports = Information;