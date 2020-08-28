import React, { useContext, useEffect } from 'react';
import {  View, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { Text, List, Card, Title, Paragraph, Colors } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../assets/styles';
import ForecastContext from '../../contexts/ForecastContext';
import ForecastAPI from '../../api/ForecastAPI'
import { updateStoreCityForecast, getToday, storeLastUpdatedDate, getLastDateStored } from '../../utils';


export default function ForecastList(props) {
  const [cities, setCities ] = React.useState(0);
  const [refreshing, setRefreshing ] = React.useState(false);
  const [lastUpdatedDate, setLastUpdatedDate] = React.useState('');
  const [citiesForecasts, setCitiesForecasts ] = useContext(ForecastContext);
  const navigation = useNavigation();

  useEffect(() => {    
    async function getLastUpdateDate() {
      const date = await getLastDateStored();           
      setLastUpdatedDate(date);
    }    
    getLastUpdateDate();
  }, []);
  

  const deleteCityForecast = (index) => {        
    citiesForecasts.splice(index,1);    
    updateStoreCityForecast(citiesForecasts);    
    setCitiesForecasts(citiesForecasts);
    //use to notify flatlist to rerender
    setCities(citiesForecasts.length);
  }

  const onRefresh = () => {
    setRefreshing(true);
    let cities = citiesForecasts.slice(0,props.limit);
    let citiesPromises = [];
    for(let i in cities){
      let city = cities[i];
      citiesPromises.push(ForecastAPI.getForecastByCity({ city: city.name }));
    }
    Promise.all(citiesPromises).then(results => {
      for(let i in results){
        let forecast = results[i];
        let index = citiesForecasts.findIndex((fc) => fc.name == forecast.name);
        if(index => 0){
          citiesForecasts[index] = forecast;          
        }
      }
      setCitiesForecasts(citiesForecasts);
      setRefreshing(false);   
      let today = getToday();   
      setLastUpdatedDate(today);
      storeLastUpdatedDate(today);
    })
  }

  return (
    <View style={styles.container}>
        <FlatList 
            data={citiesForecasts.slice(0,props.limit)}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            extraData={cities}
            ListHeaderComponent={() => {
              if(citiesForecasts.length){
                return <Text style={[styles.label,styles.padding10]}>Last update on : {lastUpdatedDate}</Text>
              }
              return <View />
            }}
            ListFooterComponent={() => {
              if(citiesForecasts.length){
                return <Text style={[styles.label,styles.padding10, styles.centerText, styles.marginTop10 ]}>Pull down to update these forecasts</Text>
              }
              return <View />
            }}
            ListEmptyComponent={() => {
              return <Text style={styles.emptyMessage}>You haven't perform a search yet!!, type the name of the city and get some results</Text>
            }}
            renderItem={({ item, index }) => {
              return (
                <Card>                  
                  <Card.Content>
                    <View style={[styles.rowDirection ]}>
                      <TouchableOpacity  onPress={() => {
                          deleteCityForecast(index)
                      }}>
                        <View >                      
                          <List.Icon icon="delete" color={Colors.red500} />
                        </View>

                      </TouchableOpacity>
                      <TouchableOpacity style={ styles.flex}  onPress={() => {
                          navigation.navigate('Forecast',{ forecast: item })
                      }}>
                        <View style={[styles.rowDirection ]}>
                          <View style={ styles.flex}>
                            <Title>{item.name}</Title>
                            <Paragraph>{'Temperature :' + item.main.temp}</Paragraph>
                          </View>
                          <List.Icon icon="chevron-right" />
                        </View>

                      </TouchableOpacity>
                      
                    </View>
                    
                  </Card.Content>                  
                </Card>
               
              )
            }}
            keyExtractor={(item,index) => "forecast_" + index }
        />
    </View>
  );
}
