import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Image,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isPreview, setIsPreview] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [showOverlay, setShowOverlay] = useState(true);
  const cameraRef = useRef<RNCamera>(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const options = {
          quality: 0.8,
          base64: false,
          skipProcessing: true,
        };
        const data = await cameraRef.current.takePictureAsync(options);
        setCapturedPhoto(data.uri);
        setIsPreview(true);
      } catch (error) {
        Alert.alert('Error', 'Failed to take picture');
      }
    }
  };

  const savePhoto = () => {
    Alert.alert('Success', 'Photo saved to your progress gallery!', [
      {text: 'OK', onPress: () => setIsPreview(false)},
    ]);
    setCapturedPhoto(null);
  };

  const retakePhoto = () => {
    setCapturedPhoto(null);
    setIsPreview(false);
  };

  if (isPreview && capturedPhoto) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.previewContainer}>
          <Image source={{uri: capturedPhoto}} style={styles.previewImage} />

          <View style={styles.previewOverlay}>
            <Text style={styles.previewTitle}>Great shot!</Text>
            <Text style={styles.previewSubtitle}>
              Your nails are looking healthier every day
            </Text>
          </View>

          <View style={styles.previewActions}>
            <TouchableOpacity style={styles.retakeButton} onPress={retakePhoto}>
              <Icon name="refresh" size={24} color="#6366f1" />
              <Text style={styles.retakeText}>Retake</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.saveButton} onPress={savePhoto}>
              <Icon name="check" size={24} color="#ffffff" />
              <Text style={styles.saveText}>Save Photo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={styles.camera}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.off}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}>

        {showOverlay && (
          <View style={styles.overlayContainer}>
            <View style={styles.handGuide}>
              <View style={styles.handOutline}>
                <Text style={styles.guideText}>Position your hand here</Text>
                <View style={styles.fingerGuides}>
                  <View style={styles.fingerGuide} />
                  <View style={styles.fingerGuide} />
                  <View style={styles.fingerGuide} />
                  <View style={styles.fingerGuide} />
                  <View style={styles.thumbGuide} />
                </View>
              </View>
            </View>
          </View>
        )}

        <View style={styles.topControls}>
          <TouchableOpacity
            style={styles.overlayToggle}
            onPress={() => setShowOverlay(!showOverlay)}>
            <Icon
              name={showOverlay ? 'visibility-off' : 'visibility'}
              size={24}
              color="#ffffff"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.infoButton}>
            <Icon name="info" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <View style={styles.bottomControls}>
          <View style={styles.tipsContainer}>
            <Text style={styles.tipsTitle}>Tips for best results:</Text>
            <Text style={styles.tipsText}>• Use good lighting</Text>
            <Text style={styles.tipsText}>• Keep hand steady</Text>
            <Text style={styles.tipsText}>• Match the overlay guide</Text>
          </View>

          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <View style={styles.captureButtonInner} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.galleryButton}>
            <Icon name="photo-library" size={24} color="#ffffff" />
            <Text style={styles.galleryText}>Gallery</Text>
          </TouchableOpacity>
        </View>
      </RNCamera>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  camera: {
    flex: 1,
  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  handGuide: {
    position: 'relative',
  },
  handOutline: {
    width: 200,
    height: 280,
    borderWidth: 2,
    borderColor: '#ffffff',
    borderRadius: 20,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  guideText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  fingerGuides: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  fingerGuide: {
    width: 20,
    height: 60,
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 10,
    marginHorizontal: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  thumbGuide: {
    width: 20,
    height: 40,
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 10,
    marginLeft: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  topControls: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  overlayToggle: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 10,
  },
  infoButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 10,
  },
  bottomControls: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  tipsContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 12,
    padding: 12,
    marginRight: 20,
  },
  tipsTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  tipsText: {
    color: '#ffffff',
    fontSize: 12,
    opacity: 0.9,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6366f1',
  },
  galleryButton: {
    alignItems: 'center',
    marginLeft: 20,
  },
  galleryText: {
    color: '#ffffff',
    fontSize: 12,
    marginTop: 4,
  },
  previewContainer: {
    flex: 1,
  },
  previewImage: {
    flex: 1,
    width: '100%',
  },
  previewOverlay: {
    position: 'absolute',
    top: 100,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 12,
    padding: 16,
  },
  previewTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  previewSubtitle: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 4,
    opacity: 0.9,
  },
  previewActions: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  retakeButton: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
    justifyContent: 'center',
  },
  retakeText: {
    color: '#6366f1',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  saveButton: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  saveText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default CameraScreen;