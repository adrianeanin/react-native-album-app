import { useEffect } from "react";
import { StyleSheet, View, FlatList, Image } from "react-native";
import photoService from "../services/album";
import { useDispatch, useSelector } from "react-redux";
import { setPhotos } from "../redux/photoSlice";

const PhotoGridScreen = ({ route }) => {
  const { albumId } = route.params;
  const dispatch = useDispatch();
  const photos = useSelector((state) => state.photos.data);

  useEffect(() => {
    const getPhotos = async () => {
      try {
        const albumPhotos = await photoService.getPhotosByAlbum(albumId);
        dispatch(setPhotos(albumPhotos));
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    getPhotos();
  }, [albumId]);

  return (
    <View style={styles.container}>
      <FlatList
        data={photos}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        renderItem={({ item }) => (
          <Image style={styles.photo} source={{ uri: item.thumbnailUrl }} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  photo: {
    width: 100,
    height: 100,
    margin: 8,
  },
});

export default PhotoGridScreen;
