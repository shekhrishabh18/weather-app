const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
 

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Rishabh Shekhar'
	})
})

app.get('/about', (req,res) => {
	res.render('about', {
		title: 'About me',
		name: 'Rishabh Shekhar'
	})
})

app.get('/help', (req,res) => {
	res.render('help', {
		title: 'Happy to help!',
		name: 'Rishabh Shekhar'
	})
})

app.get('/weather', (req,res) => {
	if(!req.query.address) {
		return res.send({
			error: 'No address provided!'
		})
	}
	geocode(req.query.address, (error,{latitude,longitude,location} = {}) => {
		if(error)
			return res.send({error})
		forecast(longitude, latitude, (error, forecastData) => {
			if(error)
				return res.send({error})
			res.send({
				Address: req.query.address,
				location,
				forecast: forecastData.temp

			})
		})
	})
})

app.get('/help/*', (req,res) => {
	res.render('404page', {
		title: '404',
		name: 'Rishabh Shekhar',
		error: 'Help article not found.'
	})
})

app.get('*', (req,res) => {
	res.render('404page', {
		title: '404',
		name: 'Rishabh Shekhar',
		error: 'Page not found.'
	})
})

//app.com
//app.com/help
//app.com/about

app.listen(3000, () => {
	console.log('Server is up on port 3000')
})