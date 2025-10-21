const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true },
    date: { 
        type: String, 
        required: true }, // ISO date string
    time: { 
        type: String },
    location: { 
        type: String },
    description: { 
        type: String },
    antenna: { 
        type: String, 
        default: null }, // null => agenda général
    isGeneral: { 
        type: Boolean, 
        default: false },
}, { timestamps: true });

module.exports = mongoose.model('Event', EventSchema);