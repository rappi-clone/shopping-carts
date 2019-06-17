var Schema = require('mongoose').Schema

var producto_schema = new Schema({
  name						: 	{ type: String,	 required: true },
  description				:	{ type: String,  required: true },
  price 					: 	{ type: Number,  required: true, trim: true	},
  initial_amount        	:  	{ type: Number,  required: true, trim: true	},
  remaining_amount      	:  	{ type: Number,	 required: true, trim: true	},
  released					:	{ type: Boolean, default: false },
  availability  		    :	{ type: Boolean, default: true },
  tags						:	{ type: [String] },
  images					:	{ type: [String] },
  created  					: 	{ type: Date, default: Date.now },
  modified				    :	{ type: Date, default: Date.now }
});

module.exports = product_schema;