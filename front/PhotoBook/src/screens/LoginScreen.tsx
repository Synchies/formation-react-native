import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import api, {LoginForm} from '../api';
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
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = () => {
    setIsLoading(true);
    (async () => {
      try {
        const loginForm: LoginForm = {
          login,
          password,
        };
        const user = await api.connect(loginForm);

        dispatch(connect(user));
        navigation.replace('Home');
      } catch (err) {
        setErrorMsg(
          "Message d'erreur dont on se branle ne méritant pas 5min de la formation.",
        );
      } finally {
        setIsLoading(false);
      }
    })();
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
        {isLoading ? <ActivityIndicator /> : <Button title="Connect" onPress={onSubmit} />}
        <Text style={styles.error}>{errorMsg}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  error: {
    color: 'red',
    fontWeight: 'bold',
    height: 50,
  },
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
