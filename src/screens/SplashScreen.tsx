import { View, Image } from 'react-native';
import React, { FC, useEffect } from 'react';
import { commonStyles } from '../styles/commonStyles';
import { navigate } from '../utils/NavigationUtil';

const SplashScreen: FC = () => {
  const navigateToHomeScreen = () => {
    navigate('HomeScreen');
  };

  useEffect(() => {
    const timerId = setTimeout(navigateToHomeScreen, 1000);
    return () => clearTimeout(timerId);
  }, []);

  return (
    <View style={commonStyles.baseContainer}>
      <View style={commonStyles.container}>
        <Image
          source={require('../assets/images/logo.png')}
          style={commonStyles.img}
        />
      </View>
    </View>
  );
};

export default SplashScreen;
