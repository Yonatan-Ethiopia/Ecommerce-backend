const orderController = async ( req, res){
    const checkCart = async () =>{
        const const cart = await cart.findById(req.body.cart)
        for( let item of cart.item){
            const isProduct = await products.findById( item.product)
            if(!isProduct){
                return { error: 'Product not found', item}
            }
            const isStock = await products.findOne( { _id: item.product, stock: { $gte: item.quantity}});
            if(!isStock){
                return { error: 'Not enough stock', item}
            }
        }return { succes: true}
    }
    
    const cartStatus = checkCart(cart);
    const finalOrder = async ( cartStatus ) => {
        let orderItems = [];
        if( cartStatus.error == 'Product not found'){
           return res.json({ message: `Product ${cartStatus.item} not found` });
        }
        if( cartStatus.error == 'Not enough stock'){
           return res.json({ message: `Not enough stock for item ${cartStatus.item}` });
        }
        if( cartStatus.success ){
           for( let item of cart.item){
               const checkItem = await products.findOneAndUodate({
                   _id: item.product, stock: { $gte: item.quantity} },
                   { $inc: { stock: -item.quantity } },{ new: true} )
                if( !checkItem){
                    return //what should I say
                }
                let order = { product: item.product, quantity: item.quantity }
                
                orderItems.push( order );
               };
        }
        return orderItems;
    } 
    const orders = finalOrder( cartStatus );
    const saveHistory = await history.create({ user: req.user, orderItems: orders});
    res.json({ message: succesfull});
}

module.exports = orderController ;
