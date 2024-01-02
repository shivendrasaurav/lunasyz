/* eslint-disable prettier/prettier */

import React from 'react';
import {View, Text} from 'react-native';
import SunCalc from 'suncalc';
import homeStyles from './home.styles';

const lunarPhaseKey = {
  'New Moon': '🌑',
  'Waxing Crescent': '🌒',
  'First Quarter': '🌓',
  'Waxing Gibbous': '🌔',
  'Full Moon': '🌕',
  'Waning Gibbous': '🌖',
  'Last Quarter': '🌗',
  'Waning Crescent': '🌘',
};

const getDateValue = () => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let today = new Date();
  let month = months[today.getMonth()];
  let date = today.getDate();
  let year = today.getFullYear();
  const val = month + ' ' + date + ', ' + year;
  return val;
};

const getDayValue = () => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let today = new Date();
  let val = today.getDay();

  return days[val];
};

const getLunarPhase = () => {
  const today = new Date();
  const moonIllumination = SunCalc.getMoonIllumination(today);
  const phase = getMoonPhase(moonIllumination.phase);
  return lunarPhaseKey[phase];
};

const getLunarPhaseName = () => {
  const today = new Date();
  const moonIllumination = SunCalc.getMoonIllumination(today);
  const phase = getMoonPhase(moonIllumination.phase);
  return phase;
};

const getMoonPhase = (phase: number) => {
  if (phase === 0) {
    return 'New Moon';
  } else if (phase > 0 && phase < 0.25) {
    return 'Waxing Crescent';
  } else if (phase === 0.25) {
    return 'First Quarter';
  } else if (phase > 0.25 && phase < 0.5) {
    return 'Waxing Gibbous';
  } else if (phase === 0.5) {
    return 'Full Moon';
  } else if (phase > 0.5 && phase < 0.75) {
    return 'Waning Gibbous';
  } else if (phase === 0.75) {
    return 'Last Quarter';
  } else if (phase > 0.75 && phase < 1) {
    return 'Waning Crescent';
  } else if (phase === 1) {
    return 'Full Moon';
  }
};

const getWeeklyLunarPhases = () =>{
  const weekDates = getDatesAroundToday();
  let lunarPhases = [];
  for (let i = 0; i < 6; i++){
    let date = new Date(weekDates[i]);
    let moonIllumination = SunCalc.getMoonIllumination(date);
    let phase = getMoonPhase(moonIllumination.phase);
    lunarPhases.push({'phase': lunarPhaseKey[phase], 'date': date.getDate()});
  }
  return lunarPhases;
};

const getDatesAroundToday = () => {
  const today = new Date();
  const datesAroundToday = [];

  // Get three dates before today
  for (let i = 3; i > 0; i--) {
    const dateBefore = new Date(today);
    dateBefore.setDate(today.getDate() - i);
    datesAroundToday.push(`${dateBefore.toDateString()}`);
  }

  // Get three dates after today
  for (let i = 1; i <= 3; i++) {
    const dateAfter = new Date(today);
    dateAfter.setDate(today.getDate() + i);
    datesAroundToday.push(`${dateAfter.toDateString()}`);
  }

  return datesAroundToday;
};


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
        <Text style={homeStyles.todaysMoonImg}>{getLunarPhase()}</Text>
        <Text style={homeStyles.todaysMoonText}>{getLunarPhaseName()}</Text>
      </View>
      <View style={homeStyles.thumbs}>
        <Text style={homeStyles.weeklyMoonText}>{getWeeklyLunarPhases()[0].phase + '\n' + getWeeklyLunarPhases()[0].date}</Text>
        <Text style={homeStyles.weeklyMoonText}>{getWeeklyLunarPhases()[1].phase + '\n' + getWeeklyLunarPhases()[1].date}</Text>
        <Text style={homeStyles.weeklyMoonText}>{getWeeklyLunarPhases()[2].phase + '\n' + getWeeklyLunarPhases()[2].date}</Text>
        <Text style={homeStyles.weeklyMoonText}>{getWeeklyLunarPhases()[3].phase + '\n' + getWeeklyLunarPhases()[3].date}</Text>
        <Text style={homeStyles.weeklyMoonText}>{getWeeklyLunarPhases()[4].phase + '\n' + getWeeklyLunarPhases()[4].date}</Text>
        <Text style={homeStyles.weeklyMoonText}>{getWeeklyLunarPhases()[5].phase + '\n' + getWeeklyLunarPhases()[5].date}</Text>
      </View>
    </View>
  );
};

export default Home;
