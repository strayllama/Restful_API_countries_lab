const apiCountryList = [];
const regionCountryList = [];
let currentCountry = "";

document.addEventListener('DOMContentLoaded', () => {
  const url = 'https://restcountries.eu/rest/v2/all';
  makeRequest(url, requestComplete);

  const selectDropDown = document.querySelector('#country-picker');
  selectDropDown.addEventListener('change', handleSelectCountry);

  const borderButton = document.querySelector('#border-countries-button');
  borderButton.addEventListener('click', displayBorders);
});


// The steps to get info from any API
const makeRequest = function (url, callback) {
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.send();
  request.addEventListener('load', callback);
};


const requestComplete = function () {
  if (this.status !==200) return; // this. is the request object. should be 200, else an error object
  const jsonString = this.responseText;  // take response
  const countries = JSON.parse(jsonString); // make to useable javascript object
  countries.forEach((country) => {
    apiCountryList.push(country);
  });
  countries.forEach((country) => {
    if(!regionCountryList.includes(country.region) && country.region != ""){
    regionCountryList.push(country.region)}
  });
  populateRegionDropDown();
  populateDropDown();
};

const populateRegionDropDown = function () {
  const regionDropDown = document.querySelector('#region-picker')
  regionCountryList.forEach((region) => {
    const optionRegion = document.createElement('option');
    optionRegion.value = region;
    optionRegion.textContent = region;
    regionDropDown.appendChild(optionRegion)
  })
};


const populateDropDown = function () {
  const selectDropDown = document.querySelector('#country-picker');
  apiCountryList.forEach((country) => {
    if (!country.alpha3Code == null || !country.alpha3Code == "") {
      const optionCountry = document.createElement('option');
      optionCountry.value = country.alpha3Code;
      optionCountry.textContent = country.name;
      selectDropDown.appendChild(optionCountry);
    }
  });
};

const findCountry = function(alpha3Code) {
  return apiCountryList.find((country) => {
  if (country.alpha3Code === alpha3Code){
    return country;
    };
  });
};

const handleSelectCountry = function (event) {
    const countryalpha3Code = event.target.value;
    console.log(countryalpha3Code);
  currentCountry = findCountry(countryalpha3Code);

  clearContainer();
  const countryContainer = document.querySelector('#country-details');
  displayCountry(currentCountry, countryContainer);
};


const displayCountry = function (country, container) {
  // countryContainer.textContent = "";

  const name = document.createElement('li');
  name.classList.add("bold");
  const details = document.createElement('ul');

  const pop = document.createElement('li');
  const capital = document.createElement('li');
  const flag = document.createElement('img');
  flag.classList.add("flag");


  name.textContent = `Country : ${country.name}`;
  pop.textContent = `Population : ${country.population}`;
  capital.textContent = `Capital : ${country.capital}`;
  flag.src = country.flag;

  container.appendChild(name);

  details.appendChild(pop);
  details.appendChild(capital);
  details.appendChild(flag);
  container.appendChild(details);
};

const clearContainer = function () {
  const countryContainer = document.querySelector('#country-details')
  countryContainer.textContent = "";
    clearBorderContainer();
};

const clearBorderContainer = function () {
  const borderContainer = document.querySelector('#border-countries-container');
  borderContainer.textContent = "";
}

const displayBorders = function() {
  clearBorderContainer();
  const countryContainer = document.querySelector('#country-details');
  const title = document.createElement('h2');
  const borderContainer = document.querySelector('#border-countries-container');
  if(!countryContainer == "" && !currentCountry.borders.length == 0){
    title.textContent = `Countries bordering ${currentCountry.name}`;
    borderContainer.appendChild(title);
    currentCountry.borders.forEach((countryalpha3Code) => {
      let borderCountry = findCountry(countryalpha3Code)
      displayCountry(borderCountry, borderContainer)
    });
    } else {

      title.textContent = `${currentCountry.name} has no bordering countries!`
      borderContainer.appendChild(title);
  };
};
