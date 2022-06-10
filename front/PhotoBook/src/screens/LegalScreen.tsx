import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const LegalScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.text}>Legal</Text>
      <Image style={styles.image} source={require('../../assets/legal.png')} />
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
  image: {
    width: 50,
    height: 50
  }
});

export default LegalScreen;
