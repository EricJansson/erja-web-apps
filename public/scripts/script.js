console.log("This is my javascript file. :)")


const weatherForm = document.querySelector('form')
const searchData = document.querySelector('input')
const weatherResults = document.querySelector("#weather-content-1");
const weatherResults2 = document.querySelector("#weather-content-2")


addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchData.value
    weatherResults.textContent = "Loading...";
    weatherResults2.textContent = "";


    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                weatherResults.textContent = data.error;
            } else {
                weatherResults.textContent = data.location;
                weatherResults2.textContent = data.forecast;
            }
        })
    })
})
