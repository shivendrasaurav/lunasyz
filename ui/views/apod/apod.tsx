/* eslint-disable prettier/prettier */

import React, { useEffect, useState } from 'react';
import {View, Text, PermissionsAndroid, TouchableHighlight} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import apodStyles from './apod.styles';

const APOD = ({navigation}) => {

  return (
    <View style={apodStyles.container}>
      <View style={apodStyles.weatherDataContainer}>
        <Text>APOD</Text>
      </View>
    </View>
  );
};

export default APOD;
