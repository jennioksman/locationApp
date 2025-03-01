import { StyleSheet } from "react-native"
import { Dimensions } from "react-native"
import { MD3LightTheme } from "react-native-paper"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10,
        gap: 10
    },
    loginContainer: {
        flex: 1,
        margin: 10,
        gap: 10
    },
    map: {
        width: Dimensions.get('window').width - 20,
        height: Dimensions.get('window').height - 20,
        marginVertical: 10
    },
    headerImage: {
        height: 150,
        width: Dimensions.get('window').width -20,
        marginRight: 10
    },
    headline: {
        justifyContent: 'center',
        textAlign: 'center',
        marginVertical: 20
    },
    subHeadline: {
        justifyContent: 'center',
        textAlign: 'center',
        marginBottom: 20
    },
    itemView: {
        flexDirection: 'row',
        gap: 10
    },
    item: {
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderRadius: 3
    },
    itemText: {
        flex: 2
    },
    mapIcon: {
        flex: 1,
        alignItems: 'flex-end'
    },
    rating: {
        alignItems: 'space-between'
    },
    image: {
        width: 100, 
        height: 60,
        flex: 1,
        alignItems: 'flex-end'
    },
    countryView: {
        flexDirection: 'row',
        gap: 10
    }
    
})

export const Theme = {
    ...MD3LightTheme,
    roundness: 2,
    colors: {
      ...MD3LightTheme.colors,
      primary: "rgb(56, 107, 1)",
      onPrimary: "rgb(255, 255, 255)",
      primaryContainer: "rgb(183, 244, 129)",
      onPrimaryContainer: "rgb(13, 32, 0)",
      secondary: "rgb(87, 98, 74)",
      onSecondary: "rgb(255, 255, 255)",
      secondaryContainer: "rgb(218, 231, 201)",
      onSecondaryContainer: "rgb(21, 30, 12)",
      tertiary: "rgb(56, 102, 100)",
      onTertiary: "rgb(255, 255, 255)",
      tertiaryContainer: "rgb(187, 236, 233)",
      onTertiaryContainer: "rgb(0, 32, 31)",
      error: "rgb(186, 26, 26)",
      onError: "rgb(255, 255, 255)",
      errorContainer: "rgb(255, 218, 214)",
      onErrorContainer: "rgb(65, 0, 2)",
      background: "rgb(253, 253, 245)",
      onBackground: "rgb(26, 28, 24)",
      surface: "rgb(253, 253, 245)",
      onSurface: "rgb(26, 28, 24)",
      surfaceVariant: "rgb(224, 228, 214)",
      onSurfaceVariant: "rgb(68, 72, 62)",
      outline: "rgb(116, 121, 109)",
      outlineVariant: "rgb(196, 200, 186)",
      shadow: "rgb(0, 0, 0)",
      scrim: "rgb(0, 0, 0)",
      inverseSurface: "rgb(47, 49, 44)",
      inverseOnSurface: "rgb(241, 241, 234)",
      inversePrimary: "rgb(156, 215, 105)",
      elevation: {
        level0: "transparent",
        level1: "rgb(243, 246, 233)",
        level2: "rgb(237, 241, 226)",
        level3: "rgb(231, 237, 218)",
        level4: "rgb(229, 236, 216)",
        level5: "rgb(225, 233, 211)"
      },
      surfaceDisabled: "rgba(26, 28, 24, 0.12)",
      onSurfaceDisabled: "rgba(26, 28, 24, 0.38)",
      backdrop: "rgba(45, 50, 40, 0.4)"
    },
    fonts: {
      ...MD3LightTheme.fonts,
      headlineMedium: {
        ...MD3LightTheme.fonts.headlineMedium,
        fontFamily: 'monospace'
      },
      bobyLarge: {
        ...MD3LightTheme.fonts.bodyLarge,
        fontFamily: 'monospace'
      }
    }
  }