/* eslint-disable prettier/prettier */

import React, { useEffect, useState } from 'react';
import {View, Text, PermissionsAndroid, Button, Touchable, TouchableHighlight} from 'react-native';
import SunCalc from 'suncalc';
import Geolocation from 'react-native-geolocation-service';
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

const wmoCode = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog and depositing rime fog',
  48: 'Fog and depositing rime fog',
  51: 'Drizzle: Light intensity',
  53: 'Drizzle: Moderate intensity',
  55: 'Drizzle: Dense intensity',
  56: 'Freezing Drizzle: Light intensity',
  57: 'Freezing Drizzle: Dense intensity',
  61: 'Rain: Slight intensity',
  63: 'Rain: Moderate intensity',
  65: 'Rain: Heavy intensity',
  66: 'Freezing Rain: Light intensity',
  67: 'Freezing Rain: Heavy intensity',
  71: 'Snow fall: Slight intensity',
  73: 'Snow fall: Moderate intensity',
  75: 'Snow fall: Heavy intensity',
  77: 'Snow grains',
  80: 'Rain showers: Slight intensity',
  81: 'Rain showers: Moderate intensity',
  82: 'Rain showers: Violent intensity',
  85: 'Snow showers: Slight intensity',
  86: 'Snow showers: Heavy intensity',
  95: 'Thunderstorm: Slight',
  96: 'Thunderstorm with hail: Slight',
  99: 'Thunderstorm with hail: Heavy',
  100: 'Permission Required',
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

const getLunarPhaseAngle = (gps: { latitude?: any; longitude?: any; }) => {
  const today = new Date();
  const moonIllumination = SunCalc.getMoonIllumination(today);
  const moonPosition = SunCalc.getMoonPosition(today, gps.latitude, gps.longitude);
  const angle = moonIllumination.angle - moonPosition.parallacticAngle;
  return Math.floor(angle * 100);
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

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (granted) {
      console.log('You can use Geolocation');
      return true;
    } else {
      const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Access',
          message: 'LunaSyz requires location access to display current weather and temprature.',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (result === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use Geolocation');
        return true;
      } else {
        console.log('You cannot use Geolocation');
        return false;
      }
    }
  } catch (err) {
    console.error(err);
    return false;
  }
};

const Home = () => {

  const [location, setLocation] = useState({});
  const [weather, setWeather] = useState({'current':{'temperature_2m': 'Location', 'weather_code': 100}, 'current_units':{'temperature_2m': ' '}});


  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            console.log(position.toString(), `${position.coords.latitude.toString()}, ${ position.coords.longitude.toString()}`);
            setLocation(position.coords);
            getWeatherData(position.coords);
          },
          error => {
            // See error code charts below.
            console.log(error.code.toString(), error.message);
            setLocation('Enable Location');
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
  };

  const getWeatherData = async (gps: any) =>{
    const URL = `https://api.open-meteo.com/v1/forecast?latitude=${gps.latitude.toString()}&longitude=${gps.longitude.toString()}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,wind_speed_10m,wind_direction_10m,weather_code`;
    let headersList = {
      'Accept': '*/*',
      'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
    };

    let response = await fetch(URL, {
      method: 'GET',
      headers: headersList,
    });

    let data = await response.json();
    setWeather(data);
  };

  useEffect(()=>{
    getLocation();
  }, []);

  return (
    <View style={homeStyles.container}>
      <View style={homeStyles.weatherDataContainer}>
        <View style={homeStyles.weatherData}>
          <View style={homeStyles.dateData}>
            <Text style={homeStyles.dayValue}>{getDayValue()}</Text>
            <Text style={homeStyles.dateValue}>{getDateValue()}</Text>
          </View>
          <TouchableHighlight onPress={getLocation}>
          <View style={homeStyles.tempData}>
            <Text style={homeStyles.tempValue}>{weather.current.temperature_2m.toString()} {weather.current_units.temperature_2m.toString()}</Text>
            <Text style={homeStyles.weatherType}>{wmoCode[weather.current.weather_code]}</Text>
          </View>
          </TouchableHighlight>
        </View>
      </View>
      <View style={homeStyles.todaysMoon}>
        <TouchableHighlight style={{transform: `rotate(${getLunarPhaseAngle(location)}deg)`}}>
          <Text style={homeStyles.todaysMoonImg} id="lunarPhase">{getLunarPhase()}</Text>
        </TouchableHighlight>
        <Text style={homeStyles.todaysMoonText}>{getLunarPhaseName()}</Text>
        <Text style={homeStyles.dateValue}>{getDateValue()}</Text>
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
