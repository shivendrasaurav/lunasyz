import React from 'react';
import {View, Text} from 'react-native';
import homeStyles from './home.styles';

const getDateValue = () => {
  let today = new Date();
  let val = today.toDateString().split(' ')[1] + ' ' + today.toDateString().split(' ')[2] + ' ' + today.toDateString().split(' ')[3];
  return val;
}

const getDayValue = () => {
  let today = new Date();
  let day = '';
  let val = today.getDay();
  if(val === 6)
    day = 'Saturday'
  if(val === 5)
    day = 'Friday'
  if(val === 4)
    day = 'Thursday'
  if(val === 3)
    day = 'Wednesday'
  if(val === 2)
    day = 'Tuesday'
  if(val === 1)
    day = 'Monday'
  if(val === 0)
    day = 'Sunday'

  return day;
}

const Home = () => {
  return (
    <View style={homeStyles.container}>
      <View style={homeStyles.weatherDataContainer}>
        <View style={homeStyles.weatherData}>
          <View style={homeStyles.dateData}>
            <Text style={homeStyles.dayValue}>{getDayValue()}</Text>
            <Text style={homeStyles.dateValue}>{getDateValue()}</Text>
          </View>
          <View style={homeStyles.tempData}>
            <Text style={homeStyles.tempValue}>30&deg;</Text>
            <Text style={homeStyles.dateValue}>Clear</Text>
          </View>
        </View>
      </View>
      <View style={homeStyles.todaysMoon}>
        <Text>Today's Moon Render</Text>
      </View>
      <View style={homeStyles.thumbs}>
        <Text>Weekly Moon Thumbnails</Text>
      </View>
    </View>
  );
};

export default Home;
