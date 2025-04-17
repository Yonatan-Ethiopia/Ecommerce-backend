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
