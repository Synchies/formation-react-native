import React, {useState} from 'react';
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {useAppDispatch} from '../redux/hooks';
import {addNewArticle, fetchAllArticles} from '../redux/slices/articles.slice';

const NewArticle = () => {
  const [text, setText] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const onSubmit = () => {
    (async () => {
      setIsLoading(true);
      try {
        await dispatch(addNewArticle({content: text, images})).unwrap();
        setIsLoading(false);
        await dispatch(fetchAllArticles()).unwrap();
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
        setText('');
      }
    })();
  };

  return (
    <View style={styles.mainContainer}>
      <TextInput
        multiline
        numberOfLines={4}
        onChangeText={setText}
        value={text}
        style={styles.textInput}
        placeholder="Comment vous sentez-vous aujourd'hui ?"
      />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Button title="Ajouter un article" onPress={onSubmit} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    fontSize: 50,
  },
  mainContainer: {
    width: '100%',
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'black',
    textAlignVertical: 'top',
  },
});

export default NewArticle;
