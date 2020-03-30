import { SET_COUNTRY } from "./actionTypes";
import axios from "axios";

// const instance = axios.create({
//   baseURL: "https://covidapi.info/api/v1/"
// });

const instance = axios.create({
  baseURL: "https://covid19.mathdro.id/api/countries/"
});

// export const fetchCountriesData = countries => async dispatch => {
//   try {
//     const countriesData = {};
//     for (let i = 0; i < countries.length; i++) {
//       const res = await instance.get(`country/${countries[i]}`);
//       const countryData = res.data;
//       countriesData[countries[i]] = countryData.result;
//     }
//     dispatch({ type: SET_COUNTRY_DATA, payload: countriesData });
//   } catch (error) {
//     console.error(error);
//   }
// };

export const fetchCountryData = country => async dispatch => {
  try {
    const res = await instance.get(`${country}`);
    const countryData = res.data;
    dispatch({ type: SET_COUNTRY, payload: countryData });
  } catch (err) {
    console.error(err);
  }
};
