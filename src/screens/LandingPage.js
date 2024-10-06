// src/screens/LandingPage.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const LandingPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>WeCare</Text>
      <Button title="Start" onPress={() => navigation.navigate('ProfileSelection')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
});

export default LandingPage;
