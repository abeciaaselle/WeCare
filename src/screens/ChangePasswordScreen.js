// src/screens/ChangePasswordScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';


const ChangePasswordScreen = ({ route, navigation }) => {
  const { profile } = route.params;
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');


  const handleChangePassword = () => {
    if (newPassword === confirmPassword) {
      alert(`${profile} password changed successfully`);
      navigation.goBack();
    } else {
      setError('Passwords do not match');
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Password for {profile}</Text>
      {error !== '' && <Text style={styles.error}>{error}</Text>}
      <TextInput
        placeholder="New Password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
        style={styles.input}
      />
      <TextInput
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
      />
      <Button title="Change Password" onPress={handleChangePassword} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, marginBottom: 20 },
  input: { borderBottomWidth: 1, marginBottom: 10, padding: 5 },
  error: { color: 'red' },
});


export default ChangePasswordScreen;
