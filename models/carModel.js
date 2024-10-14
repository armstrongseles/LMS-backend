const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
  carType:{type:String,required:true},
  image: { type: String, required: true },
  carModel: { type: String, required: true },
  pricePerHour: { type: Number, required: true },
  availability: { type: Boolean, required: true }
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
