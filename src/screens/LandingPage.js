import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';


const LandingPage = ({ navigation }) => {
  useEffect(() => {
    // Navigate to ProfileSelection after 3 seconds
    const timer = setTimeout(() => {
      navigation.navigate('ProfileSelection');
    }, 3000);


    // Cleanup the timer
    return () => clearTimeout(timer);
  }, [navigation]);


  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/WecareLogo.png')} // Ensure correct path to your logo
        style={styles.logo}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // White background
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200, // Adjust the width of your logo
    height: 200, // Adjust the height of your logo
    resizeMode: 'contain', // Ensure the image maintains its aspect ratio
  },
});


export default LandingPage;


