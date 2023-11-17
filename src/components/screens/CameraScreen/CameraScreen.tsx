import React, {useEffect, useRef, useState} from 'react';
import {View, Image, GestureResponderEvent} from 'react-native';
import {
  Camera,
  CameraDevice,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';
import Video from 'react-native-video';
import {useNavigation} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useScanBarcodes, BarcodeFormat, scanBarcodes, Barcode} from 'vision-camera-code-scanner';

import useCameraImageStorage from '../../../hooks/useCameraImageStorage';

import {Layout} from '../../../ui-kit';
import {ZoomRange} from '../../molecules';
import {TouchableButton} from '../../atoms';
import {VisionCamera} from '../../organisms';
import {cameraZoom} from '../../../utils/cameraZoom';

import {useStyles} from './CameraScreen.styles';
import {Text} from 'react-native-elements';
import { runOnJS } from 'react-native-reanimated';

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

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });

// const [barcodes, setBarcodes] = useState<Barcode[]>([]);
//   const frameProcessor = useFrameProcessor((frame) => {
//    'worklet';
//        const detectedBarcodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE], { checkInverted: true });
//      runOnJS(setBarcodes)(detectedBarcodes);
//      }, []);

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

  const handleFocus = async (tapEvent: GestureResponderEvent) => {
    try {
      console.log(
        'Tapped at:',
        tapEvent.nativeEvent.locationX,
        tapEvent.nativeEvent.locationY,
      );
      if (cameraRef.current) {
        console.log('Camera ref:', cameraRef.current);
        await cameraRef.current.focus({
          x: tapEvent.nativeEvent.locationX,
          y: tapEvent.nativeEvent.locationY,
        });
        console.log('Focus successful!');
      } else {
        console.log('Camera ref is null.');
      }
    } catch (error) {
      console.warn('Error focusing:', error);
    }
  };

  return (
    <Layout backgroundColor="transparent">
      <GestureHandlerRootView
        style={styles.container}
        onTouchEnd={event => handleFocus(event)}>
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
          frameProccesor={frameProcessor}

        />
        {barcodes.map((barcode, idx) => (
          <Text key={idx} style={styles.barcodeTextURL}>
            {barcode.displayValue}
          </Text>
        ))}

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
