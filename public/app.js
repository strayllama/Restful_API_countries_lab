const apiCountryList = [];

document.addEventListener('DOMContentLoaded', () => {
  const url = 'https://restcountries.eu/rest/v2/all';
  makeRequest(url, requestComplete);

  const selectDropDown = document.querySelector('#country-picker');
  selectDropDown.addEventListener('change', handleSelectCountry);
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
  console.dir(apiCountryList);
  populateDropDown();
};


const populateDropDown = function () {
  const selectDropDown = document.querySelector('#country-picker');
  apiCountryList.forEach((country) => {
    if (!country.cioc == null || !country.cioc == "") {
      const optionCountry = document.createElement('option');
      optionCountry.value = country.cioc;
      optionCountry.textContent = country.name;
      selectDropDown.appendChild(optionCountry);
    }
  });
};

const handleSelectCountry = function (event) {
  const countryCioc = event.target.value;
  const selectedCountry = apiCountryList.find((country) => {
    return country.cioc === countryCioc;
  });
console.log(selectedCountry);
  displayCountry(selectedCountry);
};

const displayCountry = function (country) {
  const container = document.querySelector('#country-details');
  container.textContent = "";

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
