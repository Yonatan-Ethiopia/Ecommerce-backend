const checkCart = async (cart) =>{
    for( let item of cart.item){
        const isProduct = await products.findById( cart.item.product)
        if(!isProduct){
            return { error: 'Product not found', item}
        }
        const isStock = await products.findOne( { _id: cart.item.product, stock: { $gte: cart.item.quantity}});
        if(!isStock){
            return { error: 'Not enough stock', item}
        }
    }return { succes: true}
}
const const cart = cart.findById(req.body.cart)
const cartStatus = checkCart(cart);
if( cartStatus.error == 'Product not found'){
   return res.json({ message: `Product ${cartStatus.item} not found` });
}
if( cartStatus.error == 'Not enough stock'){
   return res.json({ message: `Not enough stock for item ${cartStatus.item}` });
}
if( cartStatus.success ){
   for( let item of cart.item){
       const checkItem = products.findOneAndUodate({
           _id: item.product, stock: { $gte: item.quantity} },
           { $inc: { stock: -item.quantity } },{ new: true} )
        if( !checkItem){
            return //what should I say
        }
        let order = { product: item.product, quantity: item.quantity }
        history.create( {user: req.user , orderItem: [order]});
       };
}
