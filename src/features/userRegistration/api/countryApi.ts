import axios from 'axios';
import { Country } from '../db/types';

export async function getCountriesFromApi(): Promise<Country[]> {
  const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,flags');

  return response.data;
}

export async function getStatesFromApi({ country }: { country: string }): Promise<any> {
  const response = await axios.post('https://countriesnow.space/api/v0.1/countries/states', {
    country: country,
  });

  return response.data;
}
