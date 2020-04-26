const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

var compaignSchema = new Schema({

	location: {
		type: String
	}, 
	datefrom: {
		type: Date
	},
	dateto: {
		type: Date
	},
	helpline: {
		type: String
	}
});

module.exports=mongoose.model('Compaign', compaignSchema);