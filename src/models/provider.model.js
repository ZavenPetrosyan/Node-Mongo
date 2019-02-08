const mongoose = require('mongoose');

const providerSchema = mongoose.Schema({
   _id: {
      type: mongoose.Schema.Types.ObjectId,
   },
   name: {
      type: String
   }
});

module.exports = mongoose.model('Provider', providerSchema);



