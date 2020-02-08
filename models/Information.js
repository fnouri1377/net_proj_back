const mongoose = require('mongoose');

const infoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    formName: String,
    fields: mongoose.Schema.Types.Mixed
}, { strict: false });

module.exports = mongoose.model('Information', infoSchema, 'information');