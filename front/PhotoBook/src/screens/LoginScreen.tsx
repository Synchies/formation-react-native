import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {RootStackParamList} from '../navigation';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {
  connect,
  selectAuthentication,
  User,
} from '../redux/slices/authentication.slice';

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = ({navigation}: LoginProps) => {
  const authentication = useAppSelector(selectAuthentication);
  const dispatch = useAppDispatch();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = () => {
    const user: User = {
      displayName: 'Caca',
    };

    dispatch(connect(user));
    navigation.navigate('Home');
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.form}>
        <Text style={styles.text}>Login</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Ex: Toto"
          onChangeText={setLogin}
          defaultValue={''}></TextInput>
        <TextInput
          style={styles.textInput}
          placeholder="Password..."
          onChangeText={setPassword}
          defaultValue={''}
          secureTextEntry></TextInput>
        <Button title="Connect" onPress={onSubmit} />
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
    marginBottom: 20,
  },
  mainContainer: {
    alignItems: 'stretch',
    height: '100%',
    justifyContent: 'space-between',
    padding: 10,
  },
});

export default LoginScreen;
