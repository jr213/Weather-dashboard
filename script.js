const stolenKey = `7537fc2df623430a5e00f2e755b75665`
const apiKey = `0c8c4b1284ca64a686ba2461f0c19730`
let searchBtn = document.querySelector('.searchBtn');
let searchInput = document.querySelector('.searchInput');
let lat;
let lon;
let temp;
let wind;
let humidity;
let uvIndex;
let icon;
let date,date1,date2,date3,date4,date5;
let cityName;
let description;
let temp1, temp2,temp3,temp4,temp5;
let wind1, wind2, wind3, wind4, wind5;
let humidity1,humidity2,humidity3,humidity4,humidity5;
let desc1,desc2,desc3,desc4,desc5;
let searchArray=[];
let buttonHolder = document.getElementById('buttonHolder');
const multiDayWeather = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=44.34&lon=10&cnt=7&appid=${apiKey}`;
const currentWeather = `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10&appid=${apiKey}`;
const geocodingApi = `http://api.openweathermap.org/geo/1.0/direct?q=phoenix&limit=1&appid=${apiKey}`;

var getWeather = function (api) {
fetch(api)
  .then((res) =>{
    res.json().then((data) => {
      return data;
      
    })
  })
}

searchBtn.addEventListener('click', getSingleDayWeather);
async function getSingleDayWeather(buttonSearchTerm){
  let searchTerm= searchInput.value;
  // if(buttonSearchTerm){
  //   searchTerm=buttonSearchTerm;
  // }
  console.log(buttonSearchTerm);

  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=1&appid=${stolenKey}`)
  .then((res) =>{
    res.json().then((data) => {
      lat = data[0].lat;
      lon=data[0].lon;
      getCurrentWeatherLatLon(lat, lon);
      addSearchToLocalStorage(searchTerm);
      makeButton();
    })
  })
}

function addSearchToLocalStorage(searchInput){
  searchArray.push(searchInput);
  localStorage.setItem('searchArray', JSON.stringify(searchArray));
}
function getCurrentWeatherLatLon(lat, lon){
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${stolenKey}`)
  .then((res) =>{
    res.json().then((data) => {
      temp = data.main.temp;
      date= new Date().toLocaleDateString();
      wind = data.wind.speed;
      humidity= data.main.humidity;
      icon=data.weather[0].icon;
      cityName=data.name;
      description= data.weather[0].description;
      setSingleDay();
    })
  })
}

function setSingleDay(){
  document.getElementById('singleDayHumidity').innerHTML='Humidity: ' + humidity + '%';
  document.getElementById('date').innerHTML=date;
  document.getElementById('singleDayWind').innerHTML='Wind Speed: '+ wind + 'MPH';
  document.getElementById('cityName').innerHTML=cityName;
  document.getElementById('singleDayIcon').innerHTML=icon;
  document.getElementById('singleDayTemp').innerHTML=kelvinToFahrenheit(temp) + '°F';
  document.getElementById('singleDayDesc').innerHTML=description;
  getFiveDay(lat, lon);
}
function getFiveDay(lat, lon){
  fetch(`https://api.openweathermap.org/data/2.5/forecast/?lat=${lat}&lon=${lon}&appid=${stolenKey}`)
  .then((res) =>{
    res.json().then((data) => {
      desc1=data.list[0].weather[0].description;
      temp1= data.list[0].main.temp;
      wind1=data.list[0].wind.speed;
      humidity1=data.list[0].main.humidity;
      date1=data.list[0].dt_txt;
      desc2=data.list[8].weather[0].description;
      temp2= data.list[8].main.temp;
      wind2=data.list[8].wind.speed;
      humidity2=data.list[8].main.humidity;
      date2=data.list[8].dt_txt;

      desc3=data.list[16].weather[0].description;
      temp3= data.list[16].main.temp;
      wind3=data.list[16].wind.speed;
      humidity3=data.list[16].main.humidity;
      date3=data.list[16].dt_txt;

      desc4=data.list[24].weather[0].description;
      temp4= data.list[24].main.temp;
      wind4=data.list[24].wind.speed;
      humidity4=data.list[24].main.humidity;
      date4=data.list[24].dt_txt;

      desc5=data.list[32].weather[0].description;
      temp5= data.list[32].main.temp;
      wind5=data.list[32].wind.speed;
      humidity5=data.list[32].main.humidity;
      date5=data.list[32].dt_txt;

      setFiveDay();
    })
  })
}
function setFiveDay(){
  document.getElementById('dayOneDesc').innerHTML=desc1;
  document.getElementById('date1').innerHTML=convertDate(date1);
  document.getElementById('dayOneTemp').innerHTML=kelvinToFahrenheit(temp1) + '°F';
  document.getElementById('dayOneWind').innerHTML='Wind Speed: '+ wind1 + 'MPH';
  document.getElementById('dayOneHumid').innerHTML='Humidity: ' + humidity1 + '%';
  document.getElementById('dayTwoDesc').innerHTML=desc2;
  document.getElementById('date2').innerHTML=convertDate(date2);

  document.getElementById('dayTwoTemp').innerHTML=kelvinToFahrenheit(temp2) + '°F';
  document.getElementById('dayTwoWind').innerHTML='Wind Speed: '+ wind2 + 'MPH';
  document.getElementById('dayTwoHumid').innerHTML='Humidity: ' + humidity2 + '%';
  document.getElementById('dayThreeDesc').innerHTML=desc3;
  document.getElementById('date3').innerHTML=convertDate(date3);

  document.getElementById('dayThreeTemp').innerHTML=kelvinToFahrenheit(temp3) + '°F';
  document.getElementById('dayThreeWind').innerHTML='Wind Speed: '+ wind3 + 'MPH';
  document.getElementById('dayThreeHumid').innerHTML='Humidity: ' + humidity3 + '%';
  document.getElementById('dayFourDesc').innerHTML=desc4;
  document.getElementById('date4').innerHTML=convertDate(date4);

  document.getElementById('dayFourTemp').innerHTML=kelvinToFahrenheit(temp4) + '°F';
  document.getElementById('dayFourWind').innerHTML='Wind Speed: '+ wind4 + 'MPH';
  document.getElementById('dayFourHumid').innerHTML='Humidity: ' + humidity4 + '%';
  document.getElementById('dayFiveDesc').innerHTML=desc5;
  document.getElementById('date5').innerHTML=convertDate(date5);

  document.getElementById('dayFiveTemp').innerHTML=kelvinToFahrenheit(temp5) + '°F';
  document.getElementById('dayFiveWind').innerHTML='Wind Speed: '+ wind5 + 'MPH';
  document.getElementById('dayFiveHumid').innerHTML='Humidity: ' + humidity5 + '%';
}
function kelvinToFahrenheit(kelvin){
  let fahrenheit;
  fahrenheit= ((kelvin-273.15)*1.8)+32;
  return Math.round(fahrenheit);
}
function convertDate(uglyDate){
  let splitDate= uglyDate.split(' ')[0];
  const [year, month, day] = splitDate.split('-');
  const result = [month, day].join('/');
  return result;
}
function makeButton(loadData){
  if(loadData){
    searchArray=loadData;
  }
  removeAllChildNodes(buttonHolder);
  for(i=0; i<searchArray.length;i++){
    let button = document.createElement('button');
    button.textContent+=searchArray[i];
    buttonHolder.append(button);
  }
}
function removeAllChildNodes(buttonHolder) {
  while (buttonHolder.firstChild) {
      buttonHolder.removeChild(buttonHolder.firstChild);
  }
}
async function initArray(){
  let searchArray = await localStorage.getItem('searchArray');
  if(searchArray== null || searchArray=="") return;
  let loadData = JSON.parse(searchArray);
  searchArray = loadData;
  console.log(loadData);
  makeButton(loadData);
}

window.onload = function() {
  initArray();
};
buttonHolder.addEventListener('click', (e)=>{
  console.log(e.target.innerText);
  getSingleDayWeather(e.target.innerText);

  
})
