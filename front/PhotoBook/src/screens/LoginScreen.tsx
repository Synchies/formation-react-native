import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {RootStackParamList} from '../navigation';

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = ({navigation}: LoginProps) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.form}>
        <Text style={styles.text}>Login</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Ex: Toto"
          onChangeText={newText => {}}
          defaultValue={''}></TextInput>
        <TextInput
          style={styles.textInput}
          placeholder="Password..."
          onChangeText={newText => {}}
          defaultValue={''}
          secureTextEntry></TextInput>
        <Button
          title="Connect"
          onPress={() => {
            navigation.navigate('Home');
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    height: 200,
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 3,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 50,
    marginBottom: 20
  },
  mainContainer: {
    alignItems: 'stretch',
    height: '100%',
    justifyContent: 'space-between',
    padding: 10,
  },
});

export default LoginScreen;
