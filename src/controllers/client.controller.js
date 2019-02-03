const mongoose = require("mongoose");
const _ = require("lodash");
const STATUSCODES = require("http-status-codes");
const Client = require("../models/client.model");
mongoose.set('useFindAndModify', false);

exports.ClientsList = async(_req, res, _next) => {
    if (res.headersSent) return;
    const clients = await Client.find().select("name phone email providers").populate("providers", "_id name").exec();
    if (_.isNil(clients) || !clients.length) throw new Error(STATUSCODES.BAD_REQUEST);
    return res.status(STATUSCODES.OK).json({ timestamp: new Date().toUTCString(), count: clients.length, data: clients }).end();
}

exports.createClient = async (req, res)  => {
    const clientToAdd = new Client({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        providers: req.body.providerId
    });
    if ((!clientToAdd.name) || !clientToAdd.name.length) return res.status(STATUSCODES.BAD_REQUEST).json({ message: "INVALID NAME" }).end();
    const [foundExistingClient] = await Client.find({ name : clientToAdd.name });
    if (foundExistingClient) res.status(STATUSCODES.OK).json(foundExistingClient);
    const newClient = await clientToAdd.save();
    return res.status(STATUSCODES.OK).json(newClient).end();
};

exports.updateClient = async(req, res, _next) => {
    let id = req.params.clientId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    const newClient = await Client.updateOne( {_id: id}, { $set: updateOps } ).exec();
    if (_.isNil(newClient)) throw new Error(STATUSCODES.INTERNAL_SERVER_ERROR);
    return res.status(STATUSCODES.OK).json({ timestamp: new Date().toUTCString(), data: newClient }).end();
};

exports.deleteClient = async(req, res, _next) => {
    const id = req.params.clientId;
    if (!id) throw new Error(STATUSCODES.BAD_REQUEST);
    const client = await Client.findById({ _id: id });
    const deleted = await Client.deleteOne(client);
    return res.status(STATUSCODES.OK).json({ timestamp: new Date().toUTCString(), data: deleted }).end();
};

exports.getClient = async(req, res, _next) => {
    const id = req.params.clientId;
    if (!id) throw new Error(STATUSCODES.BAD_REQUEST);
    const client = await Client.findById({ _id: id }).select("name phone email providers").populate("providers", "_id name").exec();
    if (_.isNil(client) || !client._id) res.status(STATUSCODES.BAD_GATEWAY).json({ message: "id is not match" });
    return res.status(STATUSCODES.OK).json({client}).end();
};