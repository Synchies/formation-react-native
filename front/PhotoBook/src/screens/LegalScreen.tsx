import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const LegalScreen = () => {
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.text}>Legal</Text>
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

export default LegalScreen;