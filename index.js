var mongoose = require('mongoose');
var url = "mongodb://localhost:27017/shopping_carts";

mongoose.connect(url, function(err) {
  if (err) throw err;
  var dbo = db.db("shopping_carts");
  dbo.collection("store").findOne({}, function(err, result) {
    if (err) throw err;
    console.log(result.name);
  });
});