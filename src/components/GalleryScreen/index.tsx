import React, {FC, useEffect, useRef, useState} from 'react';
import {
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import useCameraImageStorage from '../../hooks/useCameraImageStorage';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import ImageView from 'react-native-image-viewing';
import {Modalize} from 'react-native-modalize';

import RemoveImageModal from './RemoveImageModal';
import {useNavigation} from '@react-navigation/native';

import Video from 'react-native-video';
import Share from 'react-native-share';

const GalleryScreen: FC = () => {
  const navigation = useNavigation();

  const {images, removeImage} = useCameraImageStorage();

  const [visible, setIsVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState<number>(0);

  const videoPlayers = useRef<Video[] | null>([]);


  const goFullScreen = (index: number) => {
    if (videoPlayers.current?.[index]) {
      videoPlayers.current[index]?.presentFullscreenPlayer();
    }
  };

  const modalizeRef = useRef<Modalize>(null);

  const navigateToHomeScreen = () => {
    navigation.navigate('Home Screen' as never);
  };

  const navigateToCameraScreen = () => {
    navigation.navigate('Camera Screen' as never);
  };

  const onOpen = (index: number) => {
    setImageIndex(index);

    modalizeRef.current?.open();
  };

  const openFullScreen = (index: number) => {
    setImageIndex(index);
    setIsVisible(true);
  };

  const handleClose = () => {
    if (modalizeRef.current) {
      modalizeRef.current.close();
    }
  };

  const handleRemoveImage = () => {
    removeImage(images[imageIndex].uri);
    handleClose();
  };

  const shareMedia = async () => {
    try {
      const uri = images[imageIndex].uri;
      await Share.open({url: uri});
    } catch (e) {
      console.log(e);
    }

    handleClose();
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={navigateToCameraScreen}>
          <FontAwesome6 name="camera-retro" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToHomeScreen}>
          <FontAwesome6 name="house" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.photos}
        data={images || []}
        keyExtractor={item => item.uri}
        numColumns={4}
        renderItem={({item, index}) => {
          const type = item.uri.split('.')[1];
          const videoRef = videoPlayers.current as Video[];

          return (
            <>
              {type === 'mov' ? (
                <TouchableOpacity
                  onPress={() => goFullScreen(index)}
                  onLongPress={() => onOpen(index)}>
                  <Video
                    ref={ref => (videoRef[index] = ref as Video)}
                    source={{uri: item.uri}}
                    style={styles.photo}
                    paused
                    volume={10}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => openFullScreen(index)}
                  onLongPress={() => onOpen(index)}>
                  <Image source={{uri: item.uri}} style={styles.photo} />
                </TouchableOpacity>
              )}
            </>
          );
        }}
      />

      <Modalize
        ref={modalizeRef}
        modalStyle={styles.modal}
        childrenStyle={styles.modalChildren}>
        <RemoveImageModal
          handleClose={handleClose}
          removeImage={handleRemoveImage}
          shareMedia={shareMedia}
        />
      </Modalize>

      {visible && (
        <ImageView
          images={images.map(item => ({uri: item.uri}))}
          imageIndex={imageIndex}
          visible={visible}
          onRequestClose={() => setIsVisible(false)}
        />
      )}
    </GestureHandlerRootView>
  );
};

export default GalleryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FACBEA',
  },
  photos: {flex: 1, marginTop: 50},

  modal: {
    flex: 1,
    top: 20,
    alignItems: 'center',
    backgroundColor: '#222',
    justifyContent: 'center',
  },
  modalChildren: {
    top: 50,
    position: 'relative',
  },

  photo: {
    margin: 1,
    width: 100,
    height: 100,
    backgroundColor: '#000',
  },
  home: {
    flex: 1,
    top: 50,
    paddingHorizontal: 20,
  },
  buttons: {
    gap: 15,
    top: 40,
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'row',
  },
});
