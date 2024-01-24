/* eslint-disable prettier/prettier */

import React, { useEffect, useState } from 'react';
import {View, Text, ImageBackground, TouchableHighlight, PermissionsAndroid, ScrollView, Platform, Alert} from 'react-native';
import apodStyles from './apod.styles';
import {DownloadDirectoryPath, downloadFile, getFSInfo, readDir} from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';

const requestStoragePermission = async () => {
  try {
    if (Number(Platform.Version) >= 33) {
      return true;
    }
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    if (granted) {
      console.log('You can use Storage');
      return true;
    } else {
      console.log('Asking for permisson');
      const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Access',
          message: 'LunaSyz requires storage access to download this image.',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (result === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use Storage');
        return true;
      } else {
        console.log('You cannot use Storage');
        return false;
      }
    }
  } catch (err) {
    console.error(err);
    return false;
  }
};

const APOD = ({navigation}) => {

  const [apodData, setApodData] = useState({'copyright': '', 'date': '', 'explanation': '', 'hdurl': 'https://cdn.dribbble.com/users/8424/screenshots/1036999/media/95ea84898041817671e6d4cd7fd65f13.gif', 'media_type': '', 'service_version': '', 'title': '', 'url': ''});
  const [showInfoToggle, setShowInfoToggle] = useState(false);
  const [isDownloadStarted, setIsDownloadStarted] = useState(false);
  const [isDownloadCompleted, setIsDownloadCompleted] = useState(false);

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

  const showInfo = () =>{
    if (showInfoToggle === false){
      setShowInfoToggle(true);
    }
    else {
      setShowInfoToggle(false);
    }
  };

  const downloadImage = () =>{
    setIsDownloadStarted(true);
    const storagePermitted = requestStoragePermission();
    storagePermitted.then(process =>{
      if (process){

        const url = apodData.hdurl;
        const path = `${DownloadDirectoryPath}/${apodData.title}.jpeg`;
        const resp = downloadFile({
          fromUrl: url,
          toFile: path,
        });
        resp.promise
          .then(async res => {
            if (res && res.statusCode === 200 && res.bytesWritten > 0) {
              console.log('size:', res.bytesWritten);
              await getFSInfo().then(response => {
                const deviceSpace = response.freeSpace * 0.001;
                if (deviceSpace > res.bytesWritten) {
                  console.log('there is enough space');
                  Alert.alert('Download Complete', 'Check for the image in Downloads folder in Files app');
                } else {
                  Alert.alert('Not enough space');
                }
              });
            } else {
              console.log(res);
            }
            setIsDownloadCompleted(true);
          })
          .catch(error => console.log(error));

      }
    });
  };

  const getDirectoryList = async () => {
    try {
      const pathList = await readDir(DownloadDirectoryPath);
      console.log(pathList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    getApodData();
    getDirectoryList();
  }, []);

  return (
    <View style={apodStyles.apodWrapper}>
      <ImageBackground source={{uri: apodData.hdurl}} resizeMode="cover" style={apodStyles.apodBackground}>
        {
          showInfoToggle ?
          <View style={apodStyles.apodInfo}>
            <ScrollView contentContainerStyle={apodStyles.apodInfoTextWrapper}>
              <Text style={apodStyles.apodInfoText}>
                {apodData.explanation}
              </Text>
              <Text style={apodStyles.apodTitleText}>
                {'\n'}{apodData.title}{apodData.copyright === undefined ? '' : ` By ${apodData.copyright}`}
              </Text>
            </ScrollView>
          </View>
         :
         <View style={apodStyles.apodInfo}>
          <Text> </Text>
         </View>
        }
        <View style={apodStyles.apodTitle}>
          <View style={apodStyles.apodTitleButtons}>
            <TouchableHighlight style={apodStyles.infoButton} onPress={showInfo}>
              <Text style={apodStyles.infoButtonText}>APOD Info</Text>
            </TouchableHighlight>
            {
              apodData.copyright === undefined ?
              <View>
                {
                  !isDownloadStarted ?
                    <TouchableHighlight style={apodStyles.infoButton} onPress={downloadImage}>
                      <Text style={apodStyles.infoButtonText}>Save Image</Text>
                    </TouchableHighlight>
                    :
                    <TouchableHighlight style={apodStyles.infoButton} disabled>
                      {
                        !isDownloadCompleted ?
                          <Text style={apodStyles.infoButtonText}>Downloading...</Text>
                        :
                          <Text style={apodStyles.infoButtonText}>Downloaded</Text>
                    }
                    </TouchableHighlight>
                }
              </View>
              :
                null
            }
          </View>
        </View>
        <View style={apodStyles.apodNavBar}>
          <View style={apodStyles.navBar}>
            <TouchableHighlight onPressIn={()=>{navigation.navigate('Home');}} style={apodStyles.navBarButton}>
              <Text style={apodStyles.navBarButtonText}>🌕</Text>
            </TouchableHighlight>
            <TouchableHighlight onPressIn={()=>{navigation.navigate('APOD');}}  style={apodStyles.navBarButton}>
              <Text style={apodStyles.navBarButtonText}>🔭</Text>
            </TouchableHighlight>
            <TouchableHighlight onPressIn={()=>{navigation.navigate('Events');}}  style={apodStyles.navBarButton}>
              <Text style={apodStyles.navBarButtonText}>🥂</Text>
            </TouchableHighlight>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default APOD;
