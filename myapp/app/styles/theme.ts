import { useTheme } from '@react-navigation/native';
import { StyleSheet, TextStyle, ViewStyle, ImageStyle, Dimensions  } from 'react-native';
import { AppColors } from './colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export function useThemedStyles() {
  const { dark } = useTheme(); // boolean: true if dark mode

  // choose colors based on theme
  const colors = {
    background: dark ? AppColors.black : AppColors.white,
    text: dark ? AppColors.white : AppColors.black,
    card: AppColors.card,
    pink1: AppColors.growing_pink,
    pink2: AppColors.sleeping_pink,
    pink3: AppColors.shy_pink,
    button: AppColors.matcha_green,
    green1: AppColors.tulipe_leafs,
    green2: AppColors.grounding_green,
    green3: AppColors.sleeping_green
  };

  const styles = StyleSheet.create({
    // General container for most screens
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      backgroundColor: colors.background,
    } as ViewStyle,

    backgroundImage: {
      // flex: 1,
      justifyContent: 'center', // vertical alignment
      alignItems: 'center',     // horizontal alignment
      // width: SCREEN_WIDTH, // full width
      height: undefined,   // height adjusts to content
      alignSelf: 'center', // horizontally center
      // paddingHorizontal: 100,
      // marginLeft: -100,           // shift left by 10px
    },

    buttonContainer: {
      fontFamily: 'Manrope_400Regular',
      marginTop: 20,
      marginBottom: 20,
      paddingVertical: 12,
      borderRadius: 25,
      width: '100%',
      backgroundColor: colors.button,
    } as ViewStyle,
    
    buttonText: {
      fontFamily: 'Manrope_700Bold',
      color: colors.text, // or colors.text depending on contrast
      fontSize: 18,
      textAlign: 'center'
    } as TextStyle,

    // ====== Text ======
    
    input: {
      fontFamily: 'Manrope_400Regular',
      marginBottom: 10,
      borderWidth: 1,
      borderColor: colors.card,
      padding: 8,
      paddingHorizontal: 100,
      color: colors.card,
      backgroundColor: colors.background,
    } as TextStyle,

    title: {
      fontFamily: 'Manrope_700Bold',
      fontSize: 28,
      alignItems: 'center',
      textAlign: 'center'
    } as TextStyle,

    text: {
      fontFamily: 'Manrope_400Regular',
    } as TextStyle,

    // ====== Welcome screen specific styles ======
    welcomeContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: 20,
      paddingTop: 100,
      backgroundColor: colors.background,
    } as ViewStyle,

    welcomeImage: {
      width: 250,
      height: 350,
      marginBottom: 20,
      alignItems: 'center'
    } as ImageStyle,

    logoImage: {
      width: 220,
      height: 150,
      // marginBottom: 20,
    } as ImageStyle,

    signUpText: {
      fontSize: 16,
      color: colors.text,
    } as TextStyle,

    signUpLink: {
      color: colors.green1, // you can later make this dynamic if you want
      fontWeight: 'bold',
    } as TextStyle,
  });

  return styles;
}
