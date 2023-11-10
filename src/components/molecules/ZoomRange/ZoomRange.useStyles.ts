import { useTheme } from 'react-native-elements';
import { StyleSheet } from 'react-native';

export function useStyles() {
	const { theme } = useTheme();

    const styles = StyleSheet.create({
   
        zoomContainer: {
            width: 150,
            bottom: 170,
            padding: 10,
            zIndex: 9999,
            borderRadius: 40,
            position: 'absolute',
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: '#22222250',
            justifyContent: 'space-between',
          },
        
          zoomCount: {
            width: 35,
            padding: 5,
          
        
     
            alignItems: 'center',
            backgroundColor: '#222',
            justifyContent: 'center',
        
            borderRadius: 40,
          },
          zoomText:{
            color: '#fff',
            fontWeight: '600',
            fontFamily: 'Thonburi-Light',
            fontSize: 12,
          },
          
          activeZoomCount: {
            
            padding: 10,
            width: 55,
            alignItems: 'center',
          },
          activeTextZoomCount:{
            color: '#FFD700',
          }
    });

	return { styles, theme };
}
