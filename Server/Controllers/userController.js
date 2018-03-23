const ShoppingList = require('../Model/model');
const fs = require('fs');
const userController = {};

userController.startList = (req, res, next) => {
    let newListItem = new ShoppingList({
        'listItems': req.body.listItem
    })
    newListItem.save();
    res.send(newListItem);
}

userController.deleteListItem = (req, res, next) => {
    ShoppingList.remove({ '_id': req.body.listItemId }, (err, doc) => {
        res.send(doc)
    })
}

userController.updateListItem = (req, res, next) => {
    ShoppingList.findById({ '_id': req.body.listItemId }, (err, item) => {
        item.listItems = req.body.listItemUpdate;
        console.log('itemssss', item)
        item.save();
        res.send(item)
    });
};

userController.findAll = (req, res, next) => {
    ShoppingList.find({}, (err, doc) => {
        res.send(doc)
    })
};
module.exports = userController