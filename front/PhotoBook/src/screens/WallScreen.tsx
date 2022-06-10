import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import NewArticle from '../articles/NewArticle';
import { backEndUrl } from '../env';

const WallScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <Image
        style={styles.image}
        source={{uri: backEndUrl + '/images/wall.jpg'}}
      />
      <NewArticle />
      <ArticleList />
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
  },
  image: {
      height: 300,
      width: '100%'
  }
});

export default WallScreen;
