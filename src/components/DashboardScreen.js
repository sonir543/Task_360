import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import FolderCreationScreen from './FolderCreationScreen';
import ImageCaptureScreen from './ImageCaptureScreen';
import ImageDisplayScreen from './ImageDisplayScreen';

const DashboardScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Dashboard!</Text>
      <Text style={styles.subtitle}>Select an action below:</Text>

      <Button
        title="Create Spin Folder"
        onPress={() => navigation.navigate('FolderCreation')}
      />
      {/* <Button
        title="Capture and Upload Images"
        onPress={() => navigation.navigate('ImageCapture')}
      />
      <Button
        title="Display Uploaded Images"
        onPress={() => navigation.navigate('ImageDisplay')}
      /> */}
      <Button
        title="Logout"
        onPress={() => navigation.navigate('SignIn')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
  },
});

export default DashboardScreen;
