const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express();

var myparam = process.argv[2];

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        body: 'Use this site to get your weather!',
        name: 'Eric Jansson'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        body: 'Information is gathered here.',
        name: 'Eric Jansson'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        body: 'Help is coming!',
        name: 'Eric Jansson'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address!"
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error: "Unable to find location. Try another search."
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: "An error has occurred with forecast."
                })
            }
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must prove a search term."
        })
    }

    console.log(req.query)
    res.send({
        products: [req.query.search]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help',
        errormessage: 'Article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errormessage: 'Page not found.'
    })
})





app.listen(3000, () => {
    console.log('Server is up on port 3000.')
});





