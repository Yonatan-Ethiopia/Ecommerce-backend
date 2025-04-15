const mongoose = require('mongoose');
const cart = require('./src/models/cart');
const product = require('.src/models/product');

const addToCart = async (req, res)=>{
    try{
        const userId = req.user;
        const {itemId, quantity} = req.body;
        const isItem = await product.findById(itemId);
        if(!isItem){
            return res.json({message: 'Product not found'});
        }
        if(isItem.stock<1){
            return res.json({message: 'Out of stock'});
        }
        const userCart = await cart.findOne({user: userId});
        if(!userCart){
           await cart.create({ user: userId , 
                         items: [{product: itemId, quantity}] });
            console.log(`New cart created for  user ${userId}`);
        }else{
            const inCart = await userCart.items.findIndex( item => item.product.toString() === itemId );
            if(inCart >-1){
                userCart.items[inCart].quantity +=quantity;
                console.log(`Added quantity for user ${userId} for the product ${itemId}`)
            }else{
                userCart.items.push({ product: itemId,quantity});
                console.log(`Added product ${itemId} for user's ${userId} cart`);
                
            }
        await userCart.save();
        console.log(`Cart saved for user ${userId}`);
        res.json({message: 'Succesfully saved', newCart: cart});
    }catch(err){
        res.status(500).json({message: 'Server Error'});
    }
    
}
module.exports = addToCart ;