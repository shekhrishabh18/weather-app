const request = require('request')

const forecast = (longitude, latitude, callback) => {
	const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+encodeURIComponent(latitude)+'&lon='+encodeURIComponent(longitude)+'&appid=2debf8525adf477ea142d6df4d936830&units=metric'
	request({url, json:true}, (error,{body}) => {
		if(error)
			callback('Unable to connect to weather service!',undefined)
		else if(body.message)
			callback('Unable to find location!',undefined)
		else 
			callback(undefined,body.main)
})
}

module.exports = forecast