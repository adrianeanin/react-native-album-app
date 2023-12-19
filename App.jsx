import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as ReduxProvider } from "react-redux";
import store from "./redux/store";
import AlbumListScreen from "./components/AlbumListScreen";
import PhotoGridScreen from "./components/PhotoGridScreen";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    accent: "yellow",
  },
};

const Stack = createNativeStackNavigator();

export default function App() {
  console.log("App component is rendering");

  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <PaperProvider theme={theme}>
          <Stack.Navigator initialRouteName="Album List">
            <Stack.Screen name="Album List" component={AlbumListScreen} />
            <Stack.Screen name="Photo Grid" component={PhotoGridScreen} />
          </Stack.Navigator>
        </PaperProvider>
      </NavigationContainer>
    </ReduxProvider>
  );
}
