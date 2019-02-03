const mongoose = require('mongoose');

const providerSchema = mongoose.Schema({
   _id: mongoose.Types.ObjectId,
   name: String,
});

module.exports = mongoose.model('Provider', providerSchema);



