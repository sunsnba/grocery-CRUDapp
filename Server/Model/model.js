const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const shoppingListSchema = new Schema({
    listItems: { type: String, required: true }
});


module.exports = mongoose.model('ShoppingList', shoppingListSchema);