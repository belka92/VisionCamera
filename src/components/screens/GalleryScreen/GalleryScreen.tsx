import React, {useRef, useState} from 'react';
import {View, Image, FlatList} from 'react-native';
import useCameraImageStorage from '../../../hooks/useCameraImageStorage';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import ImageView from 'react-native-image-viewing';
import {Modalize} from 'react-native-modalize';

import {useNavigation} from '@react-navigation/native';

import Video from 'react-native-video';
import Share from 'react-native-share';
import {TouchableButton} from '../../atoms';
import {RemoveMedia} from '../../molecules';
import {useStyles} from './GalleryScreen.style';
import {Layout} from '../../../ui-kit';

const GalleryScreen = () => {
  const navigation = useNavigation();
  const {styles} = useStyles();

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
    <Layout backgroundColor="transparent">
      <GestureHandlerRootView style={styles.container}>
        <View style={styles.buttons}>
          <TouchableButton
            onPress={navigateToCameraScreen}
            icon={<FontAwesome6 name="camera-retro" size={30} color="white" />}
          />

          <TouchableButton
            onPress={navigateToHomeScreen}
            icon={<FontAwesome6 name="house" size={30} color="white" />}
          />
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
                  <TouchableButton
                    onPress={() => goFullScreen(index)}
                    onLongPress={() => onOpen(index)}>
                    <Video
                      ref={ref => (videoRef[index] = ref as Video)}
                      source={{uri: item.uri}}
                      style={styles.photo}
                      paused
                      volume={10}
                    />
                  </TouchableButton>
                ) : (
                  <TouchableButton
                    onPress={() => openFullScreen(index)}
                    onLongPress={() => onOpen(index)}>
                    <Image source={{uri: item.uri}} style={styles.photo} />
                  </TouchableButton>
                )}
              </>
            );
          }}
        />

        <Modalize
          ref={modalizeRef}
          modalStyle={styles.modal}
          childrenStyle={styles.modalChildren}>
          <RemoveMedia
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
    </Layout>
  );
};

export default GalleryScreen;
