import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useContext } from 'react';
import { View, ActivityIndicator, Alert } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import ForecastList from './ForecastList';
import { styles } from '../../assets/styles';
import ForecastAPI from '../../api/ForecastAPI'
import { storeCityForecast } from '../../utils/CitiesStorage';
import ForecastContext from '../../contexts/ForecastContext';

export default function ForecastSearch({ navigation }) {
  const [ citiesForecasts, setCitiesForecasts ] = useContext(ForecastContext);
  const [cityName, setCityName] = React.useState('');
  const [searching, setSearching] = React.useState(false);

  const onChangeText = cityName => setCityName(cityName);

  const searchForecast = () => {
    if(cityName){
      setSearching(true);
      ForecastAPI.getForecastByCity({ city: cityName }).then(async (response) => {      
        setSearching(false);  
        setCitiesForecasts(await storeCityForecast(response));
        setCityName('');
        navigation.navigate('Forecast', { forecast: response});        
      }).catch((error) => {
        console.log("ERROR:::",error);
        setSearching(false);
        showMessage("Ups!! something went wrong. Please try again later.");
      });
    } else {
      showMessage("You must type a city name");
    }
   
  }

  const showMessage = (message) => {
    Alert.alert(
      "ForecastApp",
      message,
      [
        
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
  }

  return (
    <View style={styles.container}>
        <StatusBar style="auto" />
      <Text style={styles.greatingText}>Let us know the name of the city you would like to know the forecast</Text>
       <TextInput
          label="City name"
          onChangeText={onChangeText}
          value={cityName}
          returnKeyType='search'
          onSubmitEditing={searchForecast}
        />
        { searching && 
          <View style={styles.activityIndicatorContainer}  ><ActivityIndicator size='large' /></View>
        }
        <View style={[styles.container,styles.marginTop10]} >
          <ForecastList limit={5} />
        </View>
      
        
    </View>
  );
}
