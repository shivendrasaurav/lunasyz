/* eslint-disable prettier/prettier */

import React, { useEffect, useState } from 'react';
import {View, Text, ImageBackground, TouchableHighlight} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import apodStyles from './apod.styles';

const APOD = ({navigation}) => {

  const [apodData, setApodData] = useState({'copyright': '염범석 Yeom Beom-seok', 'date': '2024-01-11', 'explanation': "Named for a forgotten constellation, the Quadrantid Meteor Shower puts on an annual show for planet Earth's northern hemisphere skygazers. The shower's radiant on the sky lies within the old, astronomically obsolete constellation Quadrans Muralis. That location is not far from the Big Dipper asterism, known to some as the Plough, at the boundaries of the modern constellations Bootes and Draco. In fact the Big Dipper \"handle\" stars are near the upper right corner in this frame, with the meteor shower radiant just below. North star Polaris is toward the top left. Pointing back toward the radiant, Quadrantid meteors streak through the night in this skyscape from Jangsu, South Korea. The composite image was recorded in the hours around the shower's peak on January 4, 2024. A likely source of the dust stream that produces Quadrantid meteors was identified in 2003 as an asteroid.", 'hdurl': 'https://apod.nasa.gov/apod/image/2401/2024_quadrantids_240104_med_bsyeom.jpg', 'media_type': 'image', 'service_version': 'v1', 'title': 'Quadrantids of the North', 'url': 'https://apod.nasa.gov/apod/image/2401/2024_quadrantids_240104_med_bsyeom1024.jpg'});

  const getApodData = async () => {
    try {
      const key = 'EBdjaf2zBwnuERmRn1TbRLN1okn3qNZIMYd4oEzF';
      const request = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${key}`);
      const response = await request.json();
      setApodData(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(()=>{
    getApodData();
  }, []);

  return (
    <View style={apodStyles.apodWrapper}>
      <ImageBackground source={{uri: apodData.hdurl}} resizeMode="cover" style={apodStyles.apodBackground}>
        <View style={apodStyles.apodInfo}>
          <Text>
            {apodData.explanation.toString() + '\n By ' + apodData.copyright.toString()}
          </Text>
        </View>
        <View style={apodStyles.apodTitle}>
          <Text style={apodStyles.apodTitleText}>
            {apodData.title.toString()}
          </Text>
        </View>
        <View style={apodStyles.apodNavBar}>
          <View style={apodStyles.navBar}>
            <TouchableHighlight onPressIn={()=>{navigation.navigate('Home');}} style={apodStyles.navBarButton} onPress={()=>{console.log('lol');}}>
              <Text style={apodStyles.navBarButtonText}>Moon</Text>
            </TouchableHighlight>
            <TouchableHighlight onPressIn={()=>{navigation.navigate('Home');}}  style={apodStyles.navBarButton} onPress={()=>{console.log('lol');}}>
              <Text style={apodStyles.navBarButtonText}>APOD</Text>
            </TouchableHighlight>
            <TouchableHighlight onPressIn={()=>{navigation.navigate('APOD');}}  style={apodStyles.navBarButton} onPress={()=>{console.log('lol');}}>
              <Text style={apodStyles.navBarButtonText}>Event</Text>
            </TouchableHighlight>
            <TouchableHighlight onPressIn={()=>{navigation.navigate('APOD');}}  style={apodStyles.navBarButton} onPress={()=>{console.log('lol');}}>
              <Text style={apodStyles.navBarButtonText}>Gear</Text>
            </TouchableHighlight>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default APOD;
