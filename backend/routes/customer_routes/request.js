const express = require('express');
const Customer = require('../../model/customer');
const Cutomerproviderconnection = require('../../model/customerproviderconnection')
const Newsproconnection = require('../../model/newsproconnection');
const router = express.Router();

const { application } = require('express');

router.post("/requestreject", async(req, res) => {
    try {
        const provider_id = req.body.provider_id;
        const customer_id = req.body.user_id;
        await Cutomerproviderconnection.findOneAndUpdate({
            provider_id: provider_id,
            customer_id: customer_id
        }, {
            $set: {
                request: "Rejected",
            }
        }, {
            new: true,
        });
        return res.status(200).json("request rejected");
    } catch (err) {
        console.log(err);
    }
});
router.post("/requestaccept", async(req, res) => {
    try {
        const provider_id = req.body.provider_id;
        const customer_id = req.body.user_id;
        const year = req.body.year;
        const month = req.body.month;
        await Cutomerproviderconnection.findOneAndUpdate({
            provider_id: provider_id,
            customer_id: customer_id
        }, {
            $set: {
                request: "Accept",
                year: year,
                month: month,
            }
        }, {
            new: true,
        });
        // customerconnection.request = "true"
        await Customer.findOneAndUpdate({
            user_id: customer_id
        }, {
            $set: {
                milkprovider_id: provider_id,
            }
        }, {
            new: true,
        });
        return res.status(200).json("request accepted");
    } catch (err) {
        console.log(err);
    }
});
router.post("/newsrequestaccept", async(req, res) => {
    try {
        const provider_id = req.body.provider_id;
        const customer_id = req.body.user_id;
        const year = req.body.year;
        const month = req.body.month;
        await Newsproconnection.findOneAndUpdate({
            provider_id: provider_id,
            customer_id: customer_id
        }, {
            $set: {
                request: "Accept",
                year: year,
                month: month,
            }
        }, {
            new: true,
        });
        // customerconnection.request = "true"
        await Customer.findOneAndUpdate({
            user_id: customer_id
        }, {
            $set: {
                newsprovider_id: provider_id,
            }
        }, {
            new: true,
        });
        return res.status(200).json("request accepted");
    } catch (err) {
        console.log(err);
    }
});
router.post("/sendrequest", async(req, res) => {
    try {
        const provider_id = req.body.milk;
        const customer_id = req.body.user_id;
        const month = req.body.month;
        const year = req.body.year;
        const milkperday = req.body.totalmilk;
        const now = await Cutomerproviderconnection.findOne({
            provider_id: provider_id,
            customer_id: customer_id,
            month: month,
            year: year,
        })
        if (now) {
            return res.status(200).json("request already")
        }
        console.log(milkperday);
        const customerconnection = new Cutomerproviderconnection({
            provider_id,
            customer_id,
            month,
            year,
            milkperday
        });
        await customerconnection.save();
        return res.status(201).json("yes");
    } catch (err) {
        console.log(err);
    }
});
router.post("/newssendrequest", async(req, res) => {
    try {
        console.log("newssendrequest");
        const provider_id = req.body.news;
        const customer_id = req.body.user_id;
        const month = req.body.month;
        const year = req.body.year;
        // const milkperday = req.body.totalmilk;
        const now = await Newsproconnection.findOne({
            provider_id: provider_id,
            customer_id: customer_id,
            month: month,
            year: year,
        })
        if (now) {
            return res.status(200).json("request already")
        }
        // console.log(milkperday);
        const customerconnection = new Newsproconnection({
            provider_id,
            customer_id,
            month,
            year,
        });
        await customerconnection.save();
        return res.status(201).json("yes");
    } catch (err) {
        console.log(err);
    }
});
router.post('/checkreqstatus', async(req, res) => {
    try {
        const provider_id = req.body.milk;
        const customer_id = req.body.user_id;
        const month = req.body.month;
        const year = req.body.year;
        const now = await Cutomerproviderconnection.findOne({
            provider_id: provider_id,
            customer_id: customer_id,
            month: month,
            year: year,
        });
        if (!now) {
            return res.status(201).json("send request");
        } else if (now.request == "Accept") {
            return res.status(201).json("request accepted");
        } else if (now.request == "false") {
            return res.status(201).json("request pending");
        } else if (now.request == "Rejected") {
            return res.status(201).json("request rejected");
        } else {
            return res.status(201).json("sendrequest");
        }
    } catch (err) {
        console.log(err);
    }
});
router.post('/newscheckreqstatus', async(req, res) => {
    try {
        const provider_id = req.body.news;
        const customer_id = req.body.user_id;
        const month = req.body.month;
        const year = req.body.year;
        const now = await Newsproconnection.findOne({
            provider_id: provider_id,
            customer_id: customer_id,
            month: month,
            year: year,
        });
        if (!now) {
            return res.status(201).json("send request");
        } else if (now.request == "Accept") {
            return res.status(201).json("request accepted");
        } else if (now.request == "false") {
            return res.status(201).json("request pending");
        } else if (now.request == "Rejected") {
            return res.status(201).json("request rejected");
        } else {
            return res.status(201).json("send request");
        }
    } catch (err) {
        console.log(err);
    }
});
module.exports = router;