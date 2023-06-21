const express = require('express');
const Customer = require('../../model/customer');
const Milkprovider = require('../../model/milkprovider')
const Newsprovider = require('../../model/newsprovider')
const router = express.Router();
const { application } = require('express');


router.post("/customeridtoname", async(req, res) => {
    try {
        const user_id = req.body.user_id;
        // console.log(user_id);
        const user = await Customer.findOne({
            user_id: user_id
        });
        return res.status(200).json(user);

    } catch (err) {
        console.log(err);
    }
});
router.post("/getusername", async(req, res) => {
    try {
        const user_id = req.body.user_id;
        const provider = await Milkprovider.findOne({
            milk_provider_id: user_id
        })
        return res.status(200).json(provider.username);
    } catch (err) {
        console.log(err);
    }
});

router.post("/getnewsprousername", async(req, res) => {
    try {
        const user_id = req.body.user_id;
        const provider = await Newsprovider.findOne({
            news_provider_id: user_id
        })
        return res.status(200).json(provider.username);
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;