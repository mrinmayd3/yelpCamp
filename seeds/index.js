const mongoose = require('mongoose');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
})

const titleSample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 150; i++) {
        const random48 = Math.floor(Math.random() * 150);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '5ff43d86929dcf3f3cb2fb3a',
            location: `${cities[random48].city}, ${cities[random48].state}`,
            title: `${titleSample(descriptors)} ${titleSample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi aut voluptates ut iusto pariatur dolores ipsam perferendis dolore fugit beatae deserunt itaque odio, quas voluptas esse velit hic provident necessitatibus.',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random48].longitude, cities[random48].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dphf25qjp/image/upload/v1610209797/yelpCamp/dogwiakcd1ex8xji1dfu.jpg',
                    filename: 'yelpCamp/dogwiakcd1ex8xji1dfu'
                },
                {
                    url: 'https://res.cloudinary.com/dphf25qjp/image/upload/v1610473071/yelpCamp/elkpgwsukyxbnjmjnhgw.jpg',
                    filename: 'yelpCamp/elkpgwsukyxbnjmjnhgw'
                }
            ]

        })
        await camp.save();
    }
}


seedDB().then(() => mongoose.connection.close());