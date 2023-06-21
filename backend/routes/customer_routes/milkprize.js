const express = require('express');
const Cutomerproviderconnection = require('../../model/customerproviderconnection')
const Milkprovider = require('../../model/milkprovider');
const Newsprovider = require('../../model/newsprovider');
const router = express.Router();

const { application } = require('express');

router.post('/milkperday', async(req, res) => {
    try {
        const user_id = req.body.user_id;
        const milkprovider_id = req.body.milkprovider_id;
        const item = await Cutomerproviderconnection.findOne({
            provider_id: milkprovider_id,
            customer_id: user_id
        });
        return res.status(201).json(item.milkperday);
    } catch (err) {
        console.log(err);
    }
});
router.post('/milkprize', async(req, res) => {
    try {
        const milkprovider_id = req.body.milkprovider_id;
        const item = await Milkprovider.findOne({
            milk_provider_id: milkprovider_id
        });
        return res.status(201).json(item.prize);
    } catch (err) {
        console.log(err);
    }
});
router.post('/newsprize', async(req, res) => {
    try {
        const newsprovider_id = req.body.newsprovider_id;
        const item = await Newsprovider.findOne({
            news_provider_id: newsprovider_id
        });
        return res.status(201).json(item.prize);
    } catch (err) {
        console.log(err);
    }
});
module.exports = router;