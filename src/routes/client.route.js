const express = require("express");
const router = express.Router();
const ClientController = require("../controllers/client.controller");

router.get("/", ClientController.ClientsList);

router.post('/', ClientController.createClient);

router.put("/:clientId", ClientController.updateClient);

router.delete("/:clientId", ClientController.deleteClient);

router.get("/:clientId", ClientController.getClient);

module.exports = router;