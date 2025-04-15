const products = require('products');
const category = require('category');
const filterProducts = async (req, res)=>{
    try{
        const { category, min, max, stock} = req.query ;
        let filter = {};
        if(!category) return res.json({message: 'Category is empty'});
        const cat = await category.findOne({name: theCat});
        filter.category = cat._id ;
        if(min){
            filter.price = { ...filter.price, $gte: Number(min)};
        }
        if(max){
            filter.price = { ...filter.price, $lte: Number(max)}
        }
        if(stock){
            filter.stock = { $gt: Number(0)}
        }
        const productList = await products.find({filter}).populate('category');
        res.json(productList);
    }catch(err){
        res.json({message: 'Error'});
    }
}

module.exports = filterProducts;