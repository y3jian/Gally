import { useTheme } from '@react-navigation/native';
import { StyleSheet, TextStyle, ViewStyle, TextInputProps } from 'react-native';

export function useThemedStyles() {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      backgroundColor: colors.background,
    } as ViewStyle,

    input: {
      marginBottom: 10,
      borderWidth: 1,
      borderColor: colors.text,
      padding: 8,
      color: colors.text,
      backgroundColor: colors.card,
    } as TextStyle,

    buttonContainer: {
      marginTop: 10,
    } as ViewStyle,
  });

  return styles;
}
