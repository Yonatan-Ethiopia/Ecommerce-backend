const products = require('products');

const getProducts = async (req, res) => {
    try{
        const productList = await products.find();
        res.json({post: `${productList}`});
        console.log('Successfully got products');
    }catch(err){
        res.json({message: 'Server error'});
    }
}
module.exports = getPtoducts ;