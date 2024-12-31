import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      const storedData = await AsyncStorage.getItem('userData');
      const userData = storedData ? JSON.parse(storedData) : null;

      if (userData && userData.email === email && userData.password === password) {
        Alert.alert('Success', 'Sign In Successful!', [
          { text: 'OK', onPress: () => navigation.navigate('Dashboard') },
        ]);
      } else {
        Alert.alert('Error', 'Invalid email or password!');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to retrieve user data. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign In" onPress={handleSignIn} />
      <View style={styles.signupContainer}>
        <Text>Don't have an account? </Text>
        <Text style={styles.signupText} onPress={() => navigation.navigate('SignUp')}>
          Sign Up
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  signupText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default SignInScreen;
