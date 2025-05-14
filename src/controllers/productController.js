const products = require('products');

const getProducts = async (req, res) => {
    try{
        const productList = await products.find();
        res.json({ success: true, post: `${productList}`});
        console.log('Successfully got products');
    }catch(err){
        res.status(500).json({message: 'Server error'});
    }
}
module.exports = getProducts ;
