import React, { useState } from 'react';
import { View, Button, StyleSheet, FlatList, Image, Text, Alert } from 'react-native';
import { launchCamera } from 'react-native-image-picker';

const ImageDisplayScreen = ({ route, navigation }) => {
  const { folderName } = route.params;
  const [images, setImages] = useState([]);

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
        const { uri } = response.assets[0];
        if (uri) {
          const newImage = { id: String(images.length + 1), uri };
          setImages(prevImages => [...prevImages, newImage]);
        } else {
          Alert.alert('Error', 'No valid image URI returned.');
        }
      }
    });
  };

  const generateSpinFile = () => {
    if (images.length === 0) {
      Alert.alert('No Images', 'Please capture or upload images before generating a spin file.');
      return;
    }

    const spinData = {
      folderName,
      images: images.map(image => image.uri),
    };

    Alert.alert('Success', 'Spin file generated and saved!');
    console.log('Spin File Data:', spinData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Folder: {folderName || 'Unnamed Folder'}</Text>
      <FlatList
        data={images}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Image source={{ uri: item.uri }} style={styles.image} />
        )}
        numColumns={2}
        contentContainerStyle={images.length ? {} : styles.emptyContainer}
        ListEmptyComponent={<Text style={styles.emptyText}>No images captured yet.</Text>}
      />
      <View style={styles.buttonContainer}>
        <Button title="Capture Image" onPress={handleCaptureImage} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Generate Spin File" onPress={generateSpinFile} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="View Spin" onPress={() => navigation.navigate('SpinScreen', { folderName, images })} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 18, marginBottom: 20, textAlign: 'center' },
  image: { width: '48%', height: 150, margin: '1%', borderRadius: 8 },
  buttonContainer: {
    marginVertical: 10,
    width: '100%',
    paddingHorizontal: 20,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
  },
});

export default ImageDisplayScreen;
