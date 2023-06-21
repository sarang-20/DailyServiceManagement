const dotenv = require("dotenv");
const mongoose = require('mongoose');
var cors = require('cors')
const schedule = require('node-schedule');


mongoose.set('strictQuery', true);

const express = require('express');
const router = require("./routes/customer_routes/auth");
const app = express();
dotenv.config({ path: './config.env' });
require('./db/connect')
app.use(express.urlencoded({ extended: false }));

app.use(express.json())
app.use(cors());
// app.use(require('./routes/customer_routes/auth'));
app.use(require('./routes/customer_routes/auth'));
app.use(require('./routes/customer_routes/cusidtoname'));
app.use(require('./routes/customer_routes/notmilk'));
app.use(require('./routes/customer_routes/date'));
app.use(require('./routes/customer_routes/request'));
app.use(require('./routes/customer_routes/update'));
app.use(require('./routes/customer_routes/milkprize'));
app.use(require('./routes/customer_routes/forgottenpass'));
schedule.scheduleJob('* * * 1-12 *', () => {
    console.log("working ");
    // route.post("/");
    // domails();
});
const port = process.env.port;
app.listen(port, () => {
    console.log(`server is running on ${port} port`);
});
console.log("sarang")

function domails() {
    var nodemailer = require('nodemailer');
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '2002013519@adit.ac.in',
            pass: 'Balvant20@'
        }
    });
    let mailOptions = {
        from: '2002013519@adit.ac.in',
        // to: req.body.email,
        to: "sarangaghara083@gmail.com",
        subject: 'Kon be Kon!',
        text: 'this is your last warning okay. this is computer generated email'
    };
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            return res.status(200).json({
                msg: 'Email sent '
            });
        }
    });
}