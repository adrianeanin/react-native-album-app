import { useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { List } from "react-native-paper";
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
            <List.Item title={album.title} description={`An album`} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleDeleteIconPress(album.id)}>
            <List.Icon style={styles.deleteIcon} icon="delete" />
          </TouchableOpacity>
        </View>
      ))}

      <StatusBar style="auto" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#578",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    backgroundColor: "pink",
  },
  albumContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  deleteIcon: {
    backgroundColor: "white",
    padding: 8,
    borderRadius: 5,
  },
});

export default AlbumListScreen;
