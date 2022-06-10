import {Icon} from '@rneui/base';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Button,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import api from '../api';
import { backEndUrl } from '../env';
import {useAppDispatch} from '../redux/hooks';
import {addNewArticle, fetchAllArticles} from '../redux/slices/articles.slice';

const NewArticle = () => {
  const [text, setText] = useState('');
  const [images, setImages] = useState([] as string[]);
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
        setImages([]);
      }
    })();
  };

  const onUpload = async () => {
    console.log('adding photos');
    const result = await launchImageLibrary({
      mediaType: 'photo',
    });
    console.log('result: ', result);
    if (result.assets === undefined) {
      return;
    }

    for (const asset of result.assets) {
      try {
        // for the time being support only jpg
        const imageName =
          Date.now() + '_' + Math.floor(1e6 * Math.random()) + '.jpg';
        const formData = new FormData();
        formData.append('file', {
          uri: asset.uri,
          name: imageName,
          type: asset.type,
        });
        await api.upload(formData);
        const imageUri = backEndUrl + '/' + imageName;
        setImages([...images, imageUri]);
      } catch (err) {
        console.log('err: ', err);
      }
    }
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
      <View style={styles.imageView}>
        {images.map(imageUri => (
          <Image
            key={imageUri}
            style={styles.image}
            source={{
              uri: imageUri,
            }}
          />
        ))}
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={onUpload}>
          <View>
            <Icon name="add-photo-alternate" raised />
          </View>
        </TouchableOpacity>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <TouchableOpacity onPress={onSubmit}>
            <View>
              <Icon name="add" raised />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
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
  imageView: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    width: '100%',
  },
  image: {
    height: 200,
    resizeMode: 'cover',
  }
});

export default NewArticle;
