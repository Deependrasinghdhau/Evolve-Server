const mongoose = require('mongoose');

const certifiedUsersSchema = mongoose.Schema({
    "Intern Name": { type: String, required: true },
    "Start Date": { type: String, required: true },
    "End Date": { type: String, required: true },
    "COC Date": { type: String, required: true },
    "Internship Domain": { type: String, required: true },
    "CID": { type: String, required: true },
    "COC Status": { type: Boolean, required: true },
    "LOR Status": { type: Boolean, required: true },
    "OL Status":{type:Boolean,required:true}
});

module.exports = mongoose.model("CertifiedUsers", certifiedUsersSchema);