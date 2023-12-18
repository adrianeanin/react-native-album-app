import { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { List } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import albumService from "../services/album";

const AlbumListScreen = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const getAlbums = async () => {
      try {
        const allAlbums = await albumService.getAlbums();
        setAlbums(allAlbums);
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };

    getAlbums();
  }, []);

  const handleAlbumPress = (albumId) => {
    console.log("An album", albumId);
  };

  const handleDeleteIconPress = async (albumId) => {
    try {
      console.log("Delete icon pressed for album", albumId);

      await albumService.deleteAlbum(albumId);

      setAlbums((prevAlbums) =>
        prevAlbums.filter((album) => album.id !== albumId)
      );
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
