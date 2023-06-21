const express = require('express');
const Customer = require('../../model/customer');
const Newsprovider = require('../../model/newsprovider');
const Milkprovider = require('../../model/milkprovider')
const router = express.Router();

const { application } = require('express');

router.post("/milkproviderupdate", async(req, res) => {
    try {
        const id = req.body.id;
        const milkprovider = await Milkprovider.findOneAndUpdate({ milk_provider_id: id }, {
            $set: {
                username: req.body.username,
                fname: req.body.fname,
                lname: req.body.lname,
                email: req.body.email,
                PhoneNumber: req.body.PhoneNumber,
                address: req.body.address,
                prize: req.body.prize,
                morning_start: req.body.morning_start,
                morning_end: req.body.morning_end,
                evening_start: req.body.evening_start,
                evening_end: req.body.evening_end,
                morning: req.body.morning,
                evening: req.body.evening,
            }
        });
        const now = await Milkprovider.findOne({
            milk_provider_id: req.body.id
        });
        console.log(now);
        return res.status(400).json(now)
    } catch (err) {
        console.log(err);
    }
});
router.post("/newsproviderupdate", async(req, res) => {
    try {
        console.log("yes");
        const id = req.body.id;
        const milkprovider = await Newsprovider.findOneAndUpdate({ news_provider_id: id }, {
            $set: {
                username: req.body.username,
                fname: req.body.fname,
                lname: req.body.lname,
                email: req.body.email,
                PhoneNumber: req.body.PhoneNumber,
                address: req.body.address,
                prize: req.body.prize
            }
        });
        const now = await Newsprovider.findOne({
            news_provider_id: id
        });
        console.log(now);
        return res.status(201).json(now);
    } catch (err) {
        console.log(err);
    }
});
router.post("/customerupdate", async(req, res) => {
    try {
        await Customer.findOneAndUpdate({ user_id: req.body.id }, {
            $set: {
                username: req.body.username,
                fname: req.body.fname,
                lname: req.body.lname,
                email: req.body.email,
                PhoneNumber: req.body.PhoneNumber,
                address: req.body.address,
            }
        }, {
            new: true
        });
        const now = await Customer.findOne({
            user_id: req.body.id
        });
        console.log(now);
        return res.status(400).json(now)
    } catch (err) {
        console.log(err);
    }
});

module.exports = router