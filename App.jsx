import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AlbumListScreen from "./components/AlbumListScreen";

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
  console.log("App runs");

  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <Stack.Navigator initialRouteName="AlbumList">
          <Stack.Screen name="AlbumList" component={AlbumListScreen} />
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
}
