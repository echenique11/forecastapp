import AsyncStorage from '@react-native-community/async-storage';

const StoreKeys = {
    LAST_UPDATE: '@FORECAST_LAST_UPDATE'
}

 export const storeLastUpdatedDate = async (date) => {
    try {
        await AsyncStorage.setItem(StoreKeys.LAST_UPDATE, date);        
      } catch (e) {
        // saving error
      }
 }

 export const getLastDateStored = async () => {
    try {
        return await AsyncStorage.getItem(StoreKeys.LAST_UPDATE)
      } catch(e) {
        
      }
 }

export const getToday = () => {
    let today = new Date();
    return (today.getMonth() + 1 ) + "/" + today.getDate() + "/" + today.getFullYear();
}