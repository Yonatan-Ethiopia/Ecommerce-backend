const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {type:string },
    category: { type: mongoose.Schema.objectId, ref: 'category'}
    price: {type: string},
    stock: { type: string},
    photo: {}
});

const products = mongoose.model( 'products', productSchema);
module.exports = products;