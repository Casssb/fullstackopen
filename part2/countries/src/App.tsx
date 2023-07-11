/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useState } from 'react';
import CountryDisplay from './components/CountryDisplay';

export interface Country {
  name: string;
  capital: string[]
  area: number;
  languages: string[];
  flag: string;
  latlng: string[]
}

function App() {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([])

  const getAllCountries = async () => {
    try {
      const url = `https://studies.cs.helsinki.fi/restcountries/api/all`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const formattedCountries = data.map((country) => {
        return {
          name: country.name.common,
          capital: country.capital,
          area: country.area,
          languages: Object.values(Object(country.languages)),
          flag: country.flags.png,
          latlng: country.latlng
        };
      });
      console.log(formattedCountries);
      setCountries(formattedCountries as Country[]);
    } catch (error) {
      console.log(error);
    }
  };

  const filterCountries = () => {
    const filtered = countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase()))
    setFilteredCountries(filtered)
  }

  useEffect(() => {
    void getAllCountries();
  }, []);

  return (
    <>
      <div>
        <label htmlFor="country">find countries</label>
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            filterCountries()
          }}
        />
      </div>
      <div>{filteredCountries.length < 10 && filteredCountries.map(country => (
        <CountryDisplay country={country}/>
      ))}</div>
      {filteredCountries.length > 10 && search !== '' && <div>Too many matches. Please be more specific</div>}
    </>
  );
}

export default App;
