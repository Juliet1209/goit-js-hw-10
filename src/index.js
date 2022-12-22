import './css/styles.css';
import CoutnryApiServices from './fetch-countries';

const refs = {
  inputText: document.querySelector('#search-box'),
  countryListHTML: document.querySelector('.country-list'),
  countryInfoHTML: document.querySelector('.country-info'),
};

const DEBOUNCE_DELAY = 300;
const debounce = require('lodash.debounce');
const coutnryApiServices = new CoutnryApiServices();

refs.inputText.addEventListener(
  'input',
  debounce(searchCountries, DEBOUNCE_DELAY)
);

function searchCountries() {
  const nameInput = refs.inputText.value;
  refs.countryListHTML.innerHTML = '';
  refs.countryInfoHTML.innerHTML = '';

  if (refs.inputText.value !== '') {
    coutnryApiServices.nameSearch = nameInput;
    coutnryApiServices
      .fetchCountries()
      .then(arrayCountries => {
        markupCountriesList(arrayCountries);
        markupCountryBlock(arrayCountries);
      })
      .catch(error => {});
  }
}

function markupCountriesList(arrayCountries) {
  if (arrayCountries.length > 2 && arrayCountries.length < 10) {
    const markup = arrayCountries.map(country => {
      return `<li class="country-item">
      <img src="${country.flags.svg}" class="country-flag" width="40" height="40" alt="flag">
      ${country.name.official}
      </li>`;
    });
    refs.countryListHTML.insertAdjacentHTML('beforeend', markup.join(''));
  }
}

function markupCountryBlock(arrayCountries) {
  if (arrayCountries.length < 2) {
    const markup = arrayCountries.map(country => {
      return `<div class="country-info__header">
            <img src="${
              country.flags.svg
            }" class="country-flag" width="40" height="40" alt="flag">
            <span class="country-info__list">${country.name.official}</span>
            </div>
            <ul class="country-info__feature">
            <li class="country-info__feature">Capital: <span>${
              country.capital
            }</span></li>
            <li class="country-info__feature">Population: <span>${
              country.population
            }</span></li>
            <li class="country-info__feature">Langueses: <span>${Object.values(
              country.languages
            )}</span></li>
            </ul>`;
    });
    refs.countryInfoHTML.insertAdjacentHTML('beforeend', markup.join(''));
  }
}
