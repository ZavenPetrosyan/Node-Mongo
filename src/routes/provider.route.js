const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const _ = require("lodash");
const STATUSCODES = require("http-status-codes");
const Provider = require("../models/provider.model");

mongoose.set('useFindAndModify', false);

router.get("/", async(_req, res, _next) => {
    if (res.headersSent) return;
    const providers = await Provider.find().select("name").exec();
    if (_.isNil(providers) || !providers.length) throw new Error(STATUSCODES.BAD_REQUEST);
    return res.status(STATUSCODES.OK).json({ timestamp: new Date().toUTCString(), count: providers.length, data: providers }).end();
});

router.post("/", async (req, res, _next)  => {
    const provider  =  new Provider({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
    });
   if (!provider || !provider.name.length) throw new Error(STATUSCODES.BAD_REQUEST);
   const [existingProvider] = await Provider.find({ name: provider.name });
   if (existingProvider) res.status(STATUSCODES.OK).json(existingProvider).end();
   const newProvider = await provider.save();
   return res.status(STATUSCODES.OK).json(newProvider);
});

router.get("/:providerId" ,async(req, res, _next) => {
    const id = req.params.providerId;
    if (!id) throw new Error(STATUSCODES.BAD_REQUEST);
    const provider = await Provider.findById({ _id: id }).select("name _id").exec();
    if (_.isNil(provider) || !provider._id) res.status(STATUSCODES.BAD_GATEWAY).json({ message: "id is not match" });
    return res.status(STATUSCODES.OK).json({provider}).end();
});

router.delete("/:providerId", async(req, res, _next) => {
    const id = req.params.providerId;
    if (!id) throw new Error(STATUSCODES.BAD_REQUEST);
    const deletedProvider = await Provider.deleteOne({ _id: id });
    return res.status(STATUSCODES.OK).json({ timestamp: new Date().toUTCString(), data: deletedProvider }).end();
});

module.exports = router;