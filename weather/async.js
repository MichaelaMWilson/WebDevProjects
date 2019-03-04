let zip = 0;
let celsius = false;
let locationHeader = document.getElementById("locationHeader");
let latitude = 0;
let longitude = 0;
let headingTemp = document.getElementById("headingTemp");
let headingDesc = document.getElementById("headingDesc");
let headingPrec = document.getElementById("headingPrec");
let headingWind = document.getElementById("headingWind");
let headingHumidity = document.getElementById("headingHumidity");
let headingImg = document.getElementById("headingImg");
let headingName = document.getElementById("headingName");

let day1Ndx, day2Ndx, day3Ndx, day4Ndx, day5Ndx, day6Ndx, day7Ndx;
let dayName, dayNdx, dayImg;

let day1Name = document.getElementById("day1Name");
let day1Img = document.getElementById("day1Img");
let day1High = document.getElementById("day1High");
let day1Low = document.getElementById("day1Low");

let day2Name = document.getElementById("day2Name");
let day2Img = document.getElementById("day2Img");
let day2High = document.getElementById("day2High");
let day2Low = document.getElementById("day2Low");

let day3Name = document.getElementById("day3Name");
let day3Img = document.getElementById("day3Img");
let day3High = document.getElementById("day3High");
let day3Low = document.getElementById("day3Low");

let day4Name = document.getElementById("day4Name");
let day4Img = document.getElementById("day4Img");
let day4High = document.getElementById("day4High");
let day4Low = document.getElementById("day4Low");

let day5Name = document.getElementById("day5Name");
let day5Img = document.getElementById("day5Img");
let day5High = document.getElementById("day5High");
let day5Low = document.getElementById("day5Low");

let day6Name = document.getElementById("day6Name");
let day6Img = document.getElementById("day6Img");
let day6High = document.getElementById("day6High");
let day6Low = document.getElementById("day6Low");

let day7Name = document.getElementById("day7Name");
let day7Img = document.getElementById("day7Img");
let day7High = document.getElementById("day7High");
let day7Low = document.getElementById("day7Low");

let currSelection = 0;
let forecastURL = "https://api.weather.gov/gridpoints/CTP/105,36/forecast",
    gridURL = "https://api.weather.gov/gridpoints/CTP/105,36/";


function swapDegrees(x){
    let lBtn = document.getElementById("leftDegree");
    let rBtn = document.getElementById("rightDegree");

    if(rBtn.innerHTML === "C"){
        celsius = true;
        lBtn.innerHTML = "°C";
        rBtn.innerHTML = "F";
    }
    else{
        celsius = false;
        lBtn.innerHTML = "°F";
        rBtn.innerHTML = "C";
    }

    updateWeather(currSelection);
}

function convertToF(num){
    if(celsius === true)
        return num;
    else
        return (num * 9/5) + 32;
}
function convertToC(num){
    if(celsius === true)
        return (num - 32) * 5/9;
    else
        return num;
}


function storeZipCode(){
    let zipfield = document.getElementById("zipField");
    zip = zipfield.value;

    $.ajax(
        {
            url: "http://open.mapquestapi.com/geocoding/v1/address?key=aUKSvay6DHbOfBO51hsrijyOS6GJzedn&location=" + zip,
            crossDomain: true,  // NEED THIS FOR CORS ISSUES
            success: function (response) {
                let country, ndx;

                for(let i = 0; i < response.results[0].locations.length; i++){
                    country = response.results[0].locations[i].adminArea1;
                    if(country === 'US') {
                        ndx = i;
                        break;
                    }
                    else if(i === response.results[0].locations.length - 1) {
                        country = response.results[0].locations[0].adminArea1;
                        ndx = 0;
                    }

                }


                latitude = response.results[0].locations[ndx].displayLatLng.lat;
                longitude = response.results[0].locations[ndx].displayLatLng.lng;

                let state = response.results[0].locations[ndx].adminArea3;
                let city = response.results[0].locations[ndx].adminArea5;
                let county = response.results[0].locations[ndx].adminArea4;



                if(city !== "")
                    locationHeader.innerHTML = city + ", " + state;
                else if(county !== "")
                    locationHeader.innerHTML = county + ", " + state;
                else
                    locationHeader.innerHTML = state;

                updateLocation();
            }
        }
    );
}

function updateLocation(){

    $.ajax(
        {
            url: "https://api.weather.gov/points/" + latitude + "," + longitude,
            crossDomain: true,  // NEED THIS FOR CORS ISSUES
            success: function (response) {
                forecastURL = response.properties.forecast;
                gridURL = response.properties.forecastGridData;
                updateWeather(0);
                dayChange(1);
            }
        }
    );
}

function updateWeather(header){
    $.ajax(
        {
            url: forecastURL + "",
            crossDomain: true,  // NEED THIS FOR CORS ISSUES
            success: function (response) {
                switch(header){
                    case 0:
                        dayName = day1Name;
                        dayNdx = day1Ndx;
                        dayImg = day1Img;
                        break;
                    case 1:
                        dayName = day2Name;
                        dayNdx = day2Ndx;
                        dayImg = day2Img;
                        break;
                    case 2:
                        dayName = day3Name;
                        dayNdx = day3Ndx;
                        dayImg = day3Img;
                        break;
                    case 3:
                        dayName = day4Name;
                        dayNdx = day4Ndx;
                        dayImg = day4Img;
                        break;
                    case 4:
                        dayName = day5Name;
                        dayNdx = day5Ndx;
                        dayImg = day5Img;
                        break;
                    case 5:
                        dayName = day6Name;
                        dayNdx = day6Ndx;
                        dayImg = day6Img;
                        break;
                    case 6:
                        dayName = day7Name;
                        dayNdx = day7Ndx;
                        dayImg = day7Img;
                        break;
                }


                headingTemp.innerHTML = Math.round(convertToC(response.properties.periods[dayNdx].temperature)) + "";
                headingDesc.innerHTML = response.properties.periods[dayNdx].shortForecast;

                headingName.innerHTML = dayName.innerHTML;

                let ndx = 0;
                day1Ndx = ndx;

                if(response.properties.periods[day1Ndx].name === "Tonight"){
                    day1Img.src = 'images/022-night-3.png';
                }
                else if(response.properties.periods[day1Ndx].shortForecast.match(".*Snow.*")){
                    day1Img.src = 'images/006-snowy.png';
                }
                else if(response.properties.periods[day1Ndx].shortForecast.match(".*Rain.*")){
                    day1Img.src = 'images/003-rainy.png';
                }
                else if(response.properties.periods[day1Ndx].shortForecast.match(".*Cloud.*")){
                    day1Img.src = 'images/011-cloudy.png';
                }
                else{
                    day1Img.src = 'images/039-sun.png';
                }

                if(response.properties.periods[day2Ndx].shortForecast.match(".*Snow.*")){
                    day2Img.src = 'images/006-snowy.png';
                }
                else if(response.properties.periods[day2Ndx].shortForecast.match(".*Rain.*")){
                    day2Img.src = 'images/003-rainy.png';
                }
                else if(response.properties.periods[day2Ndx].shortForecast.match(".*Cloud.*")){
                    day2Img.src = 'images/011-cloudy.png';
                }
                else{
                    day2Img.src = 'images/039-sun.png';
                }


                if(response.properties.periods[day3Ndx].shortForecast.match(".*Snow.*")){
                    day3Img.src = 'images/006-snowy.png';
                }
                else if(response.properties.periods[day3Ndx].shortForecast.match(".*Rain.*")){
                    day3Img.src = 'images/003-rainy.png';
                }
                else if(response.properties.periods[day3Ndx].shortForecast.match(".*Cloud.*")){
                    day3Img.src = 'images/011-cloudy.png';
                }
                else{
                    day3Img.src = 'images/039-sun.png';
                }


                if(response.properties.periods[day4Ndx].shortForecast.match(".*Snow.*")){
                    day4Img.src = 'images/006-snowy.png';
                }
                else if(response.properties.periods[day4Ndx].shortForecast.match(".*Rain.*")){
                    day4Img.src = 'images/003-rainy.png';
                }
                else if(response.properties.periods[day4Ndx].shortForecast.match(".*Cloud.*")){
                    day4Img.src = 'images/011-cloudy.png';
                }
                else{
                    day4Img.src = 'images/039-sun.png';
                }


                if(response.properties.periods[day5Ndx].shortForecast.match(".*Snow.*")){
                    day5Img.src = 'images/006-snowy.png';
                }
                else if(response.properties.periods[day5Ndx].shortForecast.match(".*Rain.*")){
                    day5Img.src = 'images/003-rainy.png';
                }
                else if(response.properties.periods[day5Ndx].shortForecast.match(".*Cloud.*")){
                    day5Img.src = 'images/011-cloudy.png';
                }
                else{
                    day5Img.src = 'images/039-sun.png';
                }


                if(response.properties.periods[day6Ndx].shortForecast.match(".*Snow.*")){
                    day6Img.src = 'images/006-snowy.png';
                }
                else if(response.properties.periods[day6Ndx].shortForecast.match(".*Rain.*")){
                    day6Img.src = 'images/003-rainy.png';
                }
                else if(response.properties.periods[day6Ndx].shortForecast.match(".*Cloud.*")){
                    day6Img.src = 'images/011-cloudy.png';
                }
                else{
                    day6Img.src = 'images/039-sun.png';
                }


                if(response.properties.periods[day7Ndx].shortForecast.match(".*Snow.*")){
                    day7Img.src = 'images/006-snowy.png';
                }
                else if(response.properties.periods[day7Ndx].shortForecast.match(".*Rain.*")){
                    day7Img.src = 'images/003-rainy.png';
                }
                else if(response.properties.periods[day7Ndx].shortForecast.match(".*Cloud.*")){
                    day7Img.src = 'images/011-cloudy.png';
                }
                else{
                    day7Img.src = 'images/039-sun.png';
                }

                headingImg.src = dayImg.src;
            }
        }
    );
    $.ajax(
        {
            url: gridURL + "",
            crossDomain: true,  // NEED THIS FOR CORS ISSUES
            success: function (response) {
                let date = parseInt(response.properties.relativeHumidity.values[0].validTime.substring(8,10));
                let targetDate = header + date;

                //Get humidity for selected day
                let ndx = 0;
                while(ndx < response.properties.relativeHumidity.values.length && parseInt(response.properties.relativeHumidity.values[ndx].validTime.substring(8,10)) !== targetDate){
                    ndx += 1;
                }
                if(ndx >= response.properties.relativeHumidity.values.length)
                    headingHumidity.innerHTML = "Humidity: 0%";
                else
                    headingHumidity.innerHTML = "Humidity: " + response.properties.relativeHumidity.values[ndx].value + "%";


                //Get Precipitation for selected day
                ndx = 0;
                while(ndx < response.properties.probabilityOfPrecipitation.values.length && parseInt(response.properties.probabilityOfPrecipitation.values[ndx].validTime.substring(8,10)) !== targetDate){
                    ndx += 1;
                }
                if(ndx  >= response.properties.probabilityOfPrecipitation.values.length)
                    headingPrec.innerHTML = "Precipitation: 0%"
                else
                    headingPrec.innerHTML = "Precipitation: " + response.properties.probabilityOfPrecipitation.values[header].value + "%";


                //Get windspeed for selected day
                ndx = 0;
                while(ndx < response.properties.windSpeed.values.length && parseInt(response.properties.windSpeed.values[ndx].validTime.substring(8,10)) !== targetDate){
                    ndx += 1;
                }
                if(ndx >= response.properties.windSpeed.values.length)
                    headingWind.innerHTML = "Wind: 0 MPH";
                else
                    headingWind.innerHTML = "Wind: " + Math.round(response.properties.windSpeed.values[ndx].value * 2.237) + " MPH";



                day1High.innerHTML = Math.ceil(convertToF(response.properties.maxTemperature.values[0].value)) + "°";
                day1Low.innerHTML = Math.floor(convertToF(response.properties.minTemperature.values[0].value)) + "°";

                day2High.innerHTML = Math.ceil(convertToF(response.properties.maxTemperature.values[1].value)) + "°";
                day2Low.innerHTML = Math.floor(convertToF(response.properties.minTemperature.values[1].value)) + "°";

                day3High.innerHTML = Math.ceil(convertToF(response.properties.maxTemperature.values[2].value)) + "°";
                day3Low.innerHTML = Math.floor(convertToF(response.properties.minTemperature.values[2].value)) + "°";

                day4High.innerHTML = Math.ceil(convertToF(response.properties.maxTemperature.values[3].value)) + "°";
                day4Low.innerHTML = Math.floor(convertToF(response.properties.minTemperature.values[3].value)) + "°";

                day5High.innerHTML = Math.ceil(convertToF(response.properties.maxTemperature.values[4].value)) + "°";
                day5Low.innerHTML = Math.floor(convertToF(response.properties.minTemperature.values[4].value)) + "°";

                day6High.innerHTML = Math.ceil(convertToF(response.properties.maxTemperature.values[5].value)) + "°";
                day6Low.innerHTML = Math.floor(convertToF(response.properties.minTemperature.values[5].value)) + "°";

                day7High.innerHTML = Math.ceil(convertToF(response.properties.maxTemperature.values[6].value)) + "°";
                day7Low.innerHTML = Math.floor(convertToF(response.properties.minTemperature.values[6].value)) + "°";
            }
        }
    );
}

function dayChange(num){
    let day = document.getElementById("day" + num);

    day.className = "grid-item2-clicked";


    for(let i = 1; i <= 7; i++){
        if(i!==num)
            document.getElementById("day" + i).className = "grid-item2";
    }

    currSelection = num - 1;
    updateWeather(currSelection);
}



window.onload = function () {
    $.ajax(
        {
            url: forecastURL + "",
            crossDomain: true,  // NEED THIS FOR CORS ISSUES
            success: function (response) {
                headingTemp.innerHTML = Math.round(convertToC(response.properties.periods[0].temperature)) + "";
                headingDesc.innerHTML = response.properties.periods[0].shortForecast;

                let ndx = 0;
                day1Ndx = ndx;

                while(response.properties.periods[ndx].name !== "Tonight"){
                    ndx += 1;
                }
                //Skip index for Tonight
                ndx += 1;
                day2Ndx = ndx;

                //skip index for tomorrow and tomorrow night
                ndx += 2;

                day3Name.innerHTML = response.properties.periods[ndx].name;
                day3Ndx = ndx;
                //skip indices for nights
                ndx += 2;
                day4Name.innerHTML = response.properties.periods[ndx].name;
                day4Ndx = ndx;
                ndx += 2;
                day5Name.innerHTML = response.properties.periods[ndx].name;
                day5Ndx = ndx;
                ndx += 2;
                day6Name.innerHTML = response.properties.periods[ndx].name;
                day6Ndx = ndx;
                ndx += 2;
                day7Name.innerHTML = response.properties.periods[ndx].name;
                day7Ndx = ndx;

                if(response.properties.periods[day1Ndx].name === "Tonight"){
                    day1Img.src = 'images/022-night-3.png';
                }
                else if(response.properties.periods[day1Ndx].shortForecast.match(".*Snow.*")){
                    day1Img.src = 'images/006-snowy.png';
                }
                else if(response.properties.periods[day1Ndx].shortForecast.match(".*Rain.*")){
                    day1Img.src = 'images/003-rainy.png';
                }
                else if(response.properties.periods[day1Ndx].shortForecast.match(".*Cloud.*")){
                    day1Img.src = 'images/011-cloudy.png';
                }
                else{
                    day1Img.src = 'images/039-sun.png';
                }

                if(response.properties.periods[day2Ndx].shortForecast.match(".*Snow.*")){
                    day2Img.src = 'images/006-snowy.png';
                }
                else if(response.properties.periods[day2Ndx].shortForecast.match(".*Rain.*")){
                    day2Img.src = 'images/003-rainy.png';
                }
                else if(response.properties.periods[day2Ndx].shortForecast.match(".*Cloud.*")){
                    day2Img.src = 'images/011-cloudy.png';
                }
                else{
                    day2Img.src = 'images/039-sun.png';
                }


                if(response.properties.periods[day3Ndx].shortForecast.match(".*Snow.*")){
                    day3Img.src = 'images/006-snowy.png';
                }
                else if(response.properties.periods[day3Ndx].shortForecast.match(".*Rain.*")){
                    day3Img.src = 'images/003-rainy.png';
                }
                else if(response.properties.periods[day3Ndx].shortForecast.match(".*Cloud.*")){
                    day3Img.src = 'images/011-cloudy.png';
                }
                else{
                    day3Img.src = 'images/039-sun.png';
                }


                if(response.properties.periods[day4Ndx].shortForecast.match(".*Snow.*")){
                    day4Img.src = 'images/006-snowy.png';
                }
                else if(response.properties.periods[day4Ndx].shortForecast.match(".*Rain.*")){
                    day4Img.src = 'images/003-rainy.png';
                }
                else if(response.properties.periods[day4Ndx].shortForecast.match(".*Cloud.*")){
                    day4Img.src = 'images/011-cloudy.png';
                }
                else{
                    day4Img.src = 'images/039-sun.png';
                }


                if(response.properties.periods[day5Ndx].shortForecast.match(".*Snow.*")){
                    day5Img.src = 'images/006-snowy.png';
                }
                else if(response.properties.periods[day5Ndx].shortForecast.match(".*Rain.*")){
                    day5Img.src = 'images/003-rainy.png';
                }
                else if(response.properties.periods[day5Ndx].shortForecast.match(".*Cloud.*")){
                    day5Img.src = 'images/011-cloudy.png';
                }
                else{
                    day5Img.src = 'images/039-sun.png';
                }


                if(response.properties.periods[day6Ndx].shortForecast.match(".*Snow.*")){
                    day6Img.src = 'images/006-snowy.png';
                }
                else if(response.properties.periods[day6Ndx].shortForecast.match(".*Rain.*")){
                    day6Img.src = 'images/003-rainy.png';
                }
                else if(response.properties.periods[day6Ndx].shortForecast.match(".*Cloud.*")){
                    day6Img.src = 'images/011-cloudy.png';
                }
                else{
                    day6Img.src = 'images/039-sun.png';
                }


                if(response.properties.periods[day7Ndx].shortForecast.match(".*Snow.*")){
                    day7Img.src = 'images/006-snowy.png';
                }
                else if(response.properties.periods[day7Ndx].shortForecast.match(".*Rain.*")){
                    day7Img.src = 'images/003-rainy.png';
                }
                else if(response.properties.periods[day7Ndx].shortForecast.match(".*Cloud.*")){
                    day7Img.src = 'images/011-cloudy.png';
                }
                else{
                    day7Img.src = 'images/039-sun.png';
                }

                headingImg.src = day1Img.src;

            }
        }
    );

    $.ajax(
        {
            url: gridURL + "",
            crossDomain: true,  // NEED THIS FOR CORS ISSUES
            success: function (response) {
                headingHumidity.innerHTML = "Humidity: " + response.properties.relativeHumidity.values[0].value + "%";
                headingPrec.innerHTML = "Precipitation: " + response.properties.probabilityOfPrecipitation.values[0].value + "%";
                headingWind.innerHTML = "Wind: " + Math.round(response.properties.windSpeed.values[0].value * 2.237) + " MPH";

                day1High.innerHTML = Math.ceil(convertToF(response.properties.maxTemperature.values[0].value)) + "°";
                day1Low.innerHTML = Math.floor(convertToF(response.properties.minTemperature.values[0].value)) + "°";

                day2High.innerHTML = Math.ceil(convertToF(response.properties.maxTemperature.values[1].value)) + "°";
                day2Low.innerHTML = Math.floor(convertToF(response.properties.minTemperature.values[1].value)) + "°";

                day3High.innerHTML = Math.ceil(convertToF(response.properties.maxTemperature.values[2].value)) + "°";
                day3Low.innerHTML = Math.floor(convertToF(response.properties.minTemperature.values[2].value)) + "°";

                day4High.innerHTML = Math.ceil(convertToF(response.properties.maxTemperature.values[3].value)) + "°";
                day4Low.innerHTML = Math.floor(convertToF(response.properties.minTemperature.values[3].value)) + "°";

                day5High.innerHTML = Math.ceil(convertToF(response.properties.maxTemperature.values[4].value)) + "°";
                day5Low.innerHTML = Math.floor(convertToF(response.properties.minTemperature.values[4].value)) + "°";

                day6High.innerHTML = Math.ceil(convertToF(response.properties.maxTemperature.values[5].value)) + "°";
                day6Low.innerHTML = Math.floor(convertToF(response.properties.minTemperature.values[5].value)) + "°";

                day7High.innerHTML = Math.ceil(convertToF(response.properties.maxTemperature.values[6].value)) + "°";
                day7Low.innerHTML = Math.floor(convertToF(response.properties.minTemperature.values[6].value)) + "°";

            }
        }
    );


}


