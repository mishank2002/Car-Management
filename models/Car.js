const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: [String], default: [] },
    images: { type: [String], default: [] }, // Array of image URLs
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user
}, { timestamps: true });

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
