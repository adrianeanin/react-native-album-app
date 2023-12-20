import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as ReduxProvider } from "react-redux";
import store from "./redux/store";
import AlbumListScreen from "./components/AlbumListScreen";
import PhotoGridScreen from "./components/PhotoGridScreen";

export type RootStackParamList = {
  "Album List": undefined;
  "Photo Grid": { albumId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <PaperProvider>
          <Stack.Navigator initialRouteName="Album List">
            <Stack.Screen name="Album List" component={AlbumListScreen} />
            <Stack.Screen name="Photo Grid" component={PhotoGridScreen} />
          </Stack.Navigator>
        </PaperProvider>
      </NavigationContainer>
    </ReduxProvider>
  );
}
