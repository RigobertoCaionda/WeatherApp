let searchInputI = document.querySelector('.searchInput i');
let searchInput = document.querySelector('.searchInput input');
let temperatureRight = document.querySelector('.temperature-right');
let place = document.querySelector('.place');
let humidity = document.querySelector('.humidity-right');
let visibility = document.querySelector('.visibilty-right');
let windSpeed = document.querySelector('.wind-speed--right');
let cityName = document.querySelector('.city-name');
let looksLikeTitle = document.querySelector('.looks-like--title');
let celsius = document.querySelector('.weather-panel--left---bottom----right');
let currentDate = document.querySelector('.date');
let time = document.querySelector('.time');
setInterval(()=>{
	let d = new Date();
	let weekDay = d.getDay();
	let day = d.getDate();
	if(day < 10){
		day = `0${day}`;
	}
	let month = d.getMonth();
	let monthArray = ['January','February','March','April','May',
	'June','July','August','September','October','November','December'];
	let daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday','Wednesday', 'Thursday', 'Friday', 'Saturday'];
	let year = d.getFullYear();
	currentDate.innerHTML = `${daysOfTheWeek[weekDay]}, ${day} ${monthArray[month]} ${year}`;
	let hour = d.getHours();
	if(hour < 10){
		hour = `0${hour}`;
	}
	let minutes = d.getMinutes();
	if(minutes < 10){
		minutes = `0${minutes}`;
	}
	let seconds = d.getSeconds();
	if(seconds < 10){
		seconds = `0${seconds}`;
	}
	time.innerHTML = `${hour}:${minutes}:${seconds}`;
},1000);
searchInputI.addEventListener('click',()=>{
	if(searchInput.value == ''){
		alert('Type a city name');
	}else{
		loadingCountryStatus();
	}
});
searchInput.addEventListener('keyup',(e)=>{
	if(e.keyCode == 13){
			if(searchInput.value == ''){
			alert('Type a city name');
		}else{
			loadingCountryStatus();
		}
	}
});
async function loadingCountryStatus(){
	let req = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=c76d837a8c559bbe5d1b045f18cb5679`);
	let json = await req.json();
	if(json.cod == 404){
		alert('City not found\n Type a valid name');
	}else{
		findCountryDetails(json);
	}
}
function findCountryDetails(lista){
	let temperature = (lista.main.temp - 273.15);
	place.style.visibility = 'visible';
	temperatureRight.style.visibility = 'visible';
	humidity.style.visibility = 'visible';
	visibility.style.visibility = 'visible';
	windSpeed.style.visibility = 'visible';
	cityName.style.visibility = 'visible';
	looksLikeTitle.style.visibility = 'visible';
	looksLikeTitle.innerHTML = `${lista.weather[0].main}`;
	celsius.style.visibility = 'visible';
	celsius.innerHTML = `${Math.floor(temperature)}ºc`;
	cityName.innerHTML = `${lista.name}, ${lista.sys.country}`;
	windSpeed.innerHTML = `${lista.wind.speed} m/s`;
	visibility.innerHTML = `${lista.visibility} m`;
	humidity.innerHTML = `${lista.main.humidity}%`;
	temperatureRight.innerHTML = `${Math.floor(temperature)}ºc (${lista.weather[0].main})`;
	place.innerHTML = `${lista.name}`;
}