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
    borderRadius: 12,
    padding: 12,
    backgroundColor: '#1a1a1a',
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
  todaysMoon: {
    flex: 4,
    backgroundColor: '#0e0e0e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  todaysMoonImg:{
    fontSize: 256,
    color: '#fafafa',
    textAlign: 'center',
  },
  todaysMoonText:{
    fontSize: 28,
    color: '#fafafa',
    textAlign: 'center',
  },
  thumbs: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#0e0e0e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  weeklyMoonText:{
    fontSize: 24,
    color: '#acacac',
    margin: 8,
    textAlign: 'center',
  },
});

export default homeStyles;
