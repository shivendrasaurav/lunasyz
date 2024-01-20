/* eslint-disable prettier/prettier */

import {StyleSheet} from 'react-native';

const homeStyles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#0e0e0e',
    flexDirection: 'column',
  },
  weatherDataContainer: {
    flex: 3,
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
  todaysMoon: {
    flex: 10,
    backgroundColor: '#0e0e0e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  todaysMoonImg:{
    fontSize: 256,
    color: '#fadada',
    textAlign: 'center',
  },
  todaysMoonText:{
    fontSize: 22,
    color: '#cacaca',
    textAlign: 'center',
  },
  todaysMoonDate:{
    fontSize: 14,
    color: '#cacaca',
    textAlign: 'center',
  },
  todaysMoonTextHindi:{
    fontSize: 24,
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
  phaseSlider: {
    width: '80%',
    height: 40,
  },
  monthlyMoonText:{
    fontSize: 24,
    color: '#acacac',
    margin: 8,
    textAlign: 'center',
  },
  navBar: {
    width: '80%',
    borderRadius: 36,
    backgroundColor: '#0e0e2e',
    flexDirection: 'row',
  },
  navBarButton: {
    padding: 12,
    flex: 1,
    borderRadius: 36,
  },
  navBarButtonText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#fafafa',
  },
});

export default homeStyles;
