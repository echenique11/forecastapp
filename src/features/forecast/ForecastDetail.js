import MapView from 'react-native-maps';
import React from 'react';
import {  Text, View, ScrollView } from 'react-native';
import { styles } from '../../assets/styles';

function labelValueText(label, value){
  return (
    <View style={styles.labelValueContainer}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.labelValue}>{value}</Text>
    </View>
  )
}

export default function ForecastDetail({ route, navigation }) {

  const { forecast } = route.params;

  return (
    <ScrollView>
      <View style={[styles.container, styles.padding10 ]}>
        {labelValueText("City :", forecast.name)}
        {labelValueText("Tempature :", forecast.main.temp + " F")}
        {labelValueText("Pressure :", forecast.main.pressure)}
        {labelValueText("Humidity :", forecast.main.humidity)}
        {labelValueText("Max temperature :", forecast.main.temp_max + " F")}
        {labelValueText("Min temperature :", forecast.main.temp_min + " F")}
        <MapView
            style={{ alignSelf: 'stretch', height: 200 }}
            region={{ latitude: forecast.coord.lat, longitude: forecast.coord.lon, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}          
          >
            <MapView
              coordinate={{ latitude: forecast.coord.lat, longitude: forecast.coord.lon }}
              title={forecast.name}
              description={ forecast.weather && forecast.weather.length ? forecast.weather[0].description : forecast.name }
            />
        </MapView>
        
      </View>
    </ScrollView>
  );
}

