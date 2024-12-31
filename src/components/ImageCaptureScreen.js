import React, { useState } from 'react';
import { View, Button, StyleSheet, Text, Image, Alert } from 'react-native';
import { launchCamera } from 'react-native-image-picker';

const ImageCaptureScreen = ({ route, navigation }) => {
  const { folderName } = route.params;
  const [selectedImage, setSelectedImage] = useState(null);

  const handleCaptureImage = () => {
    const options = {
      mediaType: 'photo',
      saveToPhotos: true,
      quality: 1,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        Alert.alert('Capture Canceled', 'No image captured!');
      } else if (response.errorCode) {
        Alert.alert('Error', response.errorMessage || 'Something went wrong while capturing the image.');
      } else if (response.assets && response.assets.length > 0) {
        setSelectedImage(response.assets[0].uri);
      }
    });
  };

  const handleUploadImage = () => {
    if (selectedImage) {
      // Simulate image upload
      Alert.alert('Success', `Image uploaded to folder: ${folderName}`);
      setSelectedImage(null); // Clear the image after uploading
    } else {
      Alert.alert('No Image', 'Please capture an image before uploading.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Folder: {folderName}</Text>
      {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}
      <View style={styles.buttonContainer}>
        <Button title="Capture Image" onPress={handleCaptureImage} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Upload Image" onPress={handleUploadImage} />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="View Images"
          onPress={() => navigation.navigate('ImageDisplay', { folderName:folderName })}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 18, marginBottom: 20 },
  image: { width: 300, height: 300, marginBottom: 20 },
  buttonContainer: { marginVertical: 10, width: '100%', paddingHorizontal: 20 },
});

export default ImageCaptureScreen;
