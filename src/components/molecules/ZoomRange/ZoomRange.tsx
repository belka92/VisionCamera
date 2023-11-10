import React from 'react';
import {View} from 'react-native';
import {TouchableButton} from '../../atoms';
import {useStyles} from './ZoomRange.useStyles';
import {cameraZoom} from '../../../utils/cameraZoom';

const ZoomRange = ({zoom, setZoom}: IZoomRangeProps) => {
  const {styles} = useStyles();

  const zoomRenderer = cameraZoom.map(item => {
    const parseZoom = parseFloat(zoom.toFixed(1));

    const buttonStyle =
      zoom >= item.minZoom && zoom <= item.maxZoom
        ? styles.activeZoomCount
        : {};

    const textStyle =
      zoom >= item.minZoom && zoom <= item.maxZoom
        ? styles.activeTextZoomCount
        : {};

    const handleZoom = (item: number) => {
      setZoom(item);
    };

    return (
      <View key={item.id} style={[styles.zoomCount, buttonStyle]}>
        <TouchableButton
          textStyle={[styles.zoomText, textStyle]}
          title={
            zoom >= item.minZoom && zoom <= item.maxZoom
              ? `${parseZoom}x`
              : item.minZoom
          }
          onPress={() => handleZoom(item.minZoom)}
        />
      </View>
    );
  });

  return <View style={styles.zoomContainer}>{zoomRenderer}</View>;
};

export interface IZoomRangeProps {
  zoom: number;
  setZoom: (value: number) => void;
}

export default ZoomRange;
