import { useTheme } from '@react-navigation/native';
import { StyleSheet, TextStyle, ViewStyle, ImageStyle, Dimensions  } from 'react-native';
import { AppColors } from './colors';
import { SafeAreaView } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export function useThemedStyles() {

  const { dark } = useTheme(); // boolean: true if dark mode

  // choose colors based on theme
  const colors = {
    background: dark ? AppColors.black : AppColors.white,
    text: dark ? AppColors.white : AppColors.black,
    card: AppColors.card,
    border: AppColors.border,
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
      //padding: 20,
      backgroundColor: colors.background,
    } as ViewStyle,
    
    backgroundImage: {
      flex: 1,
      justifyContent: 'center', // vertical alignment
      alignItems: 'center',     // horizontal alignment
     width: SCREEN_WIDTH, // full width
      height: SCREEN_HEIGHT/2,   // height adjusts to content
      alignSelf: 'center', // horizontally center
      // paddingHorizontal: 100,
      // marginLeft: -100,           // shift left by 10px
    },

    shortBackgroundImage: {
      flex: 1,
      justifyContent: 'center', // vertical alignment
      alignItems: 'center',     // horizontal alignment
     width: SCREEN_WIDTH, // full width
      height: SCREEN_HEIGHT/4,   // height adjusts to content
      alignSelf: 'center', // horizontally center
      // paddingHorizontal: 100,
      // marginLeft: -100,           // shift left by 10px
    },

    //======= Buttons ========

    buttonContainer: {
      fontFamily: 'Manrope_400Regular',
      marginTop: 20,
      marginBottom: 20,
      paddingVertical: 12,
      borderRadius: 25,
      width: '70%',
      backgroundColor: colors.button,
    } as ViewStyle,
    
    buttonText: {
      fontFamily: 'Manrope_700Bold',
      color: colors.text, // or colors.text depending on contrast
      fontSize: 18,
      textAlign: 'center'
    } as TextStyle,

    buttonRow: {
      flexDirection: "row",
      justifyContent: "space-between",
    },

    buttonCol: {
      flexDirection: 'column',
      justifyContent: "space-between",
    },

    // ====== Text ======
    
    input: {
      fontFamily: 'Manrope_400Regular',
      marginBottom: 10,
      borderWidth: 1,
      borderColor: colors.card,
      padding: 8,
      paddingHorizontal: 16,
      paddingVertical: 12,
      width: '100%',
      maxWidth: 320,
      color: '#000000',
      backgroundColor: colors.background,
    } as TextStyle,

    title: {
      fontFamily: 'Manrope_700Bold',
      fontSize: 28,
      alignItems: 'center',
      textAlign: 'center'
    } as TextStyle,

    tabTitle: {
      fontFamily: 'Manrope_700Bold',
      fontSize: 20,
      // alignItems: 'center',
      alignSelf: 'flex-start',
      marginBottom: 20,
      marginLeft: 50,
    } as TextStyle,

    largeTabTitle: {
      fontFamily: 'Manrope_700Bold',
      fontSize: 28,
      // alignItems: 'center',
      alignSelf: 'flex-start',
      marginBottom: 20,
      marginLeft: 50,
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
      paddingTop: -10,
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
      color: colors.green1,
      fontWeight: 'bold',
    } as TextStyle,

    // ====== Login screen specific styles ======

     loginContainer: {
       flex: 1,
      justifyContent: 'center',
      marginTop: -100,
      backgroundColor: colors.background,
     } as ViewStyle,

     loginImage: {
      width: 250,
      height: 350,
      marginBottom: 20,
      alignItems: 'center',
      marginTop: -100,
     } as ImageStyle,

     loginInput:{
      fontFamily: 'Manrope_400Regular',
      marginBottom: 10,
      marginTop: 10,
      borderWidth: 1,
      borderColor: colors.card,
      padding: 8,
      paddingHorizontal: 16,
      paddingVertical: 12,
      width: '100%',
      maxWidth: 320,
      color: '#000000',
      backgroundColor: colors.background,
     }as TextStyle,

     inputContainer:{
      paddingTop: 0,
      width: '100%',
      alignItems: 'center',
      
     },

    //===== Home Page ======

    calendarContainer: {
      flexDirection: 'row',
      // marginBottom: 20,
      paddingTop: 8,
      paddingBottom: 4,
      alignItems: 'center',
      backgroundColor: colors.background,
      borderRadius: 16,

    },
    calendarDay: {
      padding: 10,
      marginHorizontal: 5,
      borderRadius: 16,
      alignItems: 'center',
      backgroundColor: colors.background,
    },
    calendarDayActive: {
      // backgroundColor: colors.green1,
      borderColor: colors.border,
      borderWidth: 2,
    },
    calendarWeekDay: {
      fontFamily: 'Manrope_400Regular',
      fontSize: 12,
      color: colors.text,
    },
    calendarDate: {
      fontFamily: 'Manrope_700Bold',
      fontSize: 16,
      color: colors.text,
    },
    mascotImage: {
      width: 150,
      height: 150,
      // marginVertical: 20,
    },
    phaseContainer: {
      alignItems: 'center',
      marginBottom: 20,
      marginHorizontal: 20,
      padding: 10,
      // paddingHorizontal: 200,
      width: '80%',
      borderRadius: 25,
      borderColor: colors.border,
      borderWidth: 1,
      backgroundColor: colors.background,
    },
    phaseDay: {
      fontFamily: 'Manrope_700Bold',
      fontSize: 20,
      marginBottom: 5,
    },
    phaseName: {
      fontFamily: 'Manrope_400Regular',
      fontSize: 16,
      color: colors.text,
    },

    dailyContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
    },

    taskList: {
      width: '80%',
      flex: 1
    },
    taskItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 12,
      paddingHorizontal: 20,
      marginVertical: 4,
      marginHorizontal: 20,
      borderRadius: 25,
      borderColor: colors.border,
      borderWidth: 1,
      backgroundColor: colors.background,
    },
    taskItemCompleted: {
      backgroundColor: colors.green1,
    },
    taskText: {
      fontFamily: 'Manrope_400Regular',
      fontSize: 16,
    },
    checkbox: {
      width: 20,
      height: 20,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: colors.text,
      backgroundColor: colors.card,
    },
    checkboxChecked: {
      backgroundColor: colors.green2,
    },

    //====== Cycle Card ======
    card: {
      backgroundColor: colors.background,
      borderRadius: 25,
      overflow: 'hidden', // ensures bar + content respect rounded corners
      marginVertical: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    topBar: {
      height: 20,
      backgroundColor: colors.pink2, // default fallback
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
    },
    image: {
      width: 80,
      height: 80,
      marginRight: 25,
      marginLeft: 25,
    },
    textContainer: {
      flex: 1,
    },
    imageContainer: {
      // flex: 1,
      alignItems: 'center',
    },
    label: {
      fontFamily: 'Manrope_700Bold',
      color: colors.text,
      marginBottom: 4,
    },
    value: {
      fontFamily: 'Manrope_400Regular',      
      color: colors.text,
    },

    //====== Modal ======
    modalOverlay: {
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: "center",
      alignItems: "center",
    },

    modalContent: {
      width: "80%",
      backgroundColor: colors.background,
      borderRadius: 12,
      padding: 20,
      elevation: 5,
      alignItems: "center",
      minWidth: "70%", // not full screen
      maxWidth: "90%",
    },
    
    modalTitle: {
      fontFamily: 'Manrope_700Bold',
      marginBottom: 12,
      alignItems: "center",
    },

    //====== Chatbot ======
    avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFEDEE",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    overflow: "hidden",
  }as ImageStyle,
  avatarSmall: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: "hidden",
    marginHorizontal: 6,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  }as ImageStyle,

  chatHeader:{
    flexDirection: "row",
      alignItems: "center",
      backgroundColor: "shy-pink",   // soft pink background
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderBottomWidth: 0.5,
      borderColor: "card",
  }as ViewStyle,

  chatTitle:{
    fontWeight: "700", fontSize: 16, color: "#000"
  }as TextStyle,

  });

  return { ...styles, colors }; // merge styles + colors
}
