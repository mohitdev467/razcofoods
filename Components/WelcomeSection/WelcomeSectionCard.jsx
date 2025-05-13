import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { 
  responsiveWidth as rw, 
  responsiveHeight as rh, 
  responsiveFontSize as rf 
} from 'react-native-responsive-dimensions';
import { ImagePicker } from '../../helpers/ImageHelper/ImagePicker';

const WelcomeSection = () => {
    return (
        <View style={styles.container}>
          <Image
            source={ImagePicker.logoImage}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.description}>
            At Razco Super Shop, we pride ourselves on delivering exceptional service and quality products to our customers. Shop with us for a seamless and satisfying experience every time!
          </Text>
        </View>
      );
};

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: rw(5),
      alignItems: 'center',
      backgroundColor: '#fff',
      marginHorizontal: rw(5),
    },
    logo: {
      width: rw(30),
      height: rh(10),
      marginBottom: rh(3),
    },
    description: {
      fontSize: rf(2),
      color: '#444',
      textAlign: 'center',
      lineHeight: rh(3.2),
    },
  });

export default WelcomeSection;