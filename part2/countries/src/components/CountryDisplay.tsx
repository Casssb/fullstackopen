/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useState } from 'react';
import { Country } from '../App';

interface Props {
  country: Country;
}

interface Weather {
    temp: string
    imgURL: string
    wind: string
}

const CountryDisplay = ({ country }: Props) => {
  const [shouldDisplay, setShouldDisplay] = useState(false);
  const [weather, setWeather] = useState<Weather>()

  const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY

  const getWeather = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url)
    const data = await response.json()
    const formattedData = {
        temp: data.main.temp,
        imgURL: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        wind: data.wind.speed
    }
    setWeather(formattedData)
  };

  useEffect(() => {
    if(shouldDisplay) {
        void getWeather()
    }
  }, [shouldDisplay])
  return (
    <div>
      {shouldDisplay ? (
        <div>
          <h3>{country.name}</h3>
          <img src={country.flag} alt={`national flag of ${country.name}`} />
          {country.capital && <p>capital: {country.capital[0]}</p>}
          <p>area: {country.area}</p>
          <h5>Languages</h5>
          <ul>
            {country.languages.map((language) => (
              <li>{language}</li>
            ))}
          </ul>
          <h4>Weather in {country.name}</h4>
          <p>Temperature: {weather?.temp} °C</p>
          <img src={weather?.imgURL} alt="" />
          <p>wind: {weather?.wind} m/s</p>
          <button onClick={() => setShouldDisplay(!shouldDisplay)}>Hide</button>
        </div>
      ) : (
        <div>
          <h5>{country.name}</h5>
          <button onClick={() => setShouldDisplay(!shouldDisplay)}>Show</button>
        </div>
      )}
    </div>
  );
};

export default CountryDisplay;
