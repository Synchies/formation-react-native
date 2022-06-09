/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import api from './src/api';
import {RootStackParamList} from './src/navigation';
import { useAppDispatch } from './src/redux/hooks';
import { connect } from './src/redux/slices/authentication.slice';
import {store} from './src/redux/store';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SplashScreen from './src/screens/SplashScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const ReduxApp = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  console.log('setIsLoading: ', setIsLoading);
  console.log('isLoading: ', isLoading);

  const isConnected = false;

  useEffect(() => {
    (async () => {
      try {
        const user = await api.isConnected();
        if (user) {
          dispatch(connect(user))
        }
      } catch(err) {
  
      } finally {
        setIsLoading(false)
      }
    })();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaView}>
        {isLoading ? (
          <SplashScreen />
        ) : (
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{headerShown: false}}>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <ReduxApp />
    </Provider>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    height: '100%',
  },
});

export default App;
