const apiCountryList = [];

document.addEventListener('DOMContentLoaded', () => {
  // const getCountries = document.querySelector('#getCountries');
  // getCountries.addEventListener('click', handleGetCountries);
  const url = 'https://restcountries.eu/rest/v2/all';
  makeRequest(url, requestComplete);
});

// and use this handle with the
// const handleGetCountries = function () {
//   const url = 'https://restcountries.eu/rest/v2/all';
//   makeRequest(url, requestComplete);
// };

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
   const optionCountry = document.createElement('option');
   optionCountry.value = country.coic;
   optionCountry.textContent = country.name;
   selectDropDown.appendChild(optionCountry);
  });

};
