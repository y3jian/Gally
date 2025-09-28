// styles/theme.ts
import { AppColors } from './colors';
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationLightTheme } from '@react-navigation/native';

export const LightTheme = {
  ...NavigationLightTheme,
  colors: {
    ...NavigationLightTheme.colors,
    primary: AppColors.matcha_green,
    background: AppColors.white,
    text: AppColors.black,
    card: AppColors.card,
    border: AppColors.border,
    notification: AppColors.shy_pink,
  },
};

export const DarkTheme = {
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    primary: AppColors.matcha_green,
    background: AppColors.black,
    text:AppColors.white,
    card: AppColors.card,
    border: AppColors.border,
    notification: AppColors.shy_pink,
  },
};
