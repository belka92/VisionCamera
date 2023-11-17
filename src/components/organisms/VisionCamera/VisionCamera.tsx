import React, { useLayoutEffect, useState } from 'react';
import Reanimated from 'react-native-reanimated';
import { ActivityIndicator } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import { useAppState } from '@react-native-community/hooks';
import { PinchGestureHandler } from 'react-native-gesture-handler';
import { Camera, CameraDevice, CameraPermissionStatus, Frame } from 'react-native-vision-camera';

import { useStyles } from './VisionCamera.useStyles';
import { Surface } from 'gl-react';
import { Saturate } from '../../molecules';

const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);
Reanimated.addWhitelistedNativeProps({
  zoom: true,
});

const VisionCamera = ({zoom, cameraDevice, torch, setZoom, cameraRef, frameProccesor }: IVisionCameraProps) => {
  const { styles, theme } = useStyles();
  const [cameraPermission, setCameraPermission] =
  useState<CameraPermissionStatus | null>(null);

  const isFocused = useIsFocused();
  const appState = useAppState();
  const isActive = isFocused && appState === 'active';


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

  const onPinchGestureEvent = (nativeEvent: any) => {
    const scale = nativeEvent.nativeEvent.scale;
    const velocity = nativeEvent.nativeEvent.velocity / 2;

    let newZoom =
      velocity > 0
        ? zoom + scale * velocity
        : zoom - scale * Math.abs(velocity);

    if (newZoom < 1) {
      newZoom = 1;
    } else if (newZoom > 10) {
      newZoom = 10;
    }

    setZoom(newZoom);
  };

  const renderGestureContent = () => {
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
            frameProcessor={frameProccesor}
          />
       
        </PinchGestureHandler>
      );
    }
    return (
      <ActivityIndicator size="large" color="#1C6758" style={styles.loading} />
    );
  };

  return (
    <>
      {renderGestureContent()}
    </>
  );
};

export interface IVisionCameraProps {
  zoom: number;
  frameProccesor: (frame: Frame) => void;
  torch: 'off' | 'on' | undefined;
  setZoom: (value: number)=> void;
  cameraDevice: CameraDevice | null;
  cameraRef: React.MutableRefObject<Camera | null>;

};

export default VisionCamera;
