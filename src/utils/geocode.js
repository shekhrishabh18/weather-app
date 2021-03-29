const request = require('request')

const geocode=(address,callback) => {
	const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?limit=2&access_token=pk.eyJ1Ijoic2hla2hyaXNoYWJoMTgiLCJhIjoiY2ttcmMyeWh0MDZkeTJ2cWdkNGZucTc0eSJ9.X4iCZdBl9x5mK3qU7ztPcw'
	request({url, json: true}, (error,{body}) => {
	if(error) {
		callback('Unable to connect to location services!',undefined)
	} else if(body.features.length===0) {
		callback('Unable to find location!',undefined)
	} else {
		callback(undefined,{
		place: body.features[0].place_name,
		longitude: body.features[0].center[0],
		latitude: body.features[0].center[1]
		})
	}
	})
}

module.exports = geocode