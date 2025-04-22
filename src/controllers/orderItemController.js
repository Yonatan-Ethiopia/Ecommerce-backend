/**
 * The below code is for ordering an item.
 * First the cide checks if the item exists in the product model.
 * Then if the item is available, will check if the item is in stock and decrease as much as the quantity of order from the stock.
 * After that it will save the details of the order in to an object and save that object to history Model.
 **/
const mongoose = require('mongoose');
const history = require('./src/models/historyModel');
const products = require('./src/models/productModel');
const cart = require('./src/model/cartModel');

const orderItem = async (req, res)=>{
    try{
        const isItem = await products.findById(req.body.productId);
        if(!isItem){
            return res.json({message: "Item isnt available"});
        }
        const update = await products.findOneAndUpdate({ _id: req.body.productId, 
             stock : { $gte : req.body.quantity} },
             { $inc : { stock : -req.body.quantity } },
             { new: true});
        if(!update){
            return res.json({ message: 'Item is out of stock'});
        }
        const order = { user: req.user,  orderItem: [{product: isItem._id, quantity: req.body.quantity}], 
             orderStatus: 'pending' };
        await history.create(order)
        res.json({message: 'Success'});
    }catch(err){
        res.status(500).json({message: "Server Error"});
    }
}
