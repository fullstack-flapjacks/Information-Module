const mongoose = require('mongoose');
const faker = require('faker');  //faker will be used to generate dummy data
const dataGenerator = require('./dataGenerator.js');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/restaurants');
// , {useMongoClient: true}
//defining the location schema and data shape
let locationSchema = mongoose.Schema({
  restaurant_id: Number,
  name: String,
  latitude: String,
  longitude: String
});

let Location = mongoose.model('location', locationSchema);

let informationSchema = mongoose.Schema({
  restaurant_id: Number,
  name: String,
  diningStyle: String,
  cuisines: String,
  hoursOfOperations: {
   breakfast: {
     served : Boolean,
     times: String,
     days: String
   },
   brunch: {
     Served: Boolean, 
     times: String,
     days: String
   },
   lunch: {
     served : Boolean,
     times: String,
     days: String
   },
   dinner: {
     served : Boolean,
     times: String,
     days: String
   } 
  }, 
  crossStreet: String,
  dressCode: String,
  priceRange: String,
  paymentOptions: Object,
  phoneNumber: String,
  website: String,
  catering: {
    cater: Boolean,
    description: String
  },
  publicTransit: String,
  executiveChef: String,
  additional: {
    chef: Boolean, 
    description: String
  },
  specialEvents: String, 
  promotions: String
});

let Information = mongoose.model('Information', informationSchema);

//variable which will have the data in an array object with nested objects
let data = dataGenerator.generateMockData();
console.log(data);

let save = (data) => {
  data.forEach((item) => {
    let restaurantLocation = new Location({
      id: item.restaurant_id,
      name: item.name,
      latitude: item.latitude,
      longitude: item.longitude
    });

    let restaurant = new Information({
      restaurant_id: item.restaurant_id,
       name: item.name,
       diningStyle: item.diningStyle,
       cuisines: item.cuisines,
       hoursOfOperations: {
        breakfast: {
          served : item.hoursOfOperations.breakfast.served,
          times: item.hoursOfOperations.breakfast.times,
          days: item.hoursOfOperations.breakfast.days
        },
        brunch: {
          served: item.hoursOfOperations.brunch.served, 
          times: item.hoursOfOperations.brunch.times,
          days: item.hoursOfOperations.brunch.days
        },
        lunch: {
          served : item.hoursOfOperations.lunch.served,
          times: item.hoursOfOperations.lunch.times,
          days: item.hoursOfOperations.lunch.days
        },
        dinner: {
          served : item.hoursOfOperations.dinner.served,
          times: item.hoursOfOperations.dinner.times,
          days: item.hoursOfOperations.dinner.days
        } 
      }, 
      crossStreet: item.crossStreet,
      dressCode: item.dressCode,
      priceRange: item.priceRange,
      paymentOptions: {
        visa: item.paymentOptions.visa,
        master: item.paymentOptions.master,
        amex: item.paymentOptions.amex,
        discover: item.paymentOptions.discover
      },
      phoneNumber: item.phoneNumber,
      website: item.website,
      catering: {
        cater: item.catering.cater,
        description: item.catering.description
      },
      publicTransit: item.publicTransit,
      executiveChef: item.executiveChef,
      additional: {
        chef: item.additional.chef, 
        description: item.additional.description
      },
      specialEvents: item.specialEvents, 
      promotions: item.promotions
    });

    restaurantLocation.save((err) => {
      if (err) return handleError(err);
    });

    restaurant.save((err) => {
      if (err) return handleError(err);
    });
  });
}

//invocation of the save function to populate the database
save(data);

module.exports.save = save;