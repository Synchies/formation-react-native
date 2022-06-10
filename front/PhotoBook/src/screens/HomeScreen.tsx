import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Icon} from '@rneui/themed';
import React, {useLayoutEffect} from 'react';
import {StyleSheet} from 'react-native';
import {RootStackParamList} from '../navigation';
import {useAppSelector} from '../redux/hooks';
import {selectAuthentication} from '../redux/slices/authentication.slice';
import LegalScreen from './LegalScreen';
import SettingsScreen from './SettingsScreen';
import WallScreen from './WallScreen';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Tab = createBottomTabNavigator();

const HomeScreen = ({navigation}: HomeProps) => {
  const authentication = useAppSelector(selectAuthentication);

  useLayoutEffect(() => {
    if (!authentication.user) {
      navigation.replace('Login');
    }
  }, [authentication, navigation]);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="Wall"
        component={WallScreen}
        options={{
          tabBarIcon: () => <Icon name="home" type="font-awesome-5" />,
        }}
      />
      <Tab.Screen
        name="Legal"
        component={LegalScreen}
        options={{
          tabBarIcon: () => <Icon name="legal" type="font-awesome" />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: () => <Icon name="gear" type="font-awesome" />,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    fontSize: 50,
  },
  mainContainer: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
});

export default HomeScreen;
