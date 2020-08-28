import AsyncStorage from '@react-native-community/async-storage';

const StoreKeys = {
    CITIES: '@FORECAST_CITIES'
}

 export const storeCityForecast = async (cityForecast) => {
    try {
        let cities = await getStoredCitiesForecast();
        cities.splice(0,0, cityForecast)
        await AsyncStorage.setItem(StoreKeys.CITIES, JSON.stringify(cities));
        return cities;
      } catch (e) {
        // saving error
      }
 }

 export const updateStoreCityForecast = async (citiesForecasts) => {
  try {
      console.log("updating forecast", citiesForecasts)
      await AsyncStorage.setItem(StoreKeys.CITIES, JSON.stringify(citiesForecasts));
      return citiesForecasts;
    } catch (e) {
      // saving error
    }
}

 export const getStoredCitiesForecast = async () => {
    try {
        const cities = await AsyncStorage.getItem(StoreKeys.CITIES)
        if(cities !== null) {
          return JSON.parse(cities);
        }
        return [];
      } catch(e) {
        return [];
      }
 }