import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ForecastSearch from '../forecast/ForecastSearch';
import ForecastDetail from '../forecast/ForecastDetail';

const Stack = createStackNavigator();

export const ForecastRoutes = () => {
  return (
  
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={ForecastSearch}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="Forecast" component={ForecastDetail} />
      </Stack.Navigator>
    
  );
};