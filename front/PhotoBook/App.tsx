/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import HomeScreen from './src/HomeScreen';
import SplashScreen from './src/SplashScreen';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  console.log('setIsLoading: ', setIsLoading);
  console.log('isLoading: ', isLoading);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      {isLoading ? <SplashScreen /> : <HomeScreen /> }
    </SafeAreaView>
  );
};

export default App;
