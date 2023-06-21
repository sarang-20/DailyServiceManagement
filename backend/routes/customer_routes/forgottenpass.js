const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
const Customer = require('../../model/customer')
const Newsproviders = require('../../model/newsprovider.js')
const Milkprovider = require('../../model/milkprovider');
router.post('/forgotpassword', async(req, res) => {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: '2002013519@adit.ac.in',
                pass: 'Balvant20@'
            }
        });
        const temp = 'this is your last warning okay. this is computer generated email your otp : - '
        const otp = req.body.otp;
        const customerlogin = await Customer.findOne({ email: req.body.email });
        if (!customerlogin) {
            const milklogin = await Milkprovider.findOne({ email: req.body.email });
            if (!milklogin) {
                const newslogin = await Newsproviders.findOne({ email: req.body.email });
                if (!newslogin) {
                    return res.status(200).json({ msg: 'email id not found' });
                } else {
                    const mailOptions = {
                        from: '2002013519@adit.ac.in',
                        // to: req.body.email,
                        to: req.body.email,
                        subject: 'reset Password',
                        html: `<div>${otp}</div>`
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
            } else {
                const mailOptions = {
                    from: '2002013519@adit.ac.in',
                    // to: req.body.email,
                    to: req.body.email,
                    subject: 'reset Password',
                    html: `<div>${otp}</div>`
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
        } else {
            const mailOptions = {
                from: '2002013519@adit.ac.in',
                to: req.body.email,
                subject: 'reset Password',
                html: `<div>${otp}</div>`
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
        // 


        // Define the email options


        // Send the email

    } catch (error) {
        console.log(error);
    }
});
router.post("/changepassword", async function(req, res) {
    try {
        const customerlogin = await Customer.findOne({ email: req.body.email });
        if (!customerlogin) {
            const milklogin = await Milkprovider.findOne({ email: req.body.email });
            if (!milklogin) {
                const newslogin = await Newsproviders.findOne({ email: req.body.email });
                if (!newslogin) {
                    return res.status(200).json({ msg: 'email id not found' });
                } else {
                    await Newsproviders.findOneAndUpdate({ email: req.body.email }, {
                        $set: {
                            password: req.body.password
                        }
                    });
                    return res.json({
                        msg: 'password change successfully'
                    });
                }
            } else {
                await Milkprovider.findOneAndUpdate({ email: req.body.email }, {
                    $set: {
                        password: req.body.password
                    }
                });
                return res.json({
                    msg: 'password change successfully'
                });
            }
        } else {
            await Customer.findOneAndUpdate({ email: req.body.email }, {
                $set: {
                    password: req.body.password
                }
            });
            return res.json({
                msg: 'password change successfully'
            });
        }
    } catch (err) {
        console.log(err);
    }
});

module.exports = router