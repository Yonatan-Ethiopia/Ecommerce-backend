const mongoose = require('mongoose');
const orderItemSchema = mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true},
    quantity: { type: Number , required: true}
    });

const orderSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.OnjectId, ref: 'users', required: true},
    orderItem: [orderItemSchema],
    orderStatus: { type: String, enum: ['pending', 'shipped', 'delivered'], default: 'pending', reuquired: true}
    createdAt : { type: Date, default: date.now }
}, {timestamps: true});

const orders = mongoose.Model('orders', orderSchema);
module.exports = orders ;
