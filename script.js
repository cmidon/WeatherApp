const key = 'f7cd41ecfbc82597def2c568185d98cc' 

//take in an input of kelvin and convert it farenheit
function convertKtoF(input){
    return (((input - 273.15) * (9/5)) + 32).toFixed(2)
}


async function getData(city) {
    let endpoint = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + key
    const request = await fetch(endpoint);
    const response = await request.json();
    console.log(response);

    //get elements from html
    const button = document.getElementById("b");
    const form = document.getElementById("form");
    const t = document.getElementById("t");
    const f = document.getElementById("f");
    const d = document.getElementById("d");
    const w = document.getElementById("w");
    console.log(request.cod)
    if (response.cod == 200) {
        //convert kelvin to faren
        let temp = convertKtoF(response.main.temp)

        //convert m/s to f/s
        let speed = response.wind.speed * 3.28084

        //convert Feels like to faren
        let feels_like = convertKtoF(response.main.feels_like)
        speed = speed.toFixed(2);

        //update p tags in html
        t.textContent = "Temperature: " + temp + " " + unescape('%BA') + "f";
        f.textContent = "Feels Like: " + feels_like + " " + unescape('%BA') + "f";;
        d.textContent = "Description: " + response.weather[0].description;
        w.textContent = "Wind Speed: " + speed + " f/s";
    } else {
        t.textContent = "ERROR. Please try again later";
    }
}

const button = document.getElementById("b");
const form = document.getElementById("form");

button.addEventListener("click", function() {
    getData(form.value);
});
//temp, feels like, description,temp_min, temp_max, wind: {speed, deg}
