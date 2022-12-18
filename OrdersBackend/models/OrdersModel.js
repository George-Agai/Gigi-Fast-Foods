const mongoose = require('mongoose')

const arraySchema = new mongoose.Schema({
    food:  String,
    itemTotal: Number,
    quantity: Number
});

const completeOrderTemplate = new mongoose.Schema(
    {   
        contact: {
            type: Number
        },
        orders: [arraySchema],
        cartTotal: {
            type: Number
        },
        date: {
            type: Date,
            default: Date.now
        }
    }
);

module.exports = mongoose.model('ordersMade', completeOrderTemplate)