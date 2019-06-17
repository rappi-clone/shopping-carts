import { connect } from 'mongoose';
var url = "mongodb://localhost:27017/shopping_carts";

mongoose.connect(url, function (err) {
  if (err) throw err;
  console.log('Successfully connected')
})

