const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

const port = process.env.PORT || 3000;

const CertifiedUsers = require('./src/models/certifiedUsers');

const bodyparser = require('body-parser');
const { mailer } = require('./mailer');
const data = {
    "Intern Name": "Deependra Singh",
    "Start Date": new Date(),
    "End Date": new Date(),
    "COC Date": new Date(),
    "Internship Domain": "Web Development",
    "CID": "EI230045569"
};

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors());
app.get('/certificate/:cid', async (req, res) => {
    const CID = req.params.cid;
    console.log(CID);
    try {
        
        const certifiedUser = await CertifiedUsers.findOne({ CID: CID })
        if(certifiedUser)
            res.send({found:true,certifiedUser: certifiedUser});
        else res.send({found: false})
        console.log(certifiedUser);
    } catch (e) {
        console.error(e);
        res.send({ found: false });
    }
    // try {
    //     const DataToSave = new CertifiedUsers(data);

    //     const createCertifiedUser = await DataToSave.save();
    //     console.log(createCertifiedUser);
    //     res.send(createCertifiedUser);

    // } catch (e) {
    //     console.error(e);
    // }
});

app.post('/sendmessage', (req, res) => {
    const contactDetails = req.body;
    try {
        mailer(contactDetails);
        console.log("Mail Sent Successful.");
        res.send({ status: true });
    } catch (e) {
        res.send({status:false,error:e});
        console.error(e);
    }
});

mongoose.connect('mongodb+srv://EvolveIntern:EvolveIntern01623@cluster0.pfih4bu.mongodb.net/Evolve?retryWrites=true&w=majority').then(() => {
    console.log("Connection Successful");
    app.listen(port, () => {
        console.log(`Server is listening at ${port}`);
    });
})
