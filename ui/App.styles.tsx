/* eslint-disable prettier/prettier */

import { StyleSheet } from 'react-native';

const AppStyles = StyleSheet.create({
    container: {
      height: '100%',
      backgroundColor: '#0e0e0e',
      flexDirection: 'column',
    },
    weatherWidgetWrapper: {
        flex: 2,
    },
    homeScreenWrapper: {
        flex: 8,
    },
    navigationWidgetWrapper: {
        flex: 1,
    },
});

export default AppStyles;
