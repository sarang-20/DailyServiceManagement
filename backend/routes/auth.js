const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const Customer = require('../model/customer.js')
const Customerproviderconnection = require('../model/customerproviderconnection')
const router = express.Router();
const { application } = require('express');

router.post('/customerlogin', async(req, res) => {
    console.log(req.body);
    const { username, password } = req.body;
    console.log(username);
    console.log(password);
    let token;
    try {
        const customerlogin = await Customer.findOne({ username: username });
        if (!customerlogin) {
            return res.status(400).json({
                error: "user not exits"
            });
        } else {
            const ismatch = await bcrypt.compare(password, customerlogin.password);
            if (!ismatch) {

                return res.status(400).json({ error: "password not valid" });

            } else {
                // token = await userlogin.generateAuthToken();
                res.status(201).json(customerlogin);
                // navigate("/");
            }
        }
    } catch (err) {
        console.log(err);
    }
});




router.post('/requestsend', async(req, res) => {
    const { provider_id, customer_id } = req.body;
    try {
        const request = false;
        const both = new Customerproviderconnection({
            provider_id,
            customer_id,
            request
        })
        await both.save();
        return res.status(402).json(both);
    } catch (err) {
        console.log(err);
    }
});
router.post('/acceptrequest', async(req, res) => {
    const { provider_id, customer_id } = req.body;
    try {
        const both = await Customerproviderconnection.findOne({ provider_id: provider_id, customer_id: customer_id });
        both.request = true;
        await both.save();
        return res.status(402).json(both);
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;
module.exports = router;