import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpScreen from './src/components/SignUpScreen';
import SignInScreen from './src/components/SignInScreen';
import FolderCreationScreen from './src/components/FolderCreationScreen';
import ImageCaptureScreen from './src/components/ImageCaptureScreen';
import ImageDisplayScreen from './src/components/ImageDisplayScreen';
import SpinScreen from './src/components/SpinScreen';
import DashboardScreen from './src/components/DashboardScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="FolderCreation" component={FolderCreationScreen} />
        <Stack.Screen name="ImageCapture" component={ImageCaptureScreen} />
        <Stack.Screen name="ImageDisplay" component={ImageDisplayScreen} />
        <Stack.Screen name="SpinScreen" component={SpinScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
