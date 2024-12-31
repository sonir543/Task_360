import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import RNFS from 'react-native-fs';

const SpinScreen = ({ route }) => {
  const { images } = route.params; // Array of image objects with id and uri properties
  const [base64Images, setBase64Images] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const convertImagesToBase64 = async () => {
      try {
        const base64Uris = await Promise.all(
          images.map(async (image) => {
            // Ensure the image has a valid uri property
            const uri = image.uri;
            if (typeof uri !== 'string') {
              throw new Error(`Invalid URI: ${uri}`);
            }

            // Handle 'file://' URIs correctly
            const filePath = uri.startsWith('file://') ? uri.replace('file://', '') : uri;

            // Check if the file path is correct
            console.log('File Path:', filePath);

            // Read the file and convert it to base64
            const base64String = await RNFS.readFile(filePath, 'base64');
            return `data:image/jpeg;base64,${base64String}`;
          })
        );
        setBase64Images(base64Uris);
      } catch (error) {
        console.error('Error converting images to Base64:', error);
        Alert.alert('Error', 'Failed to load images. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    convertImagesToBase64();
  }, [images]);

  // Create the HTML content with the base64 images
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/photo-sphere-viewer/4.0.0/photo-sphere-viewer.min.css" />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/photo-sphere-viewer/4.0.0/photo-sphere-viewer.min.js"></script>
      <style>
        body { margin: 0; overflow: hidden; }
        #viewer { width: 100vw; height: 100vh; }
      </style>
    </head>
    <body>
      <div id="viewer"></div>
      <script>
        const images = ${JSON.stringify(base64Images)};
        const viewer = new PhotoSphereViewer.Viewer({
          container: document.getElementById('viewer'),
          panorama: images[0] || '', // Initial image
          navbar: false,
          mousewheel: true,
          touchmoveTwoFingers: true,
        });

        let currentIndex = 0;

        viewer.on('click', () => {
          if (images.length > 1) {
            currentIndex = (currentIndex + 1) % images.length;
            viewer.setPanorama(images[currentIndex]);
          }
        });

        console.log('360 Viewer Initialized');
      </script>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <WebView
          source={{ html: htmlContent }}
          style={styles.webview}
          originWhitelist={['*']}
          javaScriptEnabled
          domStorageEnabled
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  webview: {
    flex: 1,
  },
});

export default SpinScreen;
