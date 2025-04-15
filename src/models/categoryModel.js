const mongoos = require('mongoose');

const categoryScheam = mongoose.Schema({
    name: { type : string },
    description: { type : string }
});

const category = mongoose.model( 'category' , categoryScheam );
module.exports = category ;
