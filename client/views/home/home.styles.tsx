/* eslint-disable prettier/prettier */

import {StyleSheet} from 'react-native';

const homeStyles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#0e0e0e',
    flexDirection: 'column',
  },
  weatherDataContainer: {
    flex: 1,
    backgroundColor: '#0e0e0e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  weatherData: {
    width: '90%',
    height: '70%',
    borderRadius: 12,
    padding: 12,
    backgroundColor: '#1a1a1a',
    flexDirection: 'row',
  },
  dateData: {
    flex: 8,
  },
  dayValue: {
    color: '#fafafa',
    fontSize: 24,
  },
  dateValue: {
    color: '#fafafa',
    fontSize: 12,
  },
  tempData: {
    flex: 2,
  },
  tempValue: {
    color: '#fafafa',
    fontSize: 24,
  },
  todaysMoon: {
    flex: 4,
    backgroundColor: '#22aa2a',
    color: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbs: {
    flex: 1,
    backgroundColor: '#aa22aa',
    color: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default homeStyles;
