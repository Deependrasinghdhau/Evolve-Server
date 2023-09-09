const nodemailer = require("nodemailer");
const sendMail = async (req, res) => {
    const contactDetails = req.body;
    try {
      let transporter = nodemailer.createTransport({
        service: 'gmail', // true for 465, false for other ports
        auth: {
          user: 'evolveintern.info@gmail.com', // generated ethereal user
          pass: 'fjxpsxbtbnukyilf', // generated ethereal password
        },
        secure: true,
      });

        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: 'evolveintern.info@gmail.com', // sender address
          to: "adityarai27103@gmail.com", // list of receivers
          subject: `${contactDetails.firstname} Wants To Contact You.`, // Subject line
          text: `Hi Aditya hope you are well I would like to tell you that ${contactDetails.firstname} wants to contact you below are the mentioned details you can check it.`, // plain text body
          html: `<h1>Details:</h1> <h4>Name - ${contactDetails.firstname} ${contactDetails.lastname}</h4><h4>Email - ${contactDetails.email}</h4><h4>Phone No - ${contactDetails.phone}</h4> <h4>Message - ${contactDetails.message}</h4>`, // html body
        });
        console.log("Mail Sent Successful.");
        res.send({ status: true });
    } catch (e) {
      res.send({status:false,error:e});
      console.error(e);
    }
}

module.exports = { sendMail };