const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database Connected")
});

const sample = array => array[Math.floor(Math.random() * array.length)] //function to generate a random name for eg. Dusty Cabins

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 400; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '62d16b7457a45992144c631b',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit ratione itaque quos sint ullam possimus fugit rerum velit iure quod doloribus ut repellat dolorum, dignissimos debitis architecto a eos laborum.',
            price, //short-trick to add price no need for price:price
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dnyhxilw4/image/upload/v1657985973/YelpCamp/uh8elhgtt31e2jbvdemw.jpg',
                    filename: 'YelpCamp/uh8elhgtt31e2jbvdemw',
                },
                {
                    url: 'https://res.cloudinary.com/dnyhxilw4/image/upload/v1657985975/YelpCamp/sli6hno1cr7xylqxikw3.jpg',
                    filename: 'YelpCamp/sli6hno1cr7xylqxikw3',
                }
            ]
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close()
});