import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import api from '../api';
import { useAppDispatch } from '../redux/hooks';
import { disconnect } from '../redux/slices/authentication.slice';

const SettingsScreen = () => {
    const dispatch = useAppDispatch();

    const onPressDisconnect = () => {
        console.log('about to disconnect');
        dispatch(disconnect(undefined));
        api.disconnect();
    }

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.text}>Settings</Text>
            <Button title="Disconnect" onPress={onPressDisconnect} />
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

export default SettingsScreen;