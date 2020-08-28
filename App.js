import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ForecastRoutes } from './src/features/navigation/Routes';
import ForecastContext from './src/contexts/ForecastContext';
import { getStoredCitiesForecast } from './src/utils/CitiesStorage';


export default function App() {
  const [citiesForecasts, setCitiesForecasts ] = React.useState([]);

  useEffect(() => {    
    async function loadStoredCities() {
      const cities = await getStoredCitiesForecast();     
      console.log("cities:::", cities) 
      setCitiesForecasts(cities);
    }    
    loadStoredCities();
  }, []);

  return (
    <ForecastContext.Provider value={[citiesForecasts, setCitiesForecasts ]}>
      <NavigationContainer>
        <ForecastRoutes />
      </NavigationContainer>
    </ForecastContext.Provider>
  );
}


