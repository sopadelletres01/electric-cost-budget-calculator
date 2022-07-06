const { Schema, model } = require('mongoose');
//tabal de consumos de un electrodoméstico

const priceSchema = new Schema(
  {
    date: String,
    hour: {
      type: String,
      required: true,
      unique:true,
      enum: [
        '00-01',
        '01-02',
        '02-03',
        '03-04',
        '04-05',
        '05-06',
        '06-07',
        '07-08',
        '08-09',
        '09-10',
        '10-11',
        '11-12',
        '12-13',
        '13-14',
        '14-15',
        '15-16',
        '16-17',
        '17-18',
        '18-19',
        '19-20',
        '20-21',
        '21-22',
        '22-23',
        '23-24',
      ],
    },
    isCheap: {
      type: Boolean,
      required: false,
    },
    market:{
        type:String,
        required:false
    },
    price: {
      type: Number,
      required: true,
    },
    units: String,
  },
  {
    timestamps: true,
  }
);

const Price = model('Price', priceSchema);
module.exports = Price;
