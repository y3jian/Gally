// styles/theme.ts
import { AppColors } from './colors';
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationLightTheme } from '@react-navigation/native';

export const LightTheme = {
  ...NavigationLightTheme,
  colors: {
    ...NavigationLightTheme.colors,
    primary: AppColors.black,
    background: AppColors.black,
    text: AppColors.black,
    card: AppColors.growing_pink,
    border: AppColors.black,
    notification: AppColors.shy_pink,
  },
};

export const DarkTheme = {
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    primary: AppColors.black,
    background: AppColors.black,
    text:AppColors.white,
    card: AppColors.card,
    border: AppColors.black,
    notification: AppColors.shy_pink,
  },
};
