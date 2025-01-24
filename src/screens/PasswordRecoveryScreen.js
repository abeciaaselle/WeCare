import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ImageBackground } from 'react-native';


const PasswordRecoveryScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);


  const handleSendCode = () => {
    if (phoneNumber) {
      // Simulate sending a code
      setIsCodeSent(true);
    }
  };


  const handleVerifyCode = () => {
    if (verificationCode) {
      navigation.navigate('EnterPassword', { profile: 'Admin' }); // Navigate back to password screen after recovery
    }
  };


  return (
    <ImageBackground
      source={require('../../assets/images/Login.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Password Recovery</Text>
        {!isCodeSent ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
            <TouchableOpacity style={styles.button} onPress={handleSendCode}>
              <Text style={styles.buttonText}>Send Code</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TextInput
              style={styles.input}
              placeholder="Enter verification code"
              value={verificationCode}
              onChangeText={setVerificationCode}
              keyboardType="number-pad"
            />
            <TouchableOpacity style={styles.button} onPress={handleVerifyCode}>
              <Text style={styles.buttonText}>Verify Code</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Ensures the background image covers the entire screen
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Slight white overlay to ensure content is readable
    borderRadius: 10, // Optional: To make the container's corners rounded
  },
  title: {
    fontSize: 22,
    color: '#333',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#FFF',
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#5A4FCF',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});


export default PasswordRecoveryScreen;
