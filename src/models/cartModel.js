const mongoose = require('mongoose');
const cartItemSchema = mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, 
                ref: 'products', 
                required: true },
    quantity: { type: Number, required: true, default: 1}
    
})

const cartSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Type.ObjectId, ref: 'users' required: true},
    items: [cartItemSchema]
});

const cart = mongoose.model('cart', cartSchema);
module.export = cart ;