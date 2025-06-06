/** 
 * The below code is for ordering items from a users cart.
 * The code first tests if the requested cart is availble in the cartModel for that user.
 * Then it will go through each item in the cart and check whether they are availble and in stock.
 * Then after it will go through the cart and check each items stock but this time it will also decrease the stock by the amount of quantity in cart.
 * Then it will add the items id and quantity into an object which will then be added to an array.
 * Then if all goes well the the array and and the user Id will be saved into the history model.
 **/
const mongoose = require('mongoose');
const users = require('./src/models/usersModel');
const products = require('./src/models/productModel');
const cart = require('./src/models/cartModel');
const history = require('./src/models/historyModel');
const orderController = async ( req, res)=>{
    try{
        const userCart = await cart.findById(req.body.cart)
        if(!userCart){
            return res.status(404).json({ success: false, message: 'Cart not found'});
        }
        if(userCart.user != req.user){
            return res.status(401).json({ success: false, message: 'Unauthorised user'});
        }
        for( let item of userCart.items){
            const isProduct = await products.findById( item.product)
            if(!isProduct){
                return res.status(404).json({ success: false, message: 'Item not found', item});
            }
            const isStock = await products.findOne( { _id: item.product, stock: { $gte: item.quantity}});
            if(!isStock){
                return res.status(404).json({ success: false, message: 'Not enough stock', item});
            }
        }
        let orderItems = [];
        for( let item of userCart.items){
            const checkItem = await products.findOneAndUpdate({
                       _id: item.product, stock: { $gte: item.quantity} },
                       { $inc: { stock: -item.quantity } },{ new: true} )
            if( !checkItem){
                return res.status(404).json({ success: false, message: 'Item not found or out of stock', Item})
            }
            let order = { product: item.product, quantity: item.quantity }
                    
            orderItems.push( order );
        }
        const saveHistory = await history.create({ user: req.user, orderItems});
        res.json({ message: 'succesfull'});
    }catch(err){
        res.json({ error: err})
    }
}

module.exports = orderController ;
