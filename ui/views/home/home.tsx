/* eslint-disable prettier/prettier */

import React, { useEffect, useState } from 'react';
import {View, Text, PermissionsAndroid, TouchableHighlight} from 'react-native';
import SunCalc from 'suncalc';
import Slider from '@react-native-community/slider';
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

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const hindiPhaseCalender = ['अमावस्या', 'शुक्ल पक्ष - परिबा', 'शुक्ल पक्ष - दूज', 'शुक्ल पक्ष - तृतीया', 'शुक्ल पक्ष - चतुर्थी', 'शुक्ल पक्ष - पंचमी', 'शुक्ल पक्ष - षष्ठी', 'शुक्ल पक्ष - सप्तमी', 'शुक्ल पक्ष - अष्टमी', 'शुक्ल पक्ष - नवमी', 'शुक्ल पक्ष - दशमी', 'शुक्ल पक्ष-एकादशी', 'शुक्ल पक्ष - द्वादशी', 'शुक्ल पक्ष - त्रयोदशी', 'शुक्ल पक्ष - चतुर्दशी', 'पूर्णिमा', 'कृष्ण पक्ष - परिबा', 'कृष्ण पक्ष - दूज', 'कृष्ण पक्ष - तृतीया', 'कृष्ण पक्ष - चतुर्थी', 'कृष्ण पक्ष - पंचमी', 'कृष्ण पक्ष - षष्ठी', 'कृष्ण पक्ष - सप्तमी', 'कृष्ण पक्ष - अष्टमी', 'कृष्ण पक्ष - नवमी', 'कृष्ण पक्ष - दशमी', 'कृष्ण पक्ष-एकादशी', 'कृष्ण पक्ष - द्वादशी', 'कृष्ण पक्ष - त्रयोदशी', 'कृष्ण पक्ष - चतुर्दशी'];

const newMoon2425 = ['Thu Jan 11 2024', 'Sat Feb 10 2024', 'Sun Mar 10 2024', 'Mon Apr 08 2024', 'Wed May 08 2024', 'Thu Jun 06 2024', 'Sat Jul 06 2024', 'Sun Aug 04 2024', 'Tue Sep 03 2024', 'Thu Oct 03 2024', 'Fri Nov 01 2024', 'Sun Dec 01 2024'];
const qOne2425 = ['Thu Jan 18 2024', 'Fri Feb 16 2024', 'Sun Mar 17 2024', 'Tue Apr 16 2024', 'Wed May 15 2024', 'Fri Jun 14 2024', 'Sun Jul 14 2024', 'Mon Aug 12 2024', 'Wed Sep 11 2024', 'Fri Oct 11 2024', 'Sat Nov 09 2024', 'Sun Dec 08 2024'];
const fullMoon2425 = ['Thu Jan 25 2024', 'Sat Feb 24 2024', 'Mon Mar 25 2024', 'Wed Apr 24 2024', 'Thu May 23 2024', 'Sat Jun 22 2024', 'Sun Jul 21 2024', 'Mon Aug 19 2024', 'Wed Sep 18 2024', 'Thu Oct 17 2024', 'Sat Nov 16 2024', 'Invalid Date'];
const qThree2425 = ['Sat Feb 03 2024', 'Sun Mar 03 2024', 'Tue Apr 02 2024', 'Wed May 01 2024', 'Thu May 30 2024', 'Sat Jun 29 2024', 'Sun Jul 28 2024', 'Mon Aug 26 2024', 'Wed Sep 25 2024', 'Thu Oct 24 2024', 'Sat Nov 23 2024', 'Mon Dec 23 2024'];

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
  let today = new Date();
  /*
  let month = months[today.getMonth()];
  let date = today.getDate();
  let year = today.getFullYear();
  const val = month + ' ' + date + ', ' + year;
  */
  return today.toDateString();
};

/*
const getDayValue = () => {
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
  if ((phase > 0 && phase <= 0.02) || (phase > 0.98 && phase <= 1.02)) {
    return 'New Moon';
  } else if (phase > 0.02 && phase <= 0.23) {
    return 'Waxing Crescent';
  } else if (phase > 0.23 && phase <= 0.26) {
    return 'First Quarter';
  } else if (phase > 0.26 && phase <= 0.48) {
    return 'Waxing Gibbous';
  } else if (phase > 0.48 && phase <= 0.51) {
    return 'Full Moon';
  } else if (phase > 0.51 && phase <= 0.73) {
    return 'Waning Gibbous';
  } else if (phase > 0.73 && phase <= 0.76) {
    return 'Last Quarter';
  } else if (phase > 0.76 && phase <= 0.98) {
    return 'Waning Crescent';
  }
};
*/

const getMoonPhase = (compDate: number, index: number) => {
  const newMoonDateNum = new Date(newMoon2425[index]);
  const qOneDateNum = new Date(qOne2425[index]);
  const fullMoonDateNum = new Date(fullMoon2425[index]);
  const qThreeDateNum = new Date(qThree2425[index]);
  const compDateNum = new Date(compDate);
  if (compDateNum.toDateString() === newMoonDateNum.toDateString()){
    return 'New Moon';
  }
  else if (compDateNum > newMoonDateNum && compDateNum < qOneDateNum){
    return 'Waxing Crescent';
  }
  else if (compDateNum.toDateString() === qOneDateNum.toDateString()){
    return 'First Quarter';
  }
  else if (compDateNum > qOneDateNum && compDateNum < fullMoonDateNum){
    return 'Waxing Gibbous';
  }
  else if (compDateNum.toDateString() === fullMoonDateNum.toDateString()){
    return 'Full Moon';
  }
  else if (compDateNum > fullMoonDateNum && compDateNum < qThreeDateNum){
    return 'Waning Gibbous';
  }
  else if (compDateNum.toDateString() === qThreeDateNum.toDateString()){
    return 'Last Quarter';
  }
  else if (compDateNum > qThreeDateNum){
    return 'Waning Crescent';
  }
};

const getThisLunarMonth = () => {
  // Initialize lastNewMoon with today's date
  let lastNewMoon = new Date(getDateValue());
  let lastIndex = 0;
  // Iterate through newMoon2425 to find the last new moon before today
  for (let i = 0; i < newMoon2425.length; i++) {
    let lastNewMoonDate = new Date(newMoon2425[i]);
    if (lastNewMoonDate > lastNewMoon) {
      lastNewMoon = new Date(newMoon2425[i - 1]); // Assign the previous new moon
      lastIndex = i - 1;
      break; // Exit the loop as we've found the last new moon
    }
  }

  // Create an empty array to store the calendar
  const calendar = [];

  // Add the last new moon to the calendar
  calendar.push({
    date: lastNewMoon.toDateString(),
    hindiPhaseName: hindiPhaseCalender[0],
    englishPhaseName: 'New Moon',
  });

  // Iterate over the hindiPhaseNames array
  for (let i = 1; i < hindiPhaseCalender.length; i++) {
    // Calculate the date for the next phase
    const date = new Date(lastNewMoon).setDate(lastNewMoon.getDate() + i);
    const engPhName = getMoonPhase(date, lastIndex);
    // Add the date and phase name to the calendar
    calendar.push({
      date: new Date(date).toDateString(),
      hindiPhaseName: hindiPhaseCalender[i],
      englishPhaseName: engPhName,
    });
  }

  return calendar;
};

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (granted) {
      //console.log('You can use Geolocation');
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
        //console.log('You can use Geolocation');
        return true;
      } else {
        //console.log('You cannot use Geolocation');
        return false;
      }
    }
  } catch (err) {
    console.error(err);
    return false;
  }
};

const Home = ({navigation}) => {

  const [location, setLocation] = useState({'latitude': 20.23, 'longitude': -180.90});
  const [weather, setWeather] = useState({'current':{'temperature_2m': 'Location', 'weather_code': 100}, 'current_units':{'temperature_2m': ' '}});
  const [lunarPhaseDataObject, setLunarPhaseDataObject] = useState({'phaseImg': '', 'phaseName': '', 'phaseAngle': 90, 'phaseDate': '', 'phaseNameHindi': ''});
  const [timeNow, setTimeNow] = useState('');

  const getDateIndex = () => {
    const monthDates = getThisLunarMonth();
    for (let i = 0; i < 30; i++){
      let date = new Date(monthDates[i].date);
      if (date.toLocaleDateString() === new Date().toLocaleDateString()){
        return i;
      }
    }
  };

  const getMonthlyLunarPhases = () =>{
    const monthDates = getThisLunarMonth();
    let lunarPhases = [];
    for (let i = 0; i < 30; i++){
      let date = new Date(monthDates[i].date);
      let moonIllumination = SunCalc.getMoonIllumination(date);
      let phase = monthDates[i].englishPhaseName;
      let month = months[date.getMonth()];
      let dateNum = date.getDate();
      let year = date.getFullYear();
      const dateVal = month + ' ' + dateNum + ', ' + year;
      const moonPosition = SunCalc.getMoonPosition(date, location.latitude, location.longitude);
      const angle = moonIllumination.angle - moonPosition.parallacticAngle;
      lunarPhases.push({'phaseImg': lunarPhaseKey[phase], 'date': dateVal, 'phaseName': phase, 'phaseAngle': angle, 'phaseNameHindi': monthDates[i].hindiPhaseName});
    }
    return lunarPhases;
  };

  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      //console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            //console.log(position.toString(), `${position.coords.latitude.toString()}, ${ position.coords.longitude.toString()}`);
            setLocation(position.coords);
            getWeatherData(position.coords);
          },
          error => {
            // See error code charts below.
            console.log(error.code.toString(), error.message);
          },
          {enableHighAccuracy: true, timeout: 1500, maximumAge: 10000},
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

  const newLunarPhaseData = (index: number) =>{
    const monthlyLunarData = getMonthlyLunarPhases();

    let newLunarPhaseDataObject = {
      phaseImg: monthlyLunarData[index].phaseImg,
      phaseDate: monthlyLunarData[index].date,
      phaseName: monthlyLunarData[index].phaseName,
      phaseAngle: Math.abs(monthlyLunarData[index].phaseAngle) * 100,
      phaseNameHindi: monthlyLunarData[index].phaseNameHindi,
    };
    setLunarPhaseDataObject(newLunarPhaseDataObject);
  };


  const getTimeValue = () => {
    setInterval(()=>{
      let now = new Date();
      let hrs = now.getHours();
      let min = now.getMinutes();
      let val = hrs.toString() + ':' + min.toString();
      setTimeNow(val);
    }, 1000);
  };

  useEffect(()=>{
    getLocation();
    newLunarPhaseData(getDateIndex());
    getTimeValue();
  }, []);

  return (
    <View style={homeStyles.container}>
      <View style={homeStyles.weatherDataContainer}>
        <View style={homeStyles.weatherData}>
          <View style={homeStyles.dateData}>
            <Text style={homeStyles.dayValue}>{timeNow}</Text>
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
        <TouchableHighlight style={{transform: 'rotate(' + lunarPhaseDataObject.phaseAngle + 'deg)'}}>
          <Text style={homeStyles.todaysMoonImg}>{lunarPhaseDataObject.phaseImg}</Text>
        </TouchableHighlight>
        <Text style={homeStyles.todaysMoonText}>{lunarPhaseDataObject.phaseName}</Text>
        <Text style={homeStyles.todaysMoonDate}>{lunarPhaseDataObject.phaseDate}</Text>
        <Slider value={getDateIndex()} thumbTintColor={'#fafafa'} lowerLimit={0} upperLimit={29} onValueChange={(val) => newLunarPhaseData(Math.floor(val))} style={homeStyles.phaseSlider} minimumValue={0} maximumValue={29} minimumTrackTintColor="#acacac" maximumTrackTintColor="#acacac"/>
      </View>
      <View style={homeStyles.thumbs}>
        <View style={homeStyles.navBar}>
          <TouchableHighlight onPressIn={()=>{navigation.navigate('Home');}} style={homeStyles.navBarButton}>
            <Text style={homeStyles.navBarButtonText}>🌕</Text>
          </TouchableHighlight>
          <TouchableHighlight onPressIn={()=>{navigation.navigate('APOD');}}  style={homeStyles.navBarButton}>
            <Text style={homeStyles.navBarButtonText}>🔭</Text>
          </TouchableHighlight>
          <TouchableHighlight onPressIn={()=>{navigation.navigate('Events');}}  style={homeStyles.navBarButton}>
            <Text style={homeStyles.navBarButtonText}>🥂</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

export default Home;
