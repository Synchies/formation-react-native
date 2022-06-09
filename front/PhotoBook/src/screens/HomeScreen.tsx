import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useLayoutEffect } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { RootStackParamList } from '../navigation';
import {useAppSelector} from '../redux/hooks';
import {selectAuthentication} from '../redux/slices/authentication.slice';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({navigation}: HomeProps) => {
  const authentication = useAppSelector(selectAuthentication);

  useLayoutEffect(() => {
    if (!authentication.user) {
      navigation.replace('Login');
    }
  }, [authentication]);

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.text}>Hello {authentication.user?.displayName}</Text>
    </View>
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
