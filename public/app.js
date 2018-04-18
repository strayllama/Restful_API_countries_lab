document.addEventListener('DOMContentLoaded', () => {
  const getCountries = document.querySelector('#getCountries');
  getCountries.addEventListener('click', handleGetCountries);

});

// and use this handle with the
const handleGetCountries = function () {
  const url = 'https://restcountries.eu/rest/v2/all';
  makeRequest(url, requestComplete);
};

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
  populateList(countries); // use array with our function to create countries
  console.dir(countries);
};


const populateList = function (countries) {
  const ul = document.querySelector('#country-list');

  countries.forEach((country) => {
    const li = document.createElement('li');

    li.textContent = country.name + "  Population: " + country.population;
    ul.appendChild(li);
  });
};
