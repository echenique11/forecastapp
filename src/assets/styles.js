import { StyleSheet, Dimensions } from 'react-native';

export const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
    marginTop10: { 
        marginTop: 10 
    },
    emptyMessage: {
        padding: 10,
        textAlign: 'center'
    },
    greatingText: {
      padding: 10,
      textAlign: 'center',
      fontSize: 20
    },
    activityIndicatorContainer: {
        alignItems: 'center',
        justifyContent: 'center',     
        padding: 20
    },
    padding10: {
      padding: 10
    },
    labelValueContainer: {
      marginVertical: 10
    },
    label: {
      fontWeight: 'bold',
      fontSize: 14
    },
    labelValue: {
      fontSize: 16
    },
    rowDirection: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    flex: {
      flex: 1
    },
    centerText: {
      textAlign: 'center'
    }
  });