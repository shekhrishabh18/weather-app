console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
messageOne = document.querySelector('#message-1')
messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
	e.preventDefault()
	const location = search.value

	messageOne.textContent = 'Loading...'
	messageTwo.textContent = ''

	fetch('http://localhost:3000/weather?address=' + location).then((response) => {
	response.json().then((data) => {
		if(data.error) {
			messageOne.textContent = data.error
			messageTwo.textContent = ''
		} else {
			messageOne.textContent = data.Address
			messageTwo.textContent = 'The current temperature is ' +data.forecast+' degrees celsius.'
		}
	})
})
})