import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import React, { FC, useEffect } from 'react';
import { Colors } from '@utils/Constants';
import Logo from '@assets/images/logo.png';
import { screenHeight, screenWidth } from '@utils/Scaling';
import { navigate, resetAndNavigate } from '@utils/NavigationUtils';
import { useAuthStore } from '@states/authStore';
import { tokenStorage } from '@states/storage';
import { jwtDecode } from 'jwt-decode';
import { refechUser, refreshTokens } from '@services/authService';
import GeoLocation from '@react-native-community/geolocation';

interface DecodeToken {
  exp: number;
}

GeoLocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'always',
  enableBackgroundLocationUpdates: true,
  locationProvider: 'auto',
});

const SplashScreen: FC = () => {
  const { user, setUser } = useAuthStore();

  const tokeCheck = async () => {
    console.log('debugging.........1');
    const accessToken = tokenStorage.getString('accessToken') as string;
    const refreshToken = tokenStorage.getString('refreshToken') as string; 
    console.log('debugging.........2',refreshToken);

    if (accessToken) {
      const decodeAccessToken = jwtDecode<DecodeToken>(accessToken);

      const decodeRefreshToken = jwtDecode<DecodeToken>(refreshToken);



      const currentTime = Date.now() / 1000;
      console.log('debugging.........3', decodeRefreshToken);
      if (decodeRefreshToken?.exp < currentTime) {
        resetAndNavigate('CustomerLogin');
        Alert.alert('Session Expired', 'Please login again');
        return false;
      }

      if (decodeAccessToken?.exp < currentTime) {
        try {
          await refreshTokens();
          await refechUser(setUser);
        } catch (error) {
          console.log('tokeCheck error', error);
          Alert.alert('Something went wrong on token check');
          return false;
        }
      }

      if (user?.role === 'Customer') {
        resetAndNavigate('ProductDashboard');
      } else {
        resetAndNavigate('DeliveryPartnerDashboard');
      }
    }else{
       resetAndNavigate('CustomerLogin');
    }
    return true;
  };

  const initialCheck = async () => {
    try {
       GeoLocation.requestAuthorization();
      tokeCheck();
    } catch (error) {}
  };
  useEffect(() => {
    const timeOut = setTimeout(initialCheck, 2000);
    return () => {
      clearTimeout(timeOut);
    };
  }, []);
  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logoImage}></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    height: screenHeight * 0.7,
    width: screenWidth * 0.7,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
