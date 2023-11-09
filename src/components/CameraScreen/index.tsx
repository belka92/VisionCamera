import React, {FC, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
  Camera,
  CameraDevice,
  CameraPermissionStatus,
  useCameraDevices,
} from 'react-native-vision-camera';

import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

import {useIsFocused, useNavigation} from '@react-navigation/native';
import useCameraImageStorage from '../../hooks/useCameraImageStorage';
import {useAppState} from '@react-native-community/hooks';
import Video from 'react-native-video';
import {
  GestureHandlerRootView,
  PinchGestureHandler,
} from 'react-native-gesture-handler';
import Reanimated from 'react-native-reanimated';
import {cameraZoom} from '../../utils/cameraZoom';

const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);
Reanimated.addWhitelistedNativeProps({
  zoom: true,
});
const CameraScreen: FC = () => {
  const navigation = useNavigation();
  const {storeImage} = useCameraImageStorage();

  const navigateToGalleryScreen = () => {
    navigation.navigate('Gallery Screen' as never);
  };

  const [cameraPermission, setCameraPermission] =
    useState<CameraPermissionStatus | null>(null);

  const cameraRef = useRef<Camera | null>(null);

  const [imageSource, setImageSource] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const [photoOrVideo, setIsPhotoOrVideo] = useState(false);

  const devices = useCameraDevices();
  const [cameraDevice, setCameraDevice] = useState<CameraDevice | null>(null);

  const [torch, setTorch] = useState<'off' | 'on' | undefined>('off');

  const isFocused = useIsFocused();
  const appState = useAppState();
  const isActive = isFocused && appState === 'active';
  const [zoom, setZoom] = useState(cameraZoom[1].minZoom);

  const onPinchGestureEvent = (nativeEvent: any) => {
    const scale = nativeEvent.nativeEvent.scale;
    const velocity = nativeEvent.nativeEvent.velocity / 2;

    let newZoom =
      velocity > 0
        ? zoom + scale * velocity
        : zoom - scale * Math.abs(velocity);

    if (newZoom < 0.5) {
      newZoom = 0.5;
    } else if (newZoom > 10) {
      newZoom = 10;
    }

    setZoom(newZoom);
  };

  const zoomRenderer = cameraZoom.map(item => {
    const parseZoom = parseFloat(zoom.toFixed(1));

    return (
      <View key={item.id}>
        <Text
          style={[
            styles.zoomCount,
            zoom >= item.minZoom &&
              zoom <= item.maxZoom &&
              styles.activeZoomCount,
          ]}>
          {zoom >= item.minZoom && zoom <= item.maxZoom
            ? `${parseZoom}x`
            : item.minZoom}
        </Text>
      </View>
    );
  });

  const capturePhoto = async () => {
    try {
      if (cameraRef.current == null) throw new Error('Camera ref is null!');
      const photo = await cameraRef.current.takePhoto();

      setImageSource(photo.path);

      storeImage({uri: photo.path});
    } catch (error) {
      console.warn(error);
    }
  };

  const videoRecording = async () => {
    try {
      if (cameraRef.current == null) throw new Error('Camera ref is null');
      if (!isRecording) {
        const video = await cameraRef.current.startRecording({
          onRecordingFinished: video => {
            setImageSource(video.path);
            storeImage({uri: video.path});
          },
          onRecordingError: error => console.error(error),
        });
        setIsRecording(true);
        console.warn('Recording started', video);
      } else {
        const video = await cameraRef.current.stopRecording();
        setIsRecording(false);
        console.warn('Recording stopped', video);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const backCamera = () => {
    if (cameraDevice === devices.back) {
      setCameraDevice(devices.front as CameraDevice);
    } else setCameraDevice(devices.back as CameraDevice);
  };

  useEffect(() => {
    if (devices) {
      setCameraDevice(devices.back as CameraDevice);
    }
  }, [devices]);

  const handleTorch = () => {
    if (torch === 'off') {
      setTorch('on');
    } else {
      setTorch('off');
    }
  };

  useLayoutEffect(() => {
    const getPermissions = async () => {
      const cameraPermissionStatus = await Camera.getCameraPermissionStatus();
      if (cameraPermissionStatus === 'authorized') {
        const newCameraPermission = await Camera.requestCameraPermission();
        setCameraPermission(newCameraPermission);
      }
      const microphonePermission = await Camera.getMicrophonePermissionStatus();
      console.log('microphonePermission', microphonePermission);
      if (microphonePermission === 'not-determined') {
        const newMicrophonePermission =
          await Camera.requestMicrophonePermission();
        console.log('newMicrophonePermission', newMicrophonePermission);
      }
    };
    getPermissions();
  }, []);

  const renderDetectorContent = () => {
    if (cameraDevice && cameraPermission === 'authorized') {
      return (
        <PinchGestureHandler onGestureEvent={onPinchGestureEvent}>
          <ReanimatedCamera
            device={cameraDevice}
            isActive={isActive}
            style={styles.camera}
            torch={torch}
            ref={cameraRef}
            zoom={zoom}
            photo
            video
            audio
            enableDepthData
            enableHighQualityPhotos
          />
        </PinchGestureHandler>
      );
    }
    return (
      <ActivityIndicator size="large" color="#1C6758" style={styles.loading} />
    );
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <TouchableOpacity onPress={handleTorch} style={styles.torch}>
        <FontAwesome6
          name="bolt"
          size={30}
          color={torch === 'off' ? 'white' : '#FFBF00'}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setIsPhotoOrVideo(!photoOrVideo)}
        style={styles.toggleCamera}>
        <Text style={styles.text}>{photoOrVideo ? 'Photo' : 'Video'}</Text>
      </TouchableOpacity>
      {!photoOrVideo ? (
        <TouchableOpacity onPress={capturePhoto} style={styles.camButton}>
          <View style={styles.camCircle} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={videoRecording} style={styles.camButton}>
          <View
            style={[
              styles.videoCircle,
              {backgroundColor: isRecording ? 'red' : 'green'},
            ]}
          />
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={backCamera} style={styles.device}>
        <FontAwesome6 name="arrows-rotate" size={30} color="white" />
      </TouchableOpacity>
      <View style={styles.zoomContainer}>{zoomRenderer}</View>
      {renderDetectorContent()}
      {imageSource ? (
        <TouchableOpacity
          onPress={() => navigateToGalleryScreen()}
          style={styles.photoContainer}>
          {imageSource.split('.')[1] === 'mov' ? (
            <Video source={{uri: imageSource}} style={styles.photo} paused />
          ) : (
            <Image source={{uri: imageSource}} style={styles.photo} />
          )}
        </TouchableOpacity>
      ) : null}
    </GestureHandlerRootView>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: Dimensions.get('window').width,
  },
  camera: {
    flex: 1,
    alignItems: 'center',
    width: Dimensions.get('window').width,
  },

  camButton: {
    zIndex: 6,
    width: 80,
    bottom: 80,
    height: 80,

    borderWidth: 4,
    borderRadius: 40,
    alignSelf: 'center',
    borderColor: '#222',
    position: 'absolute',
  },
  videoButton: {
    left: 60,
    zIndex: 6,
    width: 80,
    bottom: 80,
    height: 80,
    borderWidth: 4,
    borderRadius: 40,
    alignSelf: 'center',
    borderColor: '#222',
    position: 'absolute',
  },

  camCircle: {
    top: 3,
    width: 65,
    height: 65,
    borderWidth: 2,
    borderRadius: 40,
    alignSelf: 'center',
    borderColor: '#fff',
    backgroundColor: '#22222290',
  },

  videoCircle: {
    top: 7,
    width: 55,
    height: 55,
    borderWidth: 2,
    borderRadius: 40,
    alignSelf: 'center',
    borderColor: '#fff',
    backgroundColor: 'red',
  },

  device: {
    right: 55,
    zIndex: 6,
    bottom: 90,
    padding: 10,
    borderWidth: 2,
    borderRadius: 40,
    borderColor: '#fff',
    position: 'absolute',
    backgroundColor: '#B2BEB520',
  },
  torch: {
    top: 45,
    left: 20,
    zIndex: 6,
    position: 'absolute',
  },
  photoContainer: {
    right: 150,
    position: 'relative',
  },
  photo: {
    width: 65,
    height: 65,
    bottom: 87,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#fff',
    position: 'absolute',
    backgroundColor: '#000',
  },

  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  video: {
    width: 200,
    height: 150,
    zIndex: 2222,
    position: 'absolute',
  },
  toggleCamera: {
    bottom: 30,
    zIndex: 555,
    borderRadius: 20,
    paddingVertical: 6,
    position: 'absolute',
    paddingHorizontal: 15,
    backgroundColor: '#222',
  },
  text: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    fontFamily: 'Thonburi-Light',
  },

  zoomContainer: {
    bottom: 170,
    zIndex: 9999,
    borderRadius: 40,
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: '#222',
  },

  zoomCount: {
    padding: 10,
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Thonburi-Light',
  },
  activeZoomCount: {
    color: '#FFD700',
  },
});
