/* eslint-disable prettier/prettier */

import { StyleSheet } from 'react-native';

const WeatherWidgetStyles = StyleSheet.create({
  weatherDataContainer: {
    flex: 1,
    backgroundColor: '#0e0e0e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  weatherData: {
    width: '90%',
    borderRadius: 12,
    padding: 12,
    backgroundColor: '#0e0e2e',
    flexDirection: 'row',
  },
  dateData: {
    flex: 7,
    padding: 6,
  },
  dayValue: {
    color: '#fafafa',
    fontSize: 24,
    textAlign: 'left',
  },
  dateValue: {
    color: '#fafafa',
    fontSize: 12,
    textAlign: 'left',
  },
  tempData: {
    flex: 5,
    padding: 6,
  },
  tempValue: {
    color: '#fafafa',
    fontSize: 24,
    textAlign: 'right',
  },
  weatherType: {
    color: '#fafafa',
    fontSize: 12,
    textAlign: 'right',
  },
});

export default WeatherWidgetStyles;
