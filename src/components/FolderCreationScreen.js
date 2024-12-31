import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';

const FolderCreationScreen = ({ navigation }) => {
  const [folderName, setFolderName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateFolder = () => {
    if (!folderName.trim()) {
      Alert.alert('Error', 'Folder name is required.');
      return;
    }

    setIsLoading(true);
    const uppercasedName = folderName.toUpperCase();

    // Simulate folder creation process (e.g., API call)
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Success', `Folder Created: ${uppercasedName}`);
      navigation.navigate('ImageDisplay', { folderName: uppercasedName });
      setFolderName(''); // Clear input after creation
    }, 1000); // Simulated delay for folder creation
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter Folder Name"
        value={folderName}
        onChangeText={setFolderName}
        style={styles.input}
        autoCapitalize="words" // Capitalize each word
      />
      <Button title="Create Folder" onPress={handleCreateFolder} disabled={isLoading} />
      {isLoading && <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8', // Light background for better contrast
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: '#fff', // White background for input
  },
  loader: {
    marginTop: 20,
  },
});

export default FolderCreationScreen;
