/* eslint-disable prettier/prettier */

import React from 'react';
import {View, Text} from 'react-native';
import homeStyles from './home.styles';
import HomeScripts from './scripts';

const WeatherData = () =>{
    return (
        <View style={homeStyles.weatherDataContainer}>
        <View style={homeStyles.weatherData}>
          <View style={homeStyles.dateData}>
            <Text style={homeStyles.dayValue}>{HomeScripts.getDayValue}</Text>
            <Text style={homeStyles.dateValue}>{HomeScripts.getDateValue}</Text>
          </View>
          <View style={homeStyles.tempData}>
            <Text style={homeStyles.tempValue}>12&deg;</Text>
            <Text style={homeStyles.dateValue}>Foggy</Text>
          </View>
        </View>
      </View>
    );
};

export default WeatherData;