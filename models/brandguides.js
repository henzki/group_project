const mongoose = require('mongoose');
const brandguideSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    firstimage: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    creator: {
        type: String
    },
    fontcolor: {
        type: String,
        required: true,
    },
    bgcolor: {
        type: String,
        required: true,
    },
    navbgcolor: {
        type: String,
        required: true,
    },

    layout: {
        type: String,
        required: true,
    },

    created: {
        type: Date,
        required: true,
        default: Date.now,
    },

    logoHeader: {
        type: String
    },

    logoDescription: {
        type: String
    },

    logoimage: {
        type: String
    },

    fontHeader: {
        type: String
    },

    fontDescription: {
        type: String
    },

    fontimage: {
        type: String
    },

    colorsHeader: {
        type: String
    },

    colorsDescription: {
        type: String
    },

    colorsimage: {
        type: String
    },

    mediaHeader: {
        type: String
    },

    mediaDescription: {
        type: String
    },

    mediaimage: {
        type: String
    },

    optionalOneHeader: {
        type: String
    },

    optionalOneDescription: {
        type: String
    },

    optionalOneimage: {
        type: String
    },

    optionalTwoHeader: {
        type: String
    },

    optionalTwoDescription: {
        type: String
    },

    optionalTwoimage: {
        type: String
    },
});

module.exports = mongoose.model('Brandguide', brandguideSchema);
