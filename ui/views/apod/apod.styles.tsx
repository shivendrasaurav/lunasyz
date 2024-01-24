/* eslint-disable prettier/prettier */

import {StyleSheet} from 'react-native';

const apodStyles = StyleSheet.create({
  apodWrapper: {
    flex: 1,
    height: '100%',
  },
  apodBackground: {
    height: '100%',
    width: '100%',
  },
  apodInfo: {
    flex: 10,
    justifyContent: 'flex-end',
    padding: 12,
    borderRadius: 8,
  },
  apodInfoTextWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: 8,
    backgroundColor: '#fadafa88',
    borderRadius: 8,
  },
  apodScreenTitle: {
    color: '#0e0e0e',
    fontSize: 24,
  },
  apodInfoText: {
    color: '#0e0e0e',
    height: 'auto',
    fontSize: 18,
  },
  apodTitle: {
    flex: 1,
    marginLeft: 12,
    padding: 8,
    borderRadius: 8,
  },
  apodTitleText:{
    fontSize: 18,
    color: '#0e0e0e',
  },
  apodTitleButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoButton: {
    backgroundColor: '#495adf',
    borderRadius: 6,
    width: 'auto',
    height: 32,
    marginRight: 6,
  },
  infoButtonText: {
    padding: 6,
    fontSize: 14,
    color: '#fafafa',
    textAlign: 'center',
    paddingLeft: 18,
    paddingRight: 18,
  },
  apodNavBar: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
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

export default apodStyles;
