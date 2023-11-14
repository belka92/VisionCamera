import React, {useEffect, useRef, useState} from 'react';
import {View, Image} from 'react-native';
import {
  Camera,
  CameraDevice,
  useCameraDevices,
} from 'react-native-vision-camera';
import Video from 'react-native-video';
import {useNavigation} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import useCameraImageStorage from '../../../hooks/useCameraImageStorage';

import {Layout} from '../../../ui-kit';
import {ZoomRange} from '../../molecules';
import {TouchableButton} from '../../atoms';
import {VisionCamera} from '../../organisms';
import {cameraZoom} from '../../../utils/cameraZoom';

import {useStyles} from './CameraScreen.styles';

const CameraScreen = () => {
  const {styles} = useStyles();
  const navigation = useNavigation();
  const {storeImage} = useCameraImageStorage();

  const devices = useCameraDevices();
  const cameraRef = useRef<Camera | null>(null);

  const [imageSource, setImageSource] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [photoOrVideo, setIsPhotoOrVideo] = useState(false);
  const [zoom, setZoom] = useState(cameraZoom[0].minZoom);
  const [torch, setTorch] = useState<'off' | 'on' | undefined>('off');
  const [cameraDevice, setCameraDevice] = useState<CameraDevice | null>(null);

  const navigateToGalleryScreen = () => {
    navigation.navigate('Gallery Screen' as never);
  };

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
        await cameraRef.current.startRecording({
          onRecordingFinished: video => {
            setImageSource(video.path);
            storeImage({uri: video.path});
          },
          onRecordingError: error => console.error(error),
        });
        setIsRecording(true);
      } else {
        await cameraRef.current.stopRecording();
        setIsRecording(false);
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

  return (
    <Layout backgroundColor="transparent">
      <GestureHandlerRootView style={styles.container}>
        <TouchableButton
          icon={
            <FontAwesome6
              name="bolt"
              size={30}
              color={torch === 'off' ? 'white' : '#FFBF00'}
            />
          }
          onPress={handleTorch}
          style={styles.torch}
        />

        <TouchableButton
          onPress={() => setIsPhotoOrVideo(!photoOrVideo)}
          style={styles.toggleCamera}
          title={photoOrVideo ? 'Photo' : 'Video'}
          textStyle={styles.text}
        />
        {!photoOrVideo ? (
          <TouchableButton onPress={capturePhoto} style={styles.camButton}>
            <View style={styles.camCircle} />
          </TouchableButton>
        ) : (
          <TouchableButton onPress={videoRecording} style={styles.camButton}>
            <View
              style={[
                styles.videoCircle,
                {backgroundColor: isRecording ? 'red' : 'green'},
              ]}
            />
          </TouchableButton>
        )}

        <TouchableButton
          icon={<FontAwesome6 name="arrows-rotate" size={30} color="white" />}
          onPress={backCamera}
          style={styles.device}
        />
        <ZoomRange zoom={zoom} setZoom={setZoom} />

        <VisionCamera
          cameraDevice={cameraDevice}
          torch={torch}
          zoom={zoom}
          setZoom={setZoom}
          cameraRef={cameraRef}
        />
        {imageSource ? (
          <TouchableButton
            onPress={() => navigateToGalleryScreen()}
            style={styles.photoContainer}>
            {imageSource.split('.')[1] === 'mov' ? (
              <Video source={{uri: imageSource}} style={styles.photo} paused />
            ) : (
              <Image source={{uri: imageSource}} style={styles.photo} />
            )}
          </TouchableButton>
        ) : null}
      </GestureHandlerRootView>
    </Layout>
  );
};

export default CameraScreen;
