const mongoose = require('mongoose');

const formSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    fields: [
        {
            name: String,
            title: String,
            fieldType: String,
            required: Boolean,
            options: [
                { label: String },
            ]
        }
    ]
})

module.exports = mongoose.model('Form', formSchema, 'forms');