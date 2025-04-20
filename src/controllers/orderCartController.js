const orderController = async ( req, res)=>{
    const userCart = await cart.findById(req.body.cart)
    if(!cart){
        return res.json({ message: 'Cart not found'});
    }
    for( let item of cart.item){
        const isProduct = await products.findById( item.product)
        if(!isProduct){
            return res.json({ error: 'Product not found', item});
        }
        const isStock = await products.findOne( { _id: item.product, stock: { $gte: item.quantity}});
        if(!isStock){
            return res.json({ error: 'Not enough stock', item});
        }
    }
    let orderItems = [];
    for( let item of cart.item){
        const checkItem = await products.findOneAndUodate({
                   _id: item.product, stock: { $gte: item.quantity} },
                   { $inc: { stock: -item.quantity } },{ new: true} )
        if( !checkItem){
            return //what should I say
        }
        let order = { product: item.product, quantity: item.quantity }
                
        orderItems.push( order );
    }
    const saveHistory = await history.create({ user: req.user, orderItems: orders});
    const clearcut = await cart.delete();
    res.json({ message: 'succesfull'});
}

module.exports = orderController ;
