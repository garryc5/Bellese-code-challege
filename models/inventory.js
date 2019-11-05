var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InventorySchema = new Schema({
    name: String,
    description: String,
    pic: String,
  }, {
    timestamps: true
  });  

  module.exports = mongoose.model('Inventory', InventorySchema);
