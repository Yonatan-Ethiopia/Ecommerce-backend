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
const const
const cartStatus = checkCart()