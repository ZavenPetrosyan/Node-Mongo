const express = require("express");
const router = express.Router();
const ProviderController = require("../controllers/provider.controller");

router.get("/", ProviderController.providerList);

router.post("/", ProviderController.createProvider);

router.get("/:providerId", ProviderController.getProvider);

router.delete("/:providerId", ProviderController.deleteProvider);

module.exports = router;