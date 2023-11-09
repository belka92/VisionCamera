import { useState } from 'react';
import useLocalStorage from './useLocalStorage';

export interface ImageObject {
  uri: string;
}

const useCameraImageStorage = () => {
  const [images, setImages] = useLocalStorage<ImageObject[]>('camera_images', []);
  const [currentImage, setCurrentImage] = useState<ImageObject | null>(null);

  const storeImage = (image: ImageObject) => {
    const newImages = [...images, image];
    setImages(newImages);
    setCurrentImage(image);
  };

  const removeImage = (uri: string) => {
    const newImages = images.filter((image) => image.uri !== uri);
    setImages(newImages);
  };

  return {
    images,
    currentImage,
    storeImage,
    removeImage,
  };
};

export default useCameraImageStorage;