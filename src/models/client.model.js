const mongoose = require('mongoose');

const clientSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
   email: {
       type: String,
       required: true,
       unique: true,
       match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
   },
   name: String,
   phone: Number,
   providers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Provider'
   }]
});

module.exports = mongoose.model('Client', clientSchema);
