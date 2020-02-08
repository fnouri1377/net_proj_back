const mongoose = require('mongoose');

const areaSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    areaType: String,
    properties: {
        stroke: String,
        stroke_width: Number,
        stroke_opacity: Number,
        fill: String,
        fill_opacity: Number,
        name: String,
    },
    geometry: {
        geometryType: String,
        coordinates: [[
            Number[2],
        ]],
    },
})

module.exports = mongoose.model('Area', areaSchema, 'areas');