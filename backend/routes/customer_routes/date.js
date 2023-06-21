const express = require('express');
const Cutomerproviderconnection = require('../../model/customerproviderconnection');
const Newsproconnection = require('../../model/newsproconnection');
const router = express.Router();

const { application } = require('express');

router.post("/returndates", async(req, res) => {
    try {
        const customer_id = req.body.customer_id;
        const milkprovider_id = req.body.milkprovider_id;
        const now = await Cutomerproviderconnection.findOne({
            customer_id: customer_id,
            provider_id: milkprovider_id
        });
        console.log(now);
        return res.status(200).json(now.dates);
    } catch (err) {
        console.log(err);
    }
});
router.post("/returnnewsdates", async(req, res) => {
    try {
        const customer_id = req.body.customer_id;
        const newsprovider_id = req.body.newsprovider_id;
        const now = await Newsproconnection.findOne({
            customer_id: customer_id,
            provider_id: newsprovider_id
        });
        console.log(now);
        return res.status(200).json(now.dates);
    } catch (err) {
        console.log(err);
    }
});

router.post("/choosendate", async(req, res) => {
    try {
        const date = req.body.date;
        const customer_id = req.body.customer_id;
        const milkprovider_id = req.body.milkprovider_id;
        const u = await Cutomerproviderconnection.findOne({
            provider_id: milkprovider_id,
            customer_id: customer_id,
        })
        console.log(u);
    } catch (err) {
        console.log(err);
    }
});
router.post('/deletedate', async(req, res) => {
    try {
        const date = req.body.date;
        const milkprovider_id = req.body.milkprovider_id;
        const customer_id = req.body.customer_id;
        const month = req.body.month;
        const year = req.body.year;
        await Cutomerproviderconnection.findOneAndUpdate({
            provider_id: milkprovider_id,
            customer_id: customer_id,
            month: month,
            year: year
        }, {
            $pull: {
                dates: date,
            }
        });
        return res.status(201).json("done");
    } catch (err) {
        console.log(err);
    }
});


router.post('/deletedatenews', async(req, res) => {
    try {
        const date = req.body.date;
        const newsprovider_id = req.body.newsprovider_id;
        const customer_id = req.body.customer_id;
        const month = req.body.month;
        const year = req.body.year;
        await Newsproconnection.findOneAndUpdate({
            provider_id: newsprovider_id,
            customer_id: customer_id,
            month: month,
            year: year
        }, {
            $pull: {
                dates: date,
            }
        });
        return res.status(201).json("done");
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;