import { useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { List, MD3Colors } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import albumService from "../services/album";
import { setAlbums, deleteAlbum } from "../redux/albumSlice";

const AlbumListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const albums = useSelector((state) => state.albums.data);

  useEffect(() => {
    const getAlbums = async () => {
      try {
        const allAlbums = await albumService.getAlbums();
        dispatch(setAlbums(allAlbums));
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };

    getAlbums();
  }, [dispatch]);

  const handleAlbumPress = (albumId) => {
    console.log("An album", albumId);
    navigation.navigate("Photo Grid", { albumId });
  };

  const handleDeleteIconPress = async (albumId) => {
    try {
      console.log("Delete icon pressed for album", albumId);

      await albumService.deleteAlbum(albumId);

      dispatch(deleteAlbum(albumId));
    } catch (error) {
      console.error("Error deleting album:", error);
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      {albums.map((album) => (
        <View key={album.id} style={styles.albumContainer}>
          <TouchableOpacity onPress={() => handleAlbumPress(album.id)}>
            <List.Item
              title={album.title}
              description={`An album`}
              style={styles.albumText}
              titleStyle={{ color: "#120B10" }}
              descriptionStyle={{ color: "#8A8FBA" }}
              ellipsizeMode="tail"
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleDeleteIconPress(album.id)}>
            <List.Icon icon="delete" color={MD3Colors.error50} />
          </TouchableOpacity>
        </View>
      ))}

      <StatusBar style="auto" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#FBF8FA",
  },
  albumContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    margin: 10,
    backgroundColor: "#FBF8FA",
    borderRadius: 10,
    // box shadow
    elevation: 5,
    shadowColor: "#8A8FBA",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  albumText: {
    width: 330,
  },
});

export default AlbumListScreen;
